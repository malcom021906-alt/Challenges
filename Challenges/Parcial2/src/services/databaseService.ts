import { rtdb } from '../firebase/config';
import { ref, get, child, update, set } from 'firebase/database';
import type { MissionProgress } from '../models/types';

export const saveMissionProgress = async (
  uid: string,
  points: number,
  missions: MissionProgress[]
) => {
  const updates: any = {};
  
  updates[`users/${uid}/points`] = points;
  updates[`users/${uid}/missions`] = missions.map(m => ({
    id: m.id,
    completed: m.completed,
    completedAt: m.completed ? Date.now() : null,
  }));
  
  updates[`ranking/${uid}`] = {
    uid,
    points,
    email: localStorage.getItem('last_sync_email') || 'Usuario',
    updatedAt: Date.now()
  };

  return update(ref(rtdb), updates);
};

export const createUserDocument = async (uid: string, email: string, displayName: string) => {
  await set(ref(rtdb, `users/${uid}`), {
    email,
    displayName,
    points: 0,
    missions: [],
    createdAt: Date.now()
  });

  await set(ref(rtdb, `ranking/${uid}`), {
    uid,
    email,
    displayName,
    points: 0,
    updatedAt: Date.now()
  });
};

export const loadUserProgress = async (uid: string) => {
  const dbRef = ref(rtdb);
  const snapshot = await get(child(dbRef, `users/${uid}`));
  
  if (snapshot.exists()) {
    return snapshot.val();
  }
  return null;
};

export const getRanking = async () => {
  const dbRef = ref(rtdb);
  const snapshot = await get(child(dbRef, 'ranking'));
  
  if (snapshot.exists()) {
    const data = snapshot.val();
    return Object.keys(data).map(key => ({
      uid: key,
      ...data[key]
    })).sort((a, b) => b.points - a.points);
  }
  return [];
};
