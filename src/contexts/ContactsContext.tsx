import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useContacts } from '../hooks/useContacts';
import type { Contact } from '../hooks/useContacts';
import { useAuthContext } from './AuthContext';

interface ContactsContextType {
  contacts: Contact[];
  loading: boolean;
  addContact: (name: string, phone: string) => void;
  updateContact: (id: string, updates: Partial<Omit<Contact, 'id' | 'createdAt'>>) => void;
  deleteContact: (id: string) => void;
  isOnline: boolean;
}

const ContactsContext = createContext<ContactsContextType | undefined>(undefined);

export const ContactsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuthContext();
  const contactsData = useContacts(user?.uid);
  return (
    <ContactsContext.Provider value={contactsData}>
      {children}
    </ContactsContext.Provider>
  );
};

export const useContactsContext = (): ContactsContextType => {
  const context = useContext(ContactsContext);
  if (!context) {
    throw new Error('useContactsContext must be used within a ContactsProvider');
  }
  return context;
};
