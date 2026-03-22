import { useState, useEffect, useMemo } from 'react';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify';
import { collections as localCollections } from '@/data/products';
import type { Collection } from '@/types/product';

const COLLECTION_DEFINITIONS = [
  {
    id: 'led-frames',
    name: 'LED Photo Frames',
    slug: 'led-frames',
    description: 'Illuminated crystal photo frames with sacred deity artwork',
    query: 'product_type:led-frame OR tag:led-frame',
    matchFn: (title: string, handle: string) =>
      title.includes('led') || title.includes('frame') || handle.includes('frame'),
  },
  {
    id: 'crystal-lamps',
    name: '3D Crystal Lamps',
    slug: 'crystal-lamps',
    description: 'Handcrafted 3D crystal ball lamps with deity engravings',
    query: 'product_type:deity OR tag:crystal-lamp',
    matchFn: (title: string, handle: string) =>
      title.includes('crystal') || title.includes('lamp') || handle.includes('crystal'),
  },
  {
    id: 'gift-sets',
    name: 'Gift Sets',
    slug: 'gift-sets',
    description: 'Curated spiritual gift sets for every sacred occasion',
    query: 'product_type:gift-set OR tag:gift-set',
    matchFn: (title: string, handle: string) =>
      title.includes('gift') || title.includes('set') || handle.includes('gift'),
  },
];

export function useShopifyCollections() {
  const [shopifyProducts, setShopifyProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchProducts(50);
        setShopifyProducts(data);
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
    if (shopifyProducts.length === 0) {
      return localCollections;
    }

    return COLLECTION_DEFINITIONS.map(def => {
      const matching = shopifyProducts.filter(p => {
        const title = p.node.title.toLowerCase();
        const handle = p.node.handle.toLowerCase();
        return def.matchFn(title, handle);
      });

      const local = localCollections.find(c => c.slug === def.slug);
      const firstImage =
        matching[0]?.node.images?.edges?.[0]?.node.url ||
        local?.image ||
        '/placeholder.svg';

      return {
        id: def.id,
        name: def.name,
        slug: def.slug,
        description: def.description,
        image: firstImage,
        productCount: matching.length || local?.productCount || 0,
      };
    });
  }, [shopifyProducts]);

  return { collections, products: shopifyProducts, isLoading, error };
}

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

        const filtered = allProducts.filter(p => {
          const title = p.node.title.toLowerCase();
          const handle = p.node.handle.toLowerCase();

          if (collectionSlug === 'all') return true;

          const def = COLLECTION_DEFINITIONS.find(d => d.slug === collectionSlug);
          if (def) return def.matchFn(title, handle);
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
