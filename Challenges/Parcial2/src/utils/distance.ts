export interface Coordinates {
  latitude: number;
  longitude: number;
}

export function calculateDistance(origin: Coordinates, current: Coordinates): number {
  const R = 6371000;
  const dLat = toRad(current.latitude - origin.latitude);
  const dLon = toRad(current.longitude - origin.longitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(origin.latitude)) *
      Math.cos(toRad(current.latitude)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}
