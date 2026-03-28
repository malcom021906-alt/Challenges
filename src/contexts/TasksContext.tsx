import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useAuthContext } from './AuthContext';
import { useTasks } from '../hooks/useTasks';
import type { Task } from '../types/Task';

interface TasksContextType {
  tasks: Task[];
  loading: boolean;
  addTask: (title: string, description: string) => void;
  updateTask: (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  getTaskById: (id: string) => Task | undefined;
  isOnline: boolean;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuthContext();
  const tasksData = useTasks(user?.uid);
  return (
    <TasksContext.Provider value={tasksData}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasksContext = (): TasksContextType => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error('useTasksContext must be used within a TasksProvider');
  }
  return context;
};
