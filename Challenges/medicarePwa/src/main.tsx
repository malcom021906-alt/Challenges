import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
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