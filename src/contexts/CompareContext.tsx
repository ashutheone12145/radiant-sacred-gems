import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Product } from '@/types/product';

interface CompareContextType {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  toggleItem: (product: Product) => void;
  isInCompare: (productId: string) => boolean;
  clearCompare: () => void;
  itemCount: number;
  maxItems: number;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

const MAX_COMPARE_ITEMS = 4;

export function CompareProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);

  const addItem = useCallback((product: Product) => {
    setItems(prev => {
      if (prev.length >= MAX_COMPARE_ITEMS) return prev;
      const exists = prev.some(item => item.id === product.id);
      if (exists) return prev;
      return [...prev, product];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems(prev => prev.filter(item => item.id !== productId));
  }, []);

  const toggleItem = useCallback((product: Product) => {
    setItems(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      }
      if (prev.length >= MAX_COMPARE_ITEMS) return prev;
      return [...prev, product];
    });
  }, []);

  const isInCompare = useCallback((productId: string) => {
    return items.some(item => item.id === productId);
  }, [items]);

  const clearCompare = useCallback(() => {
    setItems([]);
  }, []);

  const itemCount = items.length;

  return (
    <CompareContext.Provider value={{
      items,
      addItem,
      removeItem,
      toggleItem,
      isInCompare,
      clearCompare,
      itemCount,
      maxItems: MAX_COMPARE_ITEMS,
    }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
}
