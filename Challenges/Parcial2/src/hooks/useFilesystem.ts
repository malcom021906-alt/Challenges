// ============================================================
// HOOK: useFilesystem
// Plugin: @capacitor/filesystem
// ============================================================
// POR QUÉ SE USA: La Misión 1 no solo toma la foto, también
// la guarda en el almacenamiento local del dispositivo.
// Esto permite que la evidencia persista aunque se cierre la app.
// Filesystem es el plugin estándar de Capacitor para I/O local.
//
// PERMISOS ANDROID:
//   <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
//   <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
//
// MEJORA UX: La evidencia fotográfica queda guardada en CACHE,
// por lo que se puede mostrar después de recargar la app.
// ============================================================

import { useCallback } from 'react';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

interface UseFilesystemReturn {
  savePhoto: (base64Data: string, fileName: string) => Promise<string | null>;
  readPhoto: (fileName: string) => Promise<string | null>;
}

export const useFilesystem = (): UseFilesystemReturn => {
  /**
   * Guarda una foto (base64 dataURL) en el filesystem local.
   * Retorna la URI del archivo guardado, o null si falla.
   */
  const savePhoto = useCallback(async (
    base64Data: string,
    fileName: string
  ): Promise<string | null> => {
    try {
      // Extraer solo el base64 puro (quitar "data:image/jpeg;base64,")
      const base64 = base64Data.includes(',')
        ? base64Data.split(',')[1]
        : base64Data;

      const result = await Filesystem.writeFile({
        path: `missions/${fileName}`,
        data: base64,
        directory: Directory.Cache,
        recursive: true,
      });

      return result.uri;
    } catch (e) {
      // En browser, Filesystem no está disponible — no es un error crítico
      console.warn('Filesystem no disponible, foto guardada solo en memoria');
      return null;
    }
  }, []);

  /**
   * Lee una foto guardada y la retorna como base64.
   */
  const readPhoto = useCallback(async (
    fileName: string
  ): Promise<string | null> => {
    try {
      const result = await Filesystem.readFile({
        path: `missions/${fileName}`,
        directory: Directory.Cache,
        encoding: Encoding.UTF8,
      });
      return result.data as string;
    } catch {
      return null;
    }
  }, []);

  return { savePhoto, readPhoto };
};
