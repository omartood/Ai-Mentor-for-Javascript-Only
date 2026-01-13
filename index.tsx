import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Suppress benign ResizeObserver errors caused by Monaco Editor resizing
// This is a known browser behavior that is safe to ignore in this context
const RO_ERRORS = [
  "ResizeObserver loop completed with undelivered notifications.",
  "ResizeObserver loop limit exceeded"
];

// Patch console.error to prevent React error overlay for this specific benign error
const originalConsoleError = console.error;
console.error = (...args) => {
  if (args.length > 0 && typeof args[0] === 'string') {
    if (RO_ERRORS.some(msg => args[0].includes(msg))) {
      return;
    }
  }
  originalConsoleError.apply(console, args);
};

// Catch global errors to prevent browser console spam
window.addEventListener('error', (e) => {
  if (RO_ERRORS.some(msg => e.message.includes(msg))) {
    e.stopImmediatePropagation();
    e.preventDefault();
  }
});

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);