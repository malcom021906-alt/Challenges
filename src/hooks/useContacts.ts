import { useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { useNetwork } from './useNetwork';

export interface Contact {
  id: string;
  name: string;
  phone: string;
  createdAt: number;
}

export const useContacts = (userId: string | undefined) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const { isOnline } = useNetwork();

  useEffect(() => {
    if (!userId) {
      setContacts([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const q = query(collection(db, `users/${userId}/contacts`), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const parsedContacts: Contact[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Contact[];
      setContacts(parsedContacts);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching contacts:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userId]);

  const addContact = async (name: string, phone: string) => {
    if (!userId || !isOnline) return;
    await addDoc(collection(db, `users/${userId}/contacts`), {
      name,
      phone,
      createdAt: Date.now(),
    });
  };

  const updateContact = async (id: string, updates: Partial<Omit<Contact, 'id' | 'createdAt'>>) => {
    if (!userId || !isOnline) return;
    await updateDoc(doc(db, `users/${userId}/contacts`, id), updates);
  };

  const deleteContact = async (id: string) => {
    if (!userId || !isOnline) return;
    await deleteDoc(doc(db, `users/${userId}/contacts`, id));
  };

  return {
    contacts,
    loading,
    addContact,
    updateContact,
    deleteContact,
    isOnline,
  };
};
