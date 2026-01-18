import { Product, Collection, Review } from '@/types/product';

// Product images - User uploaded
import ganeshaDay from '@/assets/products/ganesha-lamp-1.jpg';
import ganeshaNight from '@/assets/products/ganesha-lamp-2.jpg';
import krishnaDay from '@/assets/products/krishna-lamp.jpg';
import krishnaNight from '@/assets/products/krishna-lamp.jpg';
import heroLamp from '@/assets/products/hero-lamp.jpg';

// Reuse images for other products
const shivaDay = heroLamp;
const shivaNight = heroLamp;
const hanumanDay = ganeshaDay;
const hanumanNight = ganeshaNight;
const galaxyDay = krishnaDay;
const galaxyNight = krishnaNight;
const woodenBaseDay = ganeshaDay;
const woodenBaseNight = ganeshaNight;

export const collections: Collection[] = [
  {
    id: 'deity-lamps',
    name: 'Sacred Deity Collection',
    slug: 'deity-lamps',
    description: 'Sacred crystal lamps featuring beloved Hindu deities',
    image: ganeshaNight,
    productCount: 12,
  },
  {
    id: 'galaxy-collection',
    name: 'Cosmic Galaxy Series',
    slug: 'galaxy-collection',
    description: 'Mesmerizing galaxy crystal balls that bring the cosmos home',
    image: galaxyNight,
    productCount: 6,
  },
  {
    id: 'accessories',
    name: 'Bases & Accessories',
    slug: 'accessories',
    description: 'Premium wooden LED bases and USB cables',
    image: woodenBaseNight,
    productCount: 8,
  },
];

