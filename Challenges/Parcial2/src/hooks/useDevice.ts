import { useState, useEffect } from 'react';
import { Device } from '@capacitor/device';

interface DeviceInfo {
  model: string;
  platform: string;
  osVersion: string;
  manufacturer: string;
  batteryLevel: number | null;
  isCharging: boolean | null;
}

export const useDevice = () => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [info, battery] = await Promise.all([
          Device.getInfo(),
          Device.getBatteryInfo().catch(() => null),
        ]);

        setDeviceInfo({
          model: info.model ?? 'Desconocido',
          platform: info.platform ?? 'web',
          osVersion: info.osVersion ?? 'N/A',
          manufacturer: info.manufacturer ?? 'N/A',
          batteryLevel: battery?.batteryLevel != null
            ? Math.round(battery.batteryLevel * 100)
            : null,
          isCharging: battery?.isCharging ?? null,
        });
      } catch {
        setDeviceInfo({
          model: 'Navegador Web',
          platform: 'web',
          osVersion: 'N/A',
          manufacturer: 'Google',
          batteryLevel: null,
          isCharging: null,
        });
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return { deviceInfo, loading };
};
