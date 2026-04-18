// ============================================================
// HOOK: useHaptics
// Plugin: @capacitor/haptics
// ============================================================
// POR QUÉ SE USA: Proporciona feedback táctil al completar
// la Misión 3. La vibración es la señal de éxito más inmediata
// e intuitiva para el usuario, mejorando drásticamente el UX.
// También se usa como micro-feedback en acciones importantes.
//
// PERMISOS ANDROID:
//   <uses-permission android:name="android.permission.VIBRATE" />
//
// MEJORA UX: La vibración al completar la misión "Modo Zen"
// crea un momento de recompensa sensorial que refuerza el
// sistema de gamificación.
// ============================================================

import { useCallback } from 'react';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';

interface UseHapticsReturn {
  vibrate: () => Promise<void>;
  successFeedback: () => Promise<void>;
  lightTap: () => Promise<void>;
}

export const useHaptics = (): UseHapticsReturn => {
  /**
   * Vibración fuerte — usada al completar misión 3
   */
  const vibrate = useCallback(async () => {
    try {
      await Haptics.vibrate({ duration: 500 });
    } catch {
      // No disponible en browser
    }
  }, []);

  /**
   * Feedback de éxito — patrón de notificación de logro
   */
  const successFeedback = useCallback(async () => {
    try {
      await Haptics.notification({ type: NotificationType.Success });
    } catch {
      // Fallback silencioso en browser
    }
  }, []);

  /**
   * Toque suave — confirmation feedback
   */
  const lightTap = useCallback(async () => {
    try {
      await Haptics.impact({ style: ImpactStyle.Light });
    } catch {
      // No disponible en browser
    }
  }, []);

  return { vibrate, successFeedback, lightTap };
};
