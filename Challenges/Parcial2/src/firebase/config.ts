// ============================================================
// FIREBASE CONFIGURATION
// ============================================================
// IMPORTANTE: Reemplaza los valores placeholders con los de tu
// proyecto Firebase en: console.firebase.google.com
// Pasos:
//   1. Crear proyecto Firebase (nombre: parcial2-misiones)
//   2. Agregar app Web → copiar firebaseConfig
//   3. Activar Authentication → Email/Password
//   4. Crear Firestore Database (modo prueba)
// ============================================================

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
