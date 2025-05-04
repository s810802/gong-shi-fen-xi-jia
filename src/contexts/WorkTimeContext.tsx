
import React, { createContext, useContext, useState, useEffect } from 'react';
import { WorkTimeEntry, Category } from '../types';
import { mockWorkTimeEntries, mockCategories } from '../mockData';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';

interface WorkTimeContextType {
  workTimeEntries: WorkTimeEntry[];
  categories: Category[];
  addWorkTimeEntry: (entry: Omit<WorkTimeEntry, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateWorkTimeEntry: (id: string, entry: Partial<WorkTimeEntry>) => void;
  deleteWorkTimeEntry: (id: string) => void;
  getUserEntries: (userId: string) => WorkTimeEntry[];
  getFilteredEntries: (startDate?: string, endDate?: string, userId?: string) => WorkTimeEntry[];
  isLoading: boolean;
}

const WorkTimeContext = createContext<WorkTimeContextType | undefined>(undefined);

export const WorkTimeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [workTimeEntries, setWorkTimeEntries] = useState<WorkTimeEntry[]>([]);
  const [categories] = useState<Category[]>(mockCategories);
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    // Initialize with mock data
    setWorkTimeEntries(mockWorkTimeEntries);
    setIsLoading(false);
  }, []);

  const addWorkTimeEntry = (entry: Omit<WorkTimeEntry, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newEntry: WorkTimeEntry = {
      ...entry,
      id: `e${Date.now()}`,
      createdAt: now,
      updatedAt: now,
    };

    setWorkTimeEntries((prev) => [...prev, newEntry]);
    toast.success('成功新增工時紀錄');
  };

  const updateWorkTimeEntry = (id: string, entry: Partial<WorkTimeEntry>) => {
    // Check if user is allowed to update this entry
    if (currentUser?.role !== 'admin') {
      const entryToUpdate = workTimeEntries.find(e => e.id === id);
      if (entryToUpdate && entryToUpdate.userId !== currentUser?.id) {
        toast.error('您無權修改此工時紀錄');
        return;
      }
    }

    setWorkTimeEntries((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, ...entry, updatedAt: new Date().toISOString() }
          : item
      )
    );
    toast.success('成功更新工時紀錄');
  };

  const deleteWorkTimeEntry = (id: string) => {
    // Check if user is allowed to delete this entry
    if (currentUser?.role !== 'admin') {
      const entryToDelete = workTimeEntries.find(e => e.id === id);
      if (entryToDelete && entryToDelete.userId !== currentUser?.id) {
        toast.error('您無權刪除此工時紀錄');
        return;
      }
    }

    setWorkTimeEntries((prev) => prev.filter((item) => item.id !== id));
    toast.success('成功刪除工時紀錄');
  };

  const getUserEntries = (userId: string) => {
    return workTimeEntries.filter((entry) => entry.userId === userId);
  };

  const getFilteredEntries = (startDate?: string, endDate?: string, userId?: string) => {
    return workTimeEntries.filter((entry) => {
      // Filter by date range if provided
      const dateInRange =
        (!startDate || entry.date >= startDate) &&
        (!endDate || entry.date <= endDate);

      // Filter by user if provided or if current user is not admin
      const userMatches = userId
        ? entry.userId === userId
        : currentUser?.role === 'admin' || entry.userId === currentUser?.id;

      return dateInRange && userMatches;
    });
  };

  return (
    <WorkTimeContext.Provider
      value={{
        workTimeEntries,
        categories,
        addWorkTimeEntry,
        updateWorkTimeEntry,
        deleteWorkTimeEntry,
        getUserEntries,
        getFilteredEntries,
        isLoading,
      }}
    >
      {children}
    </WorkTimeContext.Provider>
  );
};

export const useWorkTime = (): WorkTimeContextType => {
  const context = useContext(WorkTimeContext);
  if (context === undefined) {
    throw new Error('useWorkTime must be used within a WorkTimeProvider');
  }
  return context;
};
