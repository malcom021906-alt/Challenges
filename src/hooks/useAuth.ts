import { useState, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth } from '../firebase';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export const useAuth = () => {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setState((prev) => ({ ...prev, user, loading: false }));
    });
    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al iniciar sesión';
      setState((prev) => ({ ...prev, loading: false, error: message }));
      throw err;
    }
  };

  const register = async (email: string, password: string) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al registrarse';
      setState((prev) => ({ ...prev, loading: false, error: message }));
      throw err;
    }
  };

  const logout = async () => {
    setState((prev) => ({ ...prev, loading: true }));
    try {
      await signOut(auth);
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  const clearError = () => setState((prev) => ({ ...prev, error: null }));

  return { ...state, login, register, logout, clearError };
};
