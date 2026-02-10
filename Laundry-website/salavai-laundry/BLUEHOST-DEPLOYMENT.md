# BLUEHOST DEPLOYMENT TROUBLESHOOTING

## Current Issue: PHP Not Executing (Getting Raw PHP Code)

### Symptoms:
- Error: "Unexpected token '<', "<?php" is not valid JSON"
- Content-Type shows: `application/x-httpd-ea-php56` (or similar)
- Browser receiving PHP source code instead of executed output
- Response status 200 but content is wrong

---

## ⚡ QUICK FIX:

The `.htaccess` file needs to use Bluehost's EA (EasyApache) PHP handler format.

**Update your `.htaccess` on Bluehost:**

Change this line:
```apache
AddHandler application/x-httpd-php .php
```

To this (match your PHP version):
```apache
AddHandler application/x-httpd-ea-php74 .php
```

---

## SOLUTION STEPS:

### 1. **Check Your PHP Version in cPanel**
1. Log into Bluehost cPanel
2. Go to "MultiPHP Manager"
3. Look at the PHP version for your domain (e.g., 7.4, 8.0, 8.1)
4. Remember this number!

### 2. **Update .htaccess File**

**Option A - Edit directly on Bluehost:**
1. Open File Manager → Navigate to your site root
2. Edit `.htaccess` file
3. Change the `AddHandler` line to match your PHP version:

```apache
# For PHP 7.4:
AddHandler application/x-httpd-ea-php74 .php

# For PHP 8.0:
AddHandler application/x-httpd-ea-php80 .php

# For PHP 8.1:
AddHandler application/x-httpd-ea-php81 .php
```

**Option B - Upload new .htaccess:**
1. Edit your local `.htaccess` file (already updated in this project)
2. Rebuild: `npm run build`
3. Upload the new `.htaccess` from `dist/` folder

### 3. **Test PHP Directly**
Visit: `https://thesalavailaundry.com/test.php`

**Expected Result:**
```json
{"status":"success","message":"PHP is working!","php_version":"7.4.x"}
```

**If you see raw PHP code:** The AddHandler line doesn't match your PHP version

### 4. **Check File Permissions**
In Bluehost File Manager:
- `.htaccess` should be **644**
- `send-message.php` should be **644** or **755**
- `test.php` should be **644** or **755**

---

## 📋 FILES TO UPLOAD:

From `dist/` folder after running `npm run build`:
- ✅ `.htaccess` (with correct PHP handler)
- ✅ `send-message.php`
- ✅ `test.php`
- ✅ All other build files

---

## Common PHP Handler Formats:

Bluehost uses this format: `application/x-httpd-ea-phpXX`

- PHP 7.4: `application/x-httpd-ea-php74`
- PHP 8.0: `application/x-httpd-ea-php80`
- PHP 8.1: `application/x-httpd-ea-php81`
- PHP 8.2: `application/x-httpd-ea-php82`

---

## 🆘 Still Not Working?

### Contact Bluehost Support:
"My PHP files at thesalavailaundry.com are returning source code with Content-Type: application/x-httpd-ea-php56. I need PHP 7.4+ enabled and the correct AddHandler in .htaccess. Can you help verify my PHP configuration?"

---

## Quick Test Checklist:
- [ ] Check PHP version in MultiPHP Manager (should be 7.4+)
- [ ] Update .htaccess with correct ea-php handler
- [ ] Upload .htaccess to root directory
- [ ] File permissions are 644
- [ ] test.php returns JSON (not PHP code)
- [ ] No folder named "contact" or "send-message" exists
