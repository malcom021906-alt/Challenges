// ============================================================
// HOOK: useMotion (Acelerómetro)
// Plugin: @capacitor/motion
// ============================================================
// POR QUÉ SE USA: La Misión 3 requiere detectar inmovilidad.
// El acelerómetro mide la aceleración en los 3 ejes (x, y, z).
// Si la variación es menor a un umbral, el usuario está quieto.
// Si se mueve, el conteo de 10 segundos se reinicia.
//
// PERMISOS ANDROID: No requiere permiso especial (sensor pasivo)
//
// MEJORA UX: Hace la misión interactiva y física. El usuario
// debe mantener el teléfono quieto durante 10 segundos, lo que
// crea tensión y engagement con la app.
// ============================================================

import { useState, useRef, useCallback, useEffect } from 'react';
import { Motion } from '@capacitor/motion';

const STILL_THRESHOLD = 0.3;  // m/s² — variación máxima para considerar "quieto"
const MISSION_DURATION = 10;  // segundos requeridos quieto

interface UseMotionReturn {
  isListening: boolean;
  countdown: number;
  isCompleted: boolean;
  acceleration: { x: number; y: number; z: number } | null;
  isStill: boolean;
  startListening: () => Promise<void>;
  stopListening: () => void;
  reset: () => void;
}

export const useMotion = (onComplete: () => void): UseMotionReturn => {
  const [isListening, setIsListening] = useState(false);
  const [countdown, setCountdown] = useState(MISSION_DURATION);
  const [isCompleted, setIsCompleted] = useState(false);
  const [acceleration, setAcceleration] = useState<{ x: number; y: number; z: number } | null>(null);
  const [isStill, setIsStill] = useState(false);

  const prevAccelRef = useRef<{ x: number; y: number; z: number } | null>(null);
  const countdownRef = useRef(MISSION_DURATION);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const listenerRef = useRef<{ remove: () => void } | null>(null);

  const stopInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startInterval = useCallback(() => {
    stopInterval();
    intervalRef.current = setInterval(() => {
      countdownRef.current -= 1;
      setCountdown(countdownRef.current);

      if (countdownRef.current <= 0) {
        stopInterval();
        setIsCompleted(true);
        onComplete();
      }
    }, 1000);
  }, [onComplete]);

  const startListening = useCallback(async () => {
    setIsListening(true);
    countdownRef.current = MISSION_DURATION;
    setCountdown(MISSION_DURATION);
    setIsCompleted(false);

    try {
      // Escuchar eventos del acelerómetro
      const handle = await Motion.addListener('accel', (event) => {
        const acc = event.acceleration;
        setAcceleration(acc);

        if (!prevAccelRef.current) {
          prevAccelRef.current = acc;
          return;
        }

        // Calcular variación de aceleración respecto a lectura anterior
        const delta = Math.sqrt(
          Math.pow(acc.x - prevAccelRef.current.x, 2) +
          Math.pow(acc.y - prevAccelRef.current.y, 2) +
          Math.pow(acc.z - prevAccelRef.current.z, 2)
        );

        prevAccelRef.current = acc;
        const stillNow = delta < STILL_THRESHOLD;
        setIsStill(stillNow);

        if (stillNow) {
          // Si el countdown no está corriendo, iniciarlo
          if (!intervalRef.current) startInterval();
        } else {
          // Se movió → reiniciar conteo
          stopInterval();
          countdownRef.current = MISSION_DURATION;
          setCountdown(MISSION_DURATION);
        }
      });

      listenerRef.current = handle;
    } catch (e) {
      // Fallback en browser: simular acelerómetro con timer
      console.warn('Motion plugin no disponible en browser, usando simulación');
      setIsStill(true);
      startInterval();
    }
  }, [startInterval]);

  const stopListening = useCallback(() => {
    listenerRef.current?.remove();
    listenerRef.current = null;
    stopInterval();
    setIsListening(false);
  }, []);

  const reset = useCallback(() => {
    stopListening();
    countdownRef.current = MISSION_DURATION;
    setCountdown(MISSION_DURATION);
    setIsCompleted(false);
    setIsStill(false);
  }, [stopListening]);

  // Limpiar al desmontar
  useEffect(() => {
    return () => {
      listenerRef.current?.remove();
      stopInterval();
    };
  }, []);

  return {
    isListening,
    countdown,
    isCompleted,
    acceleration,
    isStill,
    startListening,
    stopListening,
    reset,
  };
};
