import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const rootDir = path.resolve(process.cwd(), "public", "images");
const supported = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif"]);
const skipPatterns = [/logo/i, /transparent/i];

function toLongPath(filePath) {
  if (process.platform !== "win32") {
    return filePath;
  }
  if (filePath.startsWith("\\\\?\\")) {
    return filePath;
  }
  return `\\\\?\\${path.resolve(filePath)}`;
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return walk(fullPath);
      }
      return fullPath;
    })
  );
  return files.flat();
}

function shouldSkip(fileName) {
  return skipPatterns.some((pattern) => pattern.test(fileName));
}

async function compressImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!supported.has(ext)) {
    return null;
  }

  const fileName = path.basename(filePath);
  if (shouldSkip(fileName)) {
    return { fileName, skipped: true, reason: "logo/transparent" };
  }

  const longPath = toLongPath(filePath);
  const before = (await fs.stat(longPath)).size;
  const input = await fs.readFile(longPath);
  let pipeline = sharp(input, { failOn: "none" }).rotate();

  try {
    const metadata = await pipeline.metadata();
    const maxWidth = 1920;

    if (metadata.width && metadata.width > maxWidth) {
      pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
    }

    if (ext === ".png") {
      pipeline = pipeline.png({
        compressionLevel: 9,
        adaptiveFiltering: true,
        palette: true,
        quality: 80,
        effort: 10,
      });
    } else if (ext === ".jpg" || ext === ".jpeg") {
      pipeline = pipeline.jpeg({ quality: 72, mozjpeg: true, progressive: true });
    } else if (ext === ".webp") {
      pipeline = pipeline.webp({ quality: 72, effort: 6 });
    } else if (ext === ".avif") {
      pipeline = pipeline.avif({ quality: 50, effort: 7 });
    }

    let buffer;
    try {
      buffer = await pipeline.toBuffer();
    } catch {
      // Fallback decode path for malformed metadata in some source images.
      buffer = await sharp(input, { failOn: "none" })
        .rotate()
        .jpeg({ quality: 72, mozjpeg: true, progressive: true })
        .toBuffer();
    }
    if (!buffer.length || buffer.length >= before) {
      return { fileName, skipped: true, reason: "no-gain" };
    }

    await fs.writeFile(longPath, buffer);
    const after = buffer.length;

    return {
      fileName,
      before,
      after,
      saved: before - after,
      percent: (((before - after) / before) * 100).toFixed(1),
      skipped: false,
    };
  } catch (error) {
    const reason = error instanceof Error ? error.message.split("\n")[0] : "unsupported-or-error";
    return { fileName, skipped: true, reason };
  }
}

async function main() {
  const allFiles = await walk(rootDir);
  const targets = allFiles.filter((f) => supported.has(path.extname(f).toLowerCase()));

  if (!targets.length) {
    console.log("No supported images found.");
    return;
  }

  const results = [];
  for (const filePath of targets) {
    const result = await compressImage(filePath);
    if (result) {
      results.push(result);
    }
  }

  const changed = results.filter((r) => !r.skipped);
  const skipped = results.filter((r) => r.skipped);

  const totalBefore = changed.reduce((sum, r) => sum + r.before, 0);
  const totalAfter = changed.reduce((sum, r) => sum + r.after, 0);
  const totalSaved = totalBefore - totalAfter;

  changed.sort((a, b) => b.saved - a.saved);

  console.log("Compressed files:");
  for (const item of changed) {
    console.log(`${item.fileName}: ${(item.before / 1024).toFixed(1)} KB -> ${(item.after / 1024).toFixed(1)} KB (-${item.percent}%)`);
  }

  console.log("\nSkipped files:");
  for (const item of skipped) {
    console.log(`${item.fileName}: ${item.reason}`);
  }

  console.log("\nSummary:");
  console.log(`Changed: ${changed.length}`);
  console.log(`Skipped: ${skipped.length}`);
  console.log(`Saved: ${(totalSaved / 1024 / 1024).toFixed(2)} MB`);
  if (totalBefore > 0) {
    console.log(`Reduction on changed files: ${((totalSaved / totalBefore) * 100).toFixed(1)}%`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
