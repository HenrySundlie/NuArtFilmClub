import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

// If a static host served 404.html and redirected to '/', recover the intended path
const savedPath = sessionStorage.getItem('spa-fallback-path');
if (savedPath) {
  sessionStorage.removeItem('spa-fallback-path');
  // Use replace so it doesn't create an extra history entry
  history.replaceState(null, '', savedPath);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
