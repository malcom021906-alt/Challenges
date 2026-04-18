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