export const products: Product[] = [
  {
    id: 'ganesha-crystal-lamp',
    name: 'Lord Ganesha 3D Crystal Lamp',
    slug: 'ganesha-crystal-lamp',
    description: 'Experience divine blessings with our exquisite Lord Ganesha 3D Crystal Lamp. Masterfully laser-engraved into premium K9 crystal, this sacred piece captures every intricate detail of Lord Ganesha, the remover of obstacles and god of new beginnings. When illuminated, the crystal transforms into a radiant beacon of spiritual light, creating a mesmerizing 3D effect that brings the deity to life.',
    shortDescription: 'Laser-engraved Lord Ganesha in premium K9 crystal with LED illumination',
    price: 2499,
    compareAtPrice: 3499,
    images: {
      day: ganeshaDay,
      night: ganeshaNight,
      gallery: [ganeshaDay, ganeshaNight, ganeshaDay, ganeshaNight],
    },
    category: 'deity',
    deity: 'ganesha',
    features: [
      'Premium K9 optical crystal',
      '3D laser engraving technology',
      'Multi-color LED base included',
      'USB powered - safe & energy efficient',
      'Perfect for pooja room or home décor',
      'Ideal gift for all occasions',
    ],
    specifications: {
      size: '80mm x 80mm x 80mm',
      weight: '450g',
      material: 'K9 Optical Crystal',
      power: 'USB 5V DC',
      ledType: 'RGB Multi-color with remote',
    },
    inStock: true,
    rating: 4.9,
    reviewCount: 247,
    tags: ['bestseller', 'ganesha', 'deity', 'pooja'],
  },
  {
    id: 'krishna-crystal-lamp',
    name: 'Lord Krishna 3D Crystal Lamp',
    slug: 'krishna-crystal-lamp',
    description: 'Bring the divine charm of Lord Krishna into your home with this stunning 3D crystal lamp. The intricate laser engraving captures Krishna playing his enchanting flute, creating a peaceful and devotional atmosphere. Perfect for meditation spaces, pooja rooms, or as a centerpiece in your living area.',
    shortDescription: 'Beautiful Lord Krishna with flute engraved in premium crystal',
    price: 2499,
    compareAtPrice: 3499,
    images: {
      day: krishnaDay,
      night: krishnaNight,
      gallery: [krishnaDay, krishnaNight, krishnaDay, krishnaNight],
    },
    category: 'deity',
    deity: 'krishna',
    features: [
      'Premium K9 optical crystal',
      '3D laser engraving technology',
      'Multi-color LED base included',
      'USB powered - safe & energy efficient',
      'Perfect for pooja room or home décor',
      'Ideal gift for Janmashtami',
    ],
    specifications: {
      size: '80mm x 80mm x 80mm',
      weight: '450g',
      material: 'K9 Optical Crystal',
      power: 'USB 5V DC',
      ledType: 'RGB Multi-color with remote',
    },
    inStock: true,
    rating: 4.8,
    reviewCount: 189,
    tags: ['popular', 'krishna', 'deity', 'pooja'],
  },
  {
    id: 'shiva-crystal-lamp',
    name: 'Lord Shiva 3D Crystal Lamp',
    slug: 'shiva-crystal-lamp',
    description: 'Embrace the divine energy of Lord Shiva with this magnificent 3D crystal lamp. The powerful imagery of Mahadev in deep meditation is captured with stunning precision, creating an aura of peace and strength. The LED illumination brings out the mystical qualities of the crystal.',
    shortDescription: 'Majestic Lord Shiva in meditation pose crystal lamp',
    price: 2699,
    compareAtPrice: 3799,
    images: {
      day: shivaDay,
      night: shivaNight,
      gallery: [shivaDay, shivaNight, shivaDay, shivaNight],
    },
    category: 'deity',
    deity: 'shiva',
    features: [
      'Premium K9 optical crystal',
      '3D laser engraving technology',
      'Multi-color LED base included',
      'USB powered - safe & energy efficient',
      'Perfect for Shivratri celebrations',
      'Comes in premium gift packaging',
    ],
    specifications: {
      size: '100mm x 100mm x 100mm',
      weight: '650g',
      material: 'K9 Optical Crystal',
      power: 'USB 5V DC',
      ledType: 'RGB Multi-color with remote',
    },
    inStock: true,
    rating: 4.9,
    reviewCount: 156,
    tags: ['premium', 'shiva', 'deity', 'pooja'],
  },
  {
    id: 'hanuman-crystal-lamp',
    name: 'Lord Hanuman 3D Crystal Lamp',
    slug: 'hanuman-crystal-lamp',
    description: 'Invoke the strength and devotion of Lord Hanuman with this powerful 3D crystal lamp. The fierce yet benevolent form of Bajrangbali is beautifully rendered in premium crystal, creating an inspiring piece that radiates courage and faith.',
    shortDescription: 'Powerful Lord Hanuman crystal lamp for strength and protection',
    price: 2499,
    compareAtPrice: 3499,
    images: {
      day: hanumanDay,
      night: hanumanNight,
      gallery: [hanumanDay, hanumanNight, hanumanDay, hanumanNight],
    },
    category: 'deity',
    deity: 'hanuman',
    features: [
      'Premium K9 optical crystal',
      '3D laser engraving technology',
      'Multi-color LED base included',
      'USB powered - safe & energy efficient',
      'Perfect for Hanuman Jayanti',
      'Ideal for gym or study room',
    ],
    specifications: {
      size: '80mm x 80mm x 80mm',
      weight: '450g',
      material: 'K9 Optical Crystal',
      power: 'USB 5V DC',
      ledType: 'RGB Multi-color with remote',
    },
    inStock: true,
    rating: 4.8,
    reviewCount: 134,
    tags: ['strength', 'hanuman', 'deity', 'protection'],
  },
  {
    id: 'galaxy-crystal-ball',
    name: 'Galaxy Crystal Ball Lamp',
    slug: 'galaxy-crystal-ball',
    description: 'Bring the infinite beauty of the cosmos into your space with our Galaxy Crystal Ball Lamp. This mesmerizing piece features a stunning nebula design that creates an enchanting atmosphere when lit. Perfect for astronomy lovers, meditation spaces, or as a unique night light.',
    shortDescription: 'Stunning galaxy nebula design in crystal ball with LED base',
    price: 1999,
    compareAtPrice: 2799,
    images: {
      day: galaxyDay,
      night: galaxyNight,
      gallery: [galaxyDay, galaxyNight, galaxyDay, galaxyNight],
    },
    category: 'galaxy',
    features: [
      'High-clarity optical crystal',
      'Mesmerizing galaxy nebula design',
      'Wooden LED base included',
      'USB powered',
      'Creates stunning ambient lighting',
      'Perfect for bedroom or office',
    ],
    specifications: {
      size: '60mm diameter sphere',
      weight: '350g',
      material: 'Optical Crystal Glass',
      power: 'USB 5V DC',
      ledType: 'Warm white LED',
    },
    inStock: true,
    rating: 4.7,
    reviewCount: 203,
    tags: ['galaxy', 'cosmic', 'night-light', 'trending'],
  },
  {
    id: 'wooden-led-base',
    name: 'Premium Wooden LED Base',
    slug: 'wooden-led-base',
    description: 'Elevate your crystal lamp with our handcrafted premium wooden LED base. Made from sustainable wood with a smooth finish, this base features multi-color LED lights with remote control. Compatible with all our crystal lamps and balls.',
    shortDescription: 'Handcrafted wooden base with RGB LED lights and remote',
    price: 699,
    compareAtPrice: 999,
    images: {
      day: woodenBaseDay,
      night: woodenBaseNight,
      gallery: [woodenBaseDay, woodenBaseNight, woodenBaseDay],
    },
    category: 'accessories',
    features: [
      'Handcrafted from sustainable wood',
      'RGB multi-color LED lights',
      'Remote control included',
      'USB powered cable included',
      'Compatible with 60-100mm crystals',
      'Non-slip rubber padding',
    ],
    specifications: {
      size: '100mm x 100mm x 25mm',
      weight: '180g',
      material: 'Natural Wood',
      power: 'USB 5V DC',
      ledType: 'RGB with 16 colors',
    },
    inStock: true,
    rating: 4.6,
    reviewCount: 89,
    tags: ['accessory', 'base', 'led'],
  },
];

