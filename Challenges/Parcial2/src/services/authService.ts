// ============================================================
// SERVICIO DE AUTENTICACIÓN — Firebase Auth
// ============================================================
// Capa de abstracción sobre Firebase Auth para registro,
// login y logout. Todas las operaciones retornan el User
// de Firebase que luego maneja el AppContext.
// ============================================================

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../firebase/config';
import { createUserDocument } from './firestoreService';

/**
 * Registrar nuevo usuario con email/password.
 * Crea el documento en Firestore tras el registro.
 */
export const registerUser = async (
  email: string,
  password: string,
  displayName: string
) => {
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  
  // Actualizar displayName en Firebase Auth
  await updateProfile(credential.user, { displayName });

  // Crear documento en Firestore /users/{uid}
  await createUserDocument(credential.user.uid, email, displayName);

  return credential.user;
};

/**
 * Iniciar sesión con email/password.
 */
export const loginUser = async (email: string, password: string) => {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return credential.user;
};

/**
 * Cerrar sesión.
 */
export const logoutUser = async () => {
  await signOut(auth);
};
