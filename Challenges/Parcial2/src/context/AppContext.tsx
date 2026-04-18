// ============================================================
// CONTEXTO GLOBAL DE LA APLICACIÓN
// ============================================================
// Gestiona el estado compartido: usuario autenticado, puntos,
// misiones y persistencia en LocalStorage + Firebase.
// ============================================================

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Mission, MissionProgress } from '../models/types';
import { MISSIONS_DEFAULT } from '../models/types';
import { auth } from '../firebase/config';
import { saveMissionProgress, loadUserProgress } from '../services/firestoreService';
import type { User } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';

interface AppContextType {
  user: User | null;
  points: number;
  missions: Mission[];
  loading: boolean;
  completeMotion: (missionId: number, pts: number) => void;
  resetProgress: () => void;
  totalCompleted: number;
  progress: number; // 0 to 100
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'parcial2_progress';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [points, setPoints] = useState(0);
  const [missions, setMissions] = useState<Mission[]>(MISSIONS_DEFAULT);
  const [loading, setLoading] = useState(true);

  // Escuchar cambios de auth
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        await loadProgressFromStorage(firebaseUser.uid);
      } else {
        // Reset al hacer logout
        setPoints(0);
        setMissions(MISSIONS_DEFAULT);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const loadProgressFromStorage = async (uid: string) => {
    // 1. Intentar cargar desde LocalStorage primero (rápido)
    const raw = localStorage.getItem(`${STORAGE_KEY}_${uid}`);
    if (raw) {
      try {
        const saved = JSON.parse(raw);
        if (saved.points !== undefined) setPoints(saved.points);
        if (saved.missions) applyMissionProgress(saved.missions);
      } catch (_) {}
    }

    // 2. Luego sincronizar con Firebase (fuente de verdad)
    try {
      const data = await loadUserProgress(uid);
      if (data) {
        setPoints(data.points ?? 0);
        if (data.missions) applyMissionProgress(data.missions);
      }
    } catch (_) {}
  };

  const applyMissionProgress = (saved: MissionProgress[]) => {
    setMissions(prev => {
      const updated = [...prev];
      saved.forEach(mp => {
        const idx = updated.findIndex(m => m.id === mp.id);
        if (idx !== -1 && mp.completed) {
          updated[idx] = { ...updated[idx], status: 'completed' };
        }
      });
      // Desbloquear misión 3 si la 2 está completada
      const m2 = updated.find(m => m.id === 2);
      const m3idx = updated.findIndex(m => m.id === 3);
      if (m2?.status === 'completed' && updated[m3idx].status === 'locked') {
        updated[m3idx] = { ...updated[m3idx], status: 'pending' };
      }
      return updated;
    });
  };

  const saveProgress = useCallback(async (newPoints: number, newMissions: Mission[]) => {
    if (!user) return;
    const progress: MissionProgress[] = newMissions.map(m => ({
      id: m.id,
      completed: m.status === 'completed',
    }));

    // LocalStorage (instantáneo)
    localStorage.setItem(`${STORAGE_KEY}_${user.uid}`, JSON.stringify({
      points: newPoints,
      missions: progress,
    }));

    // Firebase (persistencia real)
    try {
      await saveMissionProgress(user.uid, newPoints, progress);
    } catch (_) {}
  }, [user]);

  const completeMotion = useCallback((missionId: number, pts: number) => {
    setMissions(prev => {
      const updated = prev.map(m =>
        m.id === missionId ? { ...m, status: 'completed' as const } : m
      );
      // Desbloquear misión 3 cuando se completa la 2
      if (missionId === 2) {
        const m3idx = updated.findIndex(m => m.id === 3);
        if (m3idx !== -1 && updated[m3idx].status === 'locked') {
          updated[m3idx] = { ...updated[m3idx], status: 'pending' };
        }
      }
      setPoints(prev => {
        const newPts = prev + pts;
        saveProgress(newPts, updated);
        return newPts;
      });
      return updated;
    });
  }, [saveProgress]);

  const resetProgress = useCallback(() => {
    setPoints(0);
    setMissions(MISSIONS_DEFAULT);
    if (user) {
      localStorage.removeItem(`${STORAGE_KEY}_${user.uid}`);
    }
  }, [user]);

  const totalCompleted = missions.filter(m => m.status === 'completed').length;
  const progress = Math.round((totalCompleted / missions.length) * 100);

  return (
    <AppContext.Provider value={{
      user, points, missions, loading,
      completeMotion, resetProgress,
      totalCompleted, progress,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
