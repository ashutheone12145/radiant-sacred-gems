import { useState, useEffect, useMemo } from 'react';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify';
import type { Collection } from '@/types/product';

// Static collection definitions that map to Shopify product types/tags
const COLLECTION_DEFINITIONS = [
  {
    id: 'deity-lamps',
    name: 'Sacred Deity Collection',
    slug: 'deity-lamps',
    description: 'Sacred crystal lamps featuring beloved Hindu deities',
    query: 'product_type:deity OR tag:deity',
  },
  {
    id: 'galaxy-collection',
    name: 'Cosmic Galaxy Series',
    slug: 'galaxy-collection',
    description: 'Mesmerizing galaxy crystal balls that bring the cosmos home',
    query: 'product_type:galaxy OR tag:galaxy',
  },
  {
    id: 'accessories',
    name: 'Bases & Accessories',
    slug: 'accessories',
    description: 'Premium wooden LED bases and USB cables',
    query: 'product_type:accessories OR tag:accessory',
  },
];

export function useShopifyCollections() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      setIsLoading(true);
      setError(null);
      
      try {
        const data = await fetchProducts(50);
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load collections');
        console.error('Failed to fetch products for collections:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
  }, []);

  const collections = useMemo<Collection[]>(() => {
    if (products.length === 0) {
      // Return collection definitions with 0 counts when no products
      return COLLECTION_DEFINITIONS.map(def => ({
        id: def.id,
        name: def.name,
        slug: def.slug,
        description: def.description,
        image: '/placeholder.svg',
        productCount: 0,
      }));
    }

    return COLLECTION_DEFINITIONS.map(def => {
      // Count products that match this collection based on tags or product type
      const matchingProducts = products.filter(p => {
        const product = p.node;
        const title = product.title.toLowerCase();
        const handle = product.handle.toLowerCase();
        
        // Match based on collection type
        if (def.id === 'deity-lamps') {
          return title.includes('ganesha') || 
                 title.includes('krishna') || 
                 title.includes('shiva') ||
                 title.includes('hanuman') ||
                 title.includes('lakshmi') ||
                 title.includes('durga') ||
                 title.includes('saraswati') ||
                 title.includes('deity') ||
                 handle.includes('deity');
        }
        if (def.id === 'galaxy-collection') {
          return title.includes('galaxy') || 
                 title.includes('cosmos') || 
                 title.includes('solar') ||
                 title.includes('moon') ||
                 title.includes('nebula') ||
                 handle.includes('galaxy');
        }
        if (def.id === 'accessories') {
          return title.includes('base') || 
                 title.includes('accessory') || 
                 title.includes('cable') ||
                 title.includes('stand') ||
                 handle.includes('base') ||
                 handle.includes('accessory');
        }
        return false;
      });

      // Use first matching product image or fallback
      const firstImage = matchingProducts[0]?.node.images?.edges?.[0]?.node.url || 
                         products[0]?.node.images?.edges?.[0]?.node.url ||
                         '/placeholder.svg';

      return {
        id: def.id,
        name: def.name,
        slug: def.slug,
        description: def.description,
        image: firstImage,
        productCount: matchingProducts.length || products.length, // Show all products count if no specific matches
      };
    });
  }, [products]);

  return { collections, products, isLoading, error };
}

// Hook to get products for a specific collection
export function useCollectionProducts(collectionSlug: string) {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      setIsLoading(true);
      setError(null);
      
      try {
        const allProducts = await fetchProducts(50);
        
        // Filter products based on collection
        const filtered = allProducts.filter(p => {
          const product = p.node;
          const title = product.title.toLowerCase();
          const handle = product.handle.toLowerCase();

          if (collectionSlug === 'all') return true;
          
          if (collectionSlug === 'deity-lamps') {
            return title.includes('ganesha') || 
                   title.includes('krishna') || 
                   title.includes('shiva') ||
                   title.includes('hanuman') ||
                   title.includes('lakshmi') ||
                   title.includes('durga') ||
                   title.includes('saraswati') ||
                   title.includes('deity') ||
                   handle.includes('deity');
          }
          if (collectionSlug === 'galaxy-collection') {
            return title.includes('galaxy') || 
                   title.includes('cosmos') || 
                   title.includes('solar') ||
                   title.includes('moon') ||
                   title.includes('nebula') ||
                   handle.includes('galaxy');
          }
          if (collectionSlug === 'accessories') {
            return title.includes('base') || 
                   title.includes('accessory') || 
                   title.includes('cable') ||
                   title.includes('stand') ||
                   handle.includes('base') ||
                   handle.includes('accessory');
          }
          return true;
        });

        setProducts(filtered.length > 0 ? filtered : allProducts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load products');
        console.error('Failed to fetch collection products:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
  }, [collectionSlug]);

  return { products, isLoading, error };
}
