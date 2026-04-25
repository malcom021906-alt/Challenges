import { useState, useRef, useCallback } from 'react';
import { Geolocation } from '@capacitor/geolocation';
import { calculateDistance, type Coordinates } from '../utils/distance';

interface Position {
  latitude: number;
  longitude: number;
}

interface UseGeolocationReturn {
  currentPosition: Position | null;
  initialPosition: Position | null;
  distanceMeters: number;
  isWatching: boolean;
  error: string | null;
  startWatching: () => Promise<void>;
  stopWatching: () => void;
  requestPermission: () => Promise<boolean>;
}

export const useGeolocation = (): UseGeolocationReturn => {
  const [currentPosition, setCurrentPosition] = useState<Position | null>(null);
  const [initialPosition, setInitialPosition] = useState<Position | null>(null);
  const [distanceMeters, setDistanceMeters] = useState(0);
  const [isWatching, setIsWatching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const watchIdRef = useRef<string | null>(null);

  const requestPermission = useCallback(async (): Promise<boolean> => {
    try {
      const perm = await Geolocation.requestPermissions();
      return perm.location === 'granted';
    } catch {
      return false;
    }
  }, []);

  const startWatching = useCallback(async () => {
    setError(null);

    try {
      const initial = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000,
      });

      const initCoords: Coordinates = {
        latitude: initial.coords.latitude,
        longitude: initial.coords.longitude,
      };

      setInitialPosition(initCoords);
      setCurrentPosition(initCoords);
      setDistanceMeters(0);
      setIsWatching(true);

      const id = await Geolocation.watchPosition(
        { enableHighAccuracy: true },
        (position, err) => {
          if (err || !position) {
            setError(err?.message ?? 'Error GPS');
            return;
          }

          const current: Coordinates = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };

          setCurrentPosition(current);
          const dist = calculateDistance(initCoords, current);
          setDistanceMeters(Math.round(dist));
        }
      );

      watchIdRef.current = id;
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Error al acceder al GPS';
      setError(msg);
    }
  }, []);

  const stopWatching = useCallback(() => {
    if (watchIdRef.current) {
      Geolocation.clearWatch({ id: watchIdRef.current });
      watchIdRef.current = null;
    }
    setIsWatching(false);
  }, []);

  return {
    currentPosition,
    initialPosition,
    distanceMeters,
    isWatching,
    error,
    startWatching,
    stopWatching,
    requestPermission,
  };
};
