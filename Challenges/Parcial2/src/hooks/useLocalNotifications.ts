// ============================================================
// HOOK: useLocalNotifications
// Plugin: @capacitor/local-notifications
// ============================================================
// POR QUÉ SE USA: Las notificaciones locales son el canal de
// comunicación proactiva de la app con el usuario. Se envían:
//   1. Al completar cada misión: "¡Misión completada!"
//   2. Cuando falta 1 misión: "¡Casi lo logras!"
//
// PERMISOS ANDROID:
//   <uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />
//   <uses-permission android:name="android.permission.SCHEDULE_EXACT_ALARM" />
//   (Android 13+) POST_NOTIFICATIONS se pide en runtime
//
// MEJORA UX: Las notificaciones mantienen al usuario enganchado
// con la app incluso cuando no la está usando activamente,
// típico de apps gamificadas como Duolingo.
// ============================================================

import { useCallback } from 'react';
import { LocalNotifications } from '@capacitor/local-notifications';

interface UseLocalNotificationsReturn {
  requestPermission: () => Promise<boolean>;
  notifyMissionCompleted: (missionTitle: string, pts: number) => Promise<void>;
  notifyOneMissionLeft: () => Promise<void>;
  notifyAllCompleted: () => Promise<void>;
}

export const useLocalNotifications = (): UseLocalNotificationsReturn => {
  const requestPermission = useCallback(async (): Promise<boolean> => {
    try {
      const { display } = await LocalNotifications.requestPermissions();
      return display === 'granted';
    } catch {
      return false;
    }
  }, []);

  const scheduleNotification = async (
    id: number,
    title: string,
    body: string,
    delaySeconds = 1
  ) => {
    try {
      const at = new Date(Date.now() + delaySeconds * 1000);
      await LocalNotifications.schedule({
        notifications: [{
          id,
          title,
          body,
          schedule: { at },
          sound: undefined,
          actionTypeId: '',
          extra: null,
        }],
      });
    } catch {
      // Silencioso en browser — las notificaciones locales
      // solo funcionan en Capacitor nativo
    }
  };

  const notifyMissionCompleted = useCallback(async (
    missionTitle: string,
    pts: number
  ) => {
    await scheduleNotification(
      Date.now() % 10000,
      '🎉 ¡Misión completada!',
      `"${missionTitle}" completada. +${pts} puntos ganados.`
    );
  }, []);

  const notifyOneMissionLeft = useCallback(async () => {
    await scheduleNotification(
      8001,
      '⚡ ¡Casi lo logras!',
      'Te falta solo 1 misión para convertirte en Maestro.'
    );
  }, []);

  const notifyAllCompleted = useCallback(async () => {
    await scheduleNotification(
      8002,
      '👑 ¡Eres un Maestro!',
      'Completaste todas las misiones. Revisa tu ranking.'
    );
  }, []);

  return {
    requestPermission,
    notifyMissionCompleted,
    notifyOneMissionLeft,
    notifyAllCompleted,
  };
};
