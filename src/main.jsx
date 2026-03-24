import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

console.log('main.jsx loaded');

const rootElement = document.getElementById('root');
console.log('Root element found:', !!rootElement);

if (!rootElement) {
  document.body.innerHTML = '<div style="padding: 20px; font-family: sans-serif; color: red;"><h1>Error: Root element not found</h1><p>The div with id="root" could not be found in the HTML.</p></div>';
  throw new Error('Root element not found');
}

try {
  createRoot(rootElement).render(
    <App />
  );
  console.log('React app rendered successfully');
} catch (error) {
  console.error('Error rendering app:', error);
  document.body.innerHTML = `<div style="padding: 20px; font-family: monospace; color: red;">
    <h1>Error rendering app</h1>
    <p>${error.message}</p>
    <pre>${error.stack}</pre>
  </div>`;
}
