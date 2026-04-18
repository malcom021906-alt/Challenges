// ============================================================
// TIPOS / MODELOS DE LA APLICACIÓN
// ============================================================

export interface Mission {
  id: number;
  title: string;
  description: string;
  points: number;
  status: 'pending' | 'completed' | 'locked';
  icon: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  points: number;
  missions: MissionProgress[];
  createdAt?: Date;
}

export interface MissionProgress {
  id: number;
  completed: boolean;
  completedAt?: Date;
}

export interface RankingEntry {
  uid: string;
  displayName: string;
  email: string;
  points: number;
  isCurrentUser?: boolean;
}

export type UserLevel = 'Principiante' | 'Avanzado' | 'Maestro';

export const getUserLevel = (points: number): UserLevel => {
  if (points >= 250) return 'Maestro';
  if (points >= 100) return 'Avanzado';
  return 'Principiante';
};

export const getUserLevelEmoji = (points: number): string => {
  if (points >= 250) return '👑';
  if (points >= 100) return '⚡';
  return '🌱';
};

export const MISSIONS_DEFAULT: Mission[] = [
  {
    id: 1,
    title: 'Evidencia Fotográfica',
    description: 'Toma una foto con la cámara de tu dispositivo como evidencia de tu presencia.',
    points: 50,
    status: 'pending',
    icon: '📸',
  },
  {
    id: 2,
    title: 'Explorador Urbano',
    description: 'Desplázate al menos 30 metros desde tu posición inicial usando GPS real.',
    points: 100,
    status: 'pending',
    icon: '🗺️',
  },
  {
    id: 3,
    title: 'Modo Zen',
    description: 'Permanece completamente quieto durante 10 segundos. Si te mueves, el conteo reinicia.',
    points: 150,
    status: 'locked',
    icon: '🧘',
  },
];
