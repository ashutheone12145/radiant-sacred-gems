import { useState, useEffect } from 'react';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify';

export function useShopifyProducts(count = 20, query?: string) {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      setIsLoading(true);
      setError(null);
      
      try {
        const data = await fetchProducts(count, query);
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load products');
        console.error('Failed to fetch products:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
  }, [count, query]);

  return { products, isLoading, error, refetch: () => fetchProducts(count, query).then(setProducts) };
}
