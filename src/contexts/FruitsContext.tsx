import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useFruits } from '../hooks/useFruits';
import type { Fruit } from '../hooks/useFruits';

interface FruitsContextType {
  fruits: Fruit[];
  addFruit: (name: string, quantity: number) => Promise<void>;
  updateFruit: (id: string, updates: Partial<Fruit>) => Promise<void>;
  deleteFruit: (id: string) => Promise<void>;
  isOnline: boolean;
}

const FruitsContext = createContext<FruitsContextType | undefined>(undefined);

export const FruitsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const fruitsData = useFruits();

  return (
    <FruitsContext.Provider value={fruitsData}>
      {children}
    </FruitsContext.Provider>
  );
};

export const useFruitsContext = () => {
  const context = useContext(FruitsContext);
  if (context === undefined) {
    throw new Error('useFruitsContext must be used within a FruitsProvider');
  }
  return context;
};
