// ============================================================
// HOOK: useCamera
// Plugin: @capacitor/camera
// ============================================================
// POR QUÉ SE USA: La Misión 1 requiere evidencia fotográfica.
// Capacitor Camera provee acceso nativo a la cámara en Android/iOS
// y degradación elegante en browser (sube imagen de galería).
//
// PERMISOS ANDROID:
//   <uses-permission android:name="android.permission.CAMERA" />
//   <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
//
// MEJORA UX: El usuario tiene prueba visual de haber estado
// en el lugar. La foto se guarda localmente con useFilesystem.
// ============================================================

import { useState, useCallback } from 'react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';

interface UseCameraReturn {
  photo: string | null;
  takePhoto: () => Promise<string | null>;
  loading: boolean;
  error: string | null;
}

export const useCamera = (): UseCameraReturn => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const takePhoto = useCallback(async (): Promise<string | null> => {
    setLoading(true);
    setError(null);
    try {
      // En web: abre input file. En nativo: abre cámara real
      const image = await Camera.getPhoto({
        quality: 80,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,  // base64 dataURL para preview
        source: Capacitor.isNativePlatform()
          ? CameraSource.Camera   // Cámara real en Android
          : CameraSource.Photos,  // Galería en browser (fallback)
        saveToGallery: false,
      });

      const dataUrl = image.dataUrl ?? null;
      setPhoto(dataUrl);
      return dataUrl;
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Error al tomar foto';
      setError(msg);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { photo, takePhoto, loading, error };
};
