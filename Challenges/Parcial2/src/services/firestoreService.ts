// ============================================================
// SERVICIO FIRESTORE
// ============================================================
// Gestiona todas las operaciones de base de datos:
//   - Crear usuario
//   - Guardar progreso de misiones y puntos
//   - Leer progreso del usuario
//   - Ranking top 5 (usuarios reales + fake)
// ============================================================

import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase/config';
import type { MissionProgress, RankingEntry } from '../models/types';

// ─── Usuarios fake para completar el ranking ────────────────
// Se usan solo si hay menos de 5 usuarios reales en Firebase
const FAKE_USERS: RankingEntry[] = [
  { uid: 'fake-1', displayName: 'AlexGameMaster', email: 'alex@demo.com', points: 280 },
  { uid: 'fake-2', displayName: 'SofiaMissions', email: 'sofia@demo.com', points: 200 },
  { uid: 'fake-3', displayName: 'CarlosExplorer', email: 'carlos@demo.com', points: 150 },
  { uid: 'fake-4', displayName: 'MariaZen', email: 'maria@demo.com', points: 50 },
];

// ─── Crear documento de usuario nuevo ───────────────────────
export const createUserDocument = async (
  uid: string,
  email: string,
  displayName: string
) => {
  // Documento principal /users/{uid}
  await setDoc(doc(db, 'users', uid), {
    uid,
    email,
    displayName,
    points: 0,
    missions: [
      { id: 1, completed: false },
      { id: 2, completed: false },
      { id: 3, completed: false },
    ],
    createdAt: serverTimestamp(),
  });

  // Documento de ranking /ranking/{uid}
  await setDoc(doc(db, 'ranking', uid), {
    uid,
    email,
    displayName,
    points: 0,
  });
};

// ─── Cargar progreso del usuario ────────────────────────────
export const loadUserProgress = async (uid: string) => {
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() ? snap.data() : null;
};

// ─── Guardar progreso de misiones y puntos ──────────────────
export const saveMissionProgress = async (
  uid: string,
  points: number,
  missions: MissionProgress[]
) => {
  // Actualizar /users/{uid}
  await updateDoc(doc(db, 'users', uid), {
    points,
    missions: missions.map(m => ({
      id: m.id,
      completed: m.completed,
      completedAt: m.completed ? serverTimestamp() : null,
    })),
  });

  // Actualizar /ranking/{uid}
  await updateDoc(doc(db, 'ranking', uid), { points });
};

// ─── Obtener ranking Top 5 ───────────────────────────────────
export const getRanking = async (currentUid: string): Promise<RankingEntry[]> => {
  try {
    const q = query(
      collection(db, 'ranking'),
      orderBy('points', 'desc'),
      limit(10)
    );
    const snap = await getDocs(q);
    const realUsers: RankingEntry[] = snap.docs.map(d => ({
      uid: d.data().uid,
      displayName: d.data().displayName || 'Usuario',
      email: d.data().email || '',
      points: d.data().points || 0,
      isCurrentUser: d.data().uid === currentUid,
    }));

    // Mezclar usuarios reales + fake hasta tener 5 entradas
    let combined = [...realUsers];
    if (combined.length < 5) {
      // Agregar fakes que no dupliquen puntos con reales
      const needed = 5 - combined.length;
      combined = [...combined, ...FAKE_USERS.slice(0, needed)];
    }

    // Ordenar por puntos descendente y tomar top 5
    return combined
      .sort((a, b) => b.points - a.points)
      .slice(0, 5);
  } catch (e) {
    // Si Firebase no está configurado, devolver fakes + usuario actual
    const currentEntry: RankingEntry = {
      uid: currentUid,
      displayName: 'Tú',
      email: '',
      points: 0,
      isCurrentUser: true,
    };
    return [...FAKE_USERS, currentEntry]
      .sort((a, b) => b.points - a.points)
      .slice(0, 5);
  }
};