export const reviews: Review[] = [
  {
    id: 'review-1',
    productId: 'ganesha-crystal-lamp',
    author: 'Priya S.',
    rating: 5,
    title: 'Absolutely Divine!',
    content: 'This Ganesha lamp is beyond beautiful. The 3D effect is stunning and it creates such a peaceful atmosphere in my pooja room. The quality is excellent and packaging was very secure. Highly recommend!',
    date: '2024-01-15',
    verified: true,
  },
  {
    id: 'review-2',
    productId: 'ganesha-crystal-lamp',
    author: 'Rajesh K.',
    rating: 5,
    title: 'Perfect Gift',
    content: 'Bought this as a housewarming gift and the recipients absolutely loved it. The lamp looks even better in person than in photos. Very satisfied with the purchase.',
    date: '2024-01-10',
    verified: true,
  },
  {
    id: 'review-3',
    productId: 'krishna-crystal-lamp',
    author: 'Meera D.',
    rating: 5,
    title: 'Beautiful Krishna Lamp',
    content: 'The details on Lord Krishna are incredible. Love how the LED lights make it glow at night. Perfect addition to my meditation corner.',
    date: '2024-01-08',
    verified: true,
  },
  {
    id: 'review-4',
    productId: 'galaxy-crystal-ball',
    author: 'Arjun M.',
    rating: 4,
    title: 'Great Night Light',
    content: 'My kids love this galaxy lamp! It creates a wonderful ambiance in their room. Only giving 4 stars because delivery took a bit longer than expected.',
    date: '2024-01-05',
    verified: true,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getProductsByCategory(category: Product['category']): Product[] {
  return products.filter(p => p.category === category);
}

export function getProductsByDeity(deity: Product['deity']): Product[] {
  return products.filter(p => p.deity === deity);
}

export function getRelatedProducts(productId: string, limit = 4): Product[] {
  const product = products.find(p => p.id === productId);
  if (!product) return [];
  
  return products
    .filter(p => p.id !== productId && (p.category === product.category || p.deity === product.deity))
    .slice(0, limit);
}

export function getProductReviews(productId: string): Review[] {
  return reviews.filter(r => r.productId === productId);
}
