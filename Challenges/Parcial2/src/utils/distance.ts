// ============================================================
// CÁLCULO DE DISTANCIA GPS — Fórmula de Haversine
// ============================================================
// Se usa en la Misión 2 para calcular los metros recorridos
// desde la posición inicial del usuario hasta la posición actual.
// La fórmula de Haversine da la distancia más corta sobre
// la superficie de una esfera (la Tierra) entre dos puntos
// dados por latitud/longitud.
// ============================================================

export interface Coordinates {
  latitude: number;
  longitude: number;
}

/**
 * Calcula la distancia en metros entre dos coordenadas GPS
 * usando la fórmula de Haversine.
 */
export function calculateDistance(origin: Coordinates, current: Coordinates): number {
  const R = 6371000; // Radio de la Tierra en metros
  const dLat = toRad(current.latitude - origin.latitude);
  const dLon = toRad(current.longitude - origin.longitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(origin.latitude)) *
      Math.cos(toRad(current.latitude)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // distancia en metros
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}
