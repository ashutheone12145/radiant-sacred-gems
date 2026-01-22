export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  compareAtPrice?: number;
  images: {
    day: string;
    night: string;
    gallery: string[];
  };
  category: 'deity' | 'galaxy' | 'accessories';
  deity?: 'ganesha' | 'krishna' | 'shiva' | 'hanuman' | 'lakshmi' | 'durga' | 'saraswati';
  features: string[];
  specifications: {
    size: string;
    weight: string;
    material: string;
    power: string;
    ledType: string;
  };
  inStock: boolean;
  rating: number;
  reviewCount: number;
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  giftMessage?: string;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  verified: boolean;
  images?: string[];
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}
