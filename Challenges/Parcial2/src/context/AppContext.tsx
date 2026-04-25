import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Mission, MissionProgress } from '../models/types';
import { MISSIONS_DEFAULT } from '../models/types';
import { auth } from '../firebase/config';
import { saveMissionProgress, loadUserProgress } from '../services/databaseService';
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
  progress: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'parcial2_progress';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [points, setPoints] = useState(0);
  const [missions, setMissions] = useState<Mission[]>(MISSIONS_DEFAULT);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        localStorage.setItem('last_sync_email', firebaseUser.email || '');
        await syncWithFirestore(firebaseUser.uid);
      } else {
        setPoints(0);
        setMissions(MISSIONS_DEFAULT);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const syncWithFirestore = async (uid: string) => {
    try {
      const data = await loadUserProgress(uid);
      if (data) {
        setPoints(data.points ?? 0);
        if (data.missions) applyMissionProgress(data.missions);
        localStorage.setItem(`${STORAGE_KEY}_${uid}`, JSON.stringify({
          points: data.points ?? 0,
          missions: data.missions ?? [],
        }));
        return;
      }
    } catch (e) {
    }

    const raw = localStorage.getItem(`${STORAGE_KEY}_${uid}`);
    if (raw) {
      try {
        const saved = JSON.parse(raw);
        if (saved.points !== undefined) setPoints(saved.points);
        if (saved.missions) applyMissionProgress(saved.missions);
      } catch (_) {}
    }
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

    localStorage.setItem(`${STORAGE_KEY}_${user.uid}`, JSON.stringify({
      points: newPoints,
      missions: progress,
    }));

    try {
      await saveMissionProgress(user.uid, newPoints, progress);
    } catch (e) {
    }
  }, [user]);

  const completeMotion = useCallback((missionId: number, pts: number) => {
    let updatedMissions: Mission[] = [];
    let updatedPoints = 0;

    setMissions(prev => {
      const updated = prev.map(m =>
        m.id === missionId ? { ...m, status: 'completed' as const } : m
      );

      if (missionId === 2) {
        const m3idx = updated.findIndex(m => m.id === 3);
        if (m3idx !== -1 && updated[m3idx].status === 'locked') {
          updated[m3idx] = { ...updated[m3idx], status: 'pending' };
        }
      }
      updatedMissions = updated;
      return updated;
    });

    setPoints(prev => {
      updatedPoints = prev + pts;
      if (updatedMissions.length > 0) {
        saveProgress(updatedPoints, updatedMissions);
      }
      return updatedPoints;
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
