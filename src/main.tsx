import React from 'react';
import ReactDOM from 'react-dom/client';
import ContactApp from './ContactApp.tsx';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ContactApp />
  </React.StrictMode>
)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service_worker.js')
      .then(registration => {
        console.log('✅ Service Worker registrado exitosamente:', registration.scope);
      })
      .catch(error => {
        console.error('❌ Error al registrar Service Worker:', error);
      });
  });
}
