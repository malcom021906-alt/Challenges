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
      const image = await Camera.getPhoto({
        quality: 80,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: Capacitor.isNativePlatform()
          ? CameraSource.Camera
          : CameraSource.Photos,
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
