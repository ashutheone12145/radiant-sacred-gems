import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { Product } from '@/types/product';

interface RecentlyViewedContextType {
  items: Product[];
  addItem: (product: Product) => void;
  clearHistory: () => void;
  itemCount: number;
}

const RecentlyViewedContext = createContext<RecentlyViewedContextType | undefined>(undefined);

const STORAGE_KEY = 'divine-crystal-recently-viewed';
const MAX_ITEMS = 8;

export function RecentlyViewedProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((product: Product) => {
    setItems(prev => {
      // Remove if already exists (will be re-added at front)
      const filtered = prev.filter(item => item.id !== product.id);
      // Add to front, limit to MAX_ITEMS
      const updated = [product, ...filtered].slice(0, MAX_ITEMS);
      return updated;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setItems([]);
  }, []);

  const itemCount = items.length;

  return (
    <RecentlyViewedContext.Provider value={{
      items,
      addItem,
      clearHistory,
      itemCount,
    }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export function useRecentlyViewed() {
  const context = useContext(RecentlyViewedContext);
  if (context === undefined) {
    throw new Error('useRecentlyViewed must be used within a RecentlyViewedProvider');
  }
  return context;
}
