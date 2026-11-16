import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Product, Category } from '../types';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import {
  fetchProductsFromSupabase,
  fetchCategoriesFromSupabase,
  syncStoreToSupabase,
  testSupabaseConnection,
  SUPABASE_URL,
} from '../utils/supabase';

interface StoreDataContextType {
  products: Product[];
  categories: Category[];
  isLoading: boolean;
  isSupabaseConnected: boolean;
  isSyncing: boolean;
  syncResult: { success: boolean; message: string } | null;
  syncAllToSupabase: () => Promise<void>;
  reloadStoreData: () => Promise<void>;
  databaseProjectId: string;
}

const StoreDataContext = createContext<StoreDataContextType | undefined>(undefined);

export const StoreDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [categories, setCategories] = useState<Category[]>(CATEGORIES);
  const [isLoading, setIsLoading] = useState(true);
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<{ success: boolean; message: string } | null>(null);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    // Check connection first
    const conn = await testSupabaseConnection();
    setIsSupabaseConnected(conn.connected);

    // If connected, fetch products and categories from Supabase
    if (conn.connected) {
      const [prodRes, catRes] = await Promise.all([
        fetchProductsFromSupabase(),
        fetchCategoriesFromSupabase(),
      ]);

      if (prodRes.fromSupabase && prodRes.products.length > 0) {
        setProducts(prodRes.products);
      }
      if (catRes.fromSupabase && catRes.categories.length > 0) {
        setCategories(catRes.categories);
      }
    } else {
      // Fallback local products and categories
      setProducts(PRODUCTS);
      setCategories(CATEGORIES);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const syncAllToSupabase = async () => {
    setIsSyncing(true);
    setSyncResult(null);

    const result = await syncStoreToSupabase();
    setSyncResult(result);
    setIsSyncing(false);

    if (result.success) {
      setIsSupabaseConnected(true);
      await loadData();
    }
  };

  return (
    <StoreDataContext.Provider
      value={{
        products,
        categories,
        isLoading,
        isSupabaseConnected,
        isSyncing,
        syncResult,
        syncAllToSupabase,
        reloadStoreData: loadData,
        databaseProjectId: 'uqwspxezlxfxgflmoazr',
      }}
    >
      {children}
    </StoreDataContext.Provider>
  );
};

export const useStoreData = (): StoreDataContextType => {
  const context = useContext(StoreDataContext);
  if (!context) {
    throw new Error('useStoreData must be used within a StoreDataProvider');
  }
  return context;
};
