import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  deleteDoc, 
  doc, 
  updateDoc 
} from 'firebase/firestore';
import { useAuthContext } from '../contexts/AuthContext';
import { useNetwork } from './useNetwork';

export interface Fruit {
  id: string;
  name: string;
  quantity: number;
  createdAt: number;
}

export const useFruits = () => {
  const [fruits, setFruits] = useState<Fruit[]>([]);
  const { user } = useAuthContext();
  const { isOnline } = useNetwork();

  useEffect(() => {
    if (!user) return;

    const fruitsRef = collection(db, `users/${user.uid}/fruits`);
    const q = query(fruitsRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fruitsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Fruit[];
      setFruits(fruitsData);
    });

    return () => unsubscribe();
  }, [user]);

  const addFruit = async (name: string, quantity: number) => {
    if (!isOnline) throw new Error('No internet connection');
    if (!user) return;

    const fruitsRef = collection(db, `users/${user.uid}/fruits`);
    await addDoc(fruitsRef, {
      name,
      quantity,
      createdAt: Date.now()
    });
  };

  const updateFruit = async (id: string, updates: Partial<Fruit>) => {
    if (!isOnline) throw new Error('No internet connection');
    if (!user) return;

    const fruitDoc = doc(db, `users/${user.uid}/fruits`, id);
    await updateDoc(fruitDoc, updates);
  };

  const deleteFruit = async (id: string) => {
    if (!isOnline) throw new Error('No internet connection');
    if (!user) return;

    const fruitDoc = doc(db, `users/${user.uid}/fruits`, id);
    await deleteDoc(fruitDoc);
  };

  return {
    fruits,
    addFruit,
    updateFruit,
    deleteFruit,
    isOnline
  };
};
