import { useState, useRef, useCallback, useEffect } from 'react';
import { Motion } from '@capacitor/motion';

const STILL_THRESHOLD = 0.8;
const MISSION_DURATION = 10;
const GRACE_PERIOD_MS = 1500;

interface UseMotionReturn {
  isListening: boolean;
  isReady: boolean;
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
  const [isReady, setIsReady] = useState(false);
  const [countdown, setCountdown] = useState(MISSION_DURATION);
  const [isCompleted, setIsCompleted] = useState(false);
  const [acceleration, setAcceleration] = useState<{ x: number; y: number; z: number } | null>(null);
  const [isStill, setIsStill] = useState(true);

  const countdownRef = useRef(MISSION_DURATION);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const listenerRef = useRef<{ remove: () => void } | null>(null);
  const isReadyRef = useRef(false);
  const prevAccelRef = useRef<{ x: number; y: number; z: number } | null>(null);

  const stopInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const resetTimer = () => {
    stopInterval();
    countdownRef.current = MISSION_DURATION;
    setCountdown(MISSION_DURATION);
  };

  const startListening = useCallback(async () => {
    setIsListening(true);
    setIsReady(false);
    isReadyRef.current = false;
    setIsStill(true);
    setIsCompleted(false);
    resetTimer();

    setTimeout(() => {
      setIsReady(true);
      isReadyRef.current = true;
      
      intervalRef.current = setInterval(() => {
        if (countdownRef.current > 0) {
          countdownRef.current -= 1;
          setCountdown(countdownRef.current);
        } else {
          stopInterval();
          setIsCompleted(true);
          onComplete();
        }
      }, 1000);
    }, GRACE_PERIOD_MS);

    try {
      const handle = await Motion.addListener('accel', (event) => {
        const acc = event.acceleration;
        setAcceleration(acc);

        if (!prevAccelRef.current) {
          prevAccelRef.current = acc;
          return;
        }

        const delta = Math.sqrt(
          Math.pow(acc.x - prevAccelRef.current.x, 2) +
          Math.pow(acc.y - prevAccelRef.current.y, 2) +
          Math.pow(acc.z - prevAccelRef.current.z, 2)
        );

        prevAccelRef.current = acc;
        const stillNow = delta < STILL_THRESHOLD;
        setIsStill(stillNow);

        if (!stillNow && isReadyRef.current) {
          resetTimer();
          setTimeout(() => {
            if (!intervalRef.current && isListening) {
              intervalRef.current = setInterval(() => {
                if (countdownRef.current > 0) {
                  countdownRef.current -= 1;
                  setCountdown(countdownRef.current);
                } else {
                  stopInterval();
                  setIsCompleted(true);
                  onComplete();
                }
              }, 1000);
            }
          }, 100);
        }
      });

      listenerRef.current = handle;
    } catch (e) {
      setTimeout(() => {
        setIsReady(true);
        setIsStill(true);
        intervalRef.current = setInterval(() => {
          if (countdownRef.current > 0) {
            countdownRef.current -= 1;
            setCountdown(countdownRef.current);
          } else {
            stopInterval();
            setIsCompleted(true);
            onComplete();
          }
        }, 1000);
      }, GRACE_PERIOD_MS);
    }
  }, [onComplete]);

  const stopListening = useCallback(() => {
    listenerRef.current?.remove();
    listenerRef.current = null;
    stopInterval();
    setIsListening(false);
    setIsReady(false);
    isReadyRef.current = false;
  }, []);

  const reset = useCallback(() => {
    stopListening();
    setIsCompleted(false);
    resetTimer();
  }, [stopListening]);

  useEffect(() => {
    return () => stopListening();
  }, [stopListening]);

  return {
    isListening,
    isReady,
    countdown,
    isCompleted,
    acceleration,
    isStill,
    startListening,
    stopListening,
    reset,
  };
};
