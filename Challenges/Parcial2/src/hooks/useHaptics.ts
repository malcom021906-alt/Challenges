import { useCallback } from 'react';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';

interface UseHapticsReturn {
  vibrate: () => Promise<void>;
  successFeedback: () => Promise<void>;
  lightTap: () => Promise<void>;
}

export const useHaptics = (): UseHapticsReturn => {
  const vibrate = useCallback(async () => {
    try {
      await Haptics.vibrate({ duration: 500 });
    } catch {
    }
  }, []);

  const successFeedback = useCallback(async () => {
    try {
      await Haptics.notification({ type: NotificationType.Success });
    } catch {
    }
  }, []);

  const lightTap = useCallback(async () => {
    try {
      await Haptics.impact({ style: ImpactStyle.Light });
    } catch {
    }
  }, []);

  return { vibrate, successFeedback, lightTap };
};
