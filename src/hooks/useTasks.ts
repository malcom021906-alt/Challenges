import { useState, useEffect } from 'react';
import { ref, onValue, set, update, remove, push } from 'firebase/database';
import { rtdb } from '../firebase';
import type { Task } from '../types/Task';
import { useNetwork } from './useNetwork';

export const useTasks = (userId: string | undefined) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const { isOnline } = useNetwork();

  useEffect(() => {
    if (!userId) {
      setTasks([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const tasksRef = ref(rtdb, `users/${userId}/tasks`);
    
    const unsubscribe = onValue(tasksRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const parsedTasks: Task[] = Object.entries(data).map(([key, value]: [string, any]) => ({
          ...value,
          id: key,
        }));
        parsedTasks.sort((a, b) => b.createdAt - a.createdAt);
        setTasks(parsedTasks);
      } else {
        setTasks([]);
      }
      setLoading(false);
    }, (error) => {
      console.error("Error fetching tasks:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userId]);

  const addTask = async (title: string, description: string) => {
    if (!userId || !isOnline) return;
    const tasksRef = ref(rtdb, `users/${userId}/tasks`);
    const newTaskRef = push(tasksRef);
    const newTask = {
      title,
      description,
      completed: false,
      createdAt: Date.now(),
    };
    await set(newTaskRef, newTask);
  };

  const updateTask = async (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
    if (!userId || !isOnline) return;
    const taskRef = ref(rtdb, `users/${userId}/tasks/${id}`);
    await update(taskRef, updates);
  };

  const deleteTask = async (id: string) => {
    if (!userId || !isOnline) return;
    const taskRef = ref(rtdb, `users/${userId}/tasks/${id}`);
    await remove(taskRef);
  };

  const toggleTask = async (id: string) => {
    if (!userId || !isOnline) return;
    const task = tasks.find(t => t.id === id);
    if (task) {
      const taskRef = ref(rtdb, `users/${userId}/tasks/${id}`);
      await update(taskRef, { completed: !task.completed });
    }
  };

  const getTaskById = (id: string): Task | undefined => {
    return tasks.find((task) => task.id === id);
  };

  return {
    tasks,
    loading,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    getTaskById,
    isOnline,
  };
};
