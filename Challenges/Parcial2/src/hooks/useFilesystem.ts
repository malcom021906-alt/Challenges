import { useCallback } from 'react';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

interface UseFilesystemReturn {
  savePhoto: (base64Data: string, fileName: string) => Promise<string | null>;
  readPhoto: (fileName: string) => Promise<string | null>;
}

export const useFilesystem = (): UseFilesystemReturn => {
  const savePhoto = useCallback(async (
    base64Data: string,
    fileName: string
  ): Promise<string | null> => {
    try {
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
      return null;
    }
  }, []);

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
