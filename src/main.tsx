import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Compatibility guard for any legacy/classic JSX code that still expects a
// global React object at runtime. The app itself uses the automatic JSX runtime.
const globalWithReact = globalThis as typeof globalThis & {
  React?: typeof React;
};
globalWithReact.React ??= React;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
