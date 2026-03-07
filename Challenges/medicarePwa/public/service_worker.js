const CACHE_NAME = 'medicare-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
/*
ESTRATEGIA: Cache First (Caché Primero)
¿Qué significa?
Esta estrategia busca el recurso solicitado primero en la memoria caché del navegador.
Si el recurso se encuentra allí, lo devuelve inmediatamente sin hacer una petición a la red.
Solo si el recurso no está en caché, entonces realiza la petición a la red (y opcionalmente puede guardarlo para futuras visitas).

¿En qué casos conviene usarla para una app médica?
1. Recursos estáticos inmutables: Ideal para logos, iconos, fuentes y estilos corporativos que rara vez cambian.
2. Aplicación Shell (PWA): Para cargar instantáneamente el cascarón de la aplicación asegurando que el médico no vea pantallas en blanco en zonas de baja señal (sótanos/ascensores).
3. Componentes UI y Scripts base: Para los scripts pesados de React que permiten interacción instantánea offline.
*/
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});