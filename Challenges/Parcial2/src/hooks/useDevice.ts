// ============================================================
// HOOK: useDevice
// Plugin: @capacitor/device
// ============================================================
// POR QUÉ SE USA: Se muestra en la pantalla de Resultados para
// contextualizar el rendimiento del dispositivo. Agrega valor
// al parcial al demostrar uso del plugin Device de Capacitor.
// Muestra modelo, OS, nivel de batería y plataforma.
//
// PERMISOS ANDROID: No requiere permisos adicionales.
//
// MEJORA UX: Personaliza la pantalla de resultados mostrando
// que la app conoce el hardware del usuario, aumentando
// la sensación de integración nativa.
// ============================================================

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
