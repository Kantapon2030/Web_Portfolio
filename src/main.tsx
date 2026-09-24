
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Ensure passive event listeners for touchstart and touchmove to prevent blocking mobile scroll on main thread
if (typeof window !== 'undefined') {
  const originalAddEventListener = EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener = function (
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ) {
    let opt = options;
    if (type === 'touchstart' || type === 'touchmove') {
      if (typeof opt === 'boolean') {
        opt = { capture: opt, passive: true };
      } else if (typeof opt === 'object' && opt !== null) {
        if (opt.passive === undefined) {
          opt = { ...opt, passive: true };
        }
      } else if (opt === undefined) {
        opt = { passive: true };
      }
    }
    return originalAddEventListener.call(this, type, listener, opt);
  };
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
