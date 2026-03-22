import { Product, Collection, Review } from '@/types/product';

// 3D Crystal Lamp images
import ganeshaDay from '@assets/Gemini_Generated_Image_8dzrhm8dzrhm8dzr_1774192989588.png';
import ganeshaNight from '@assets/Gemini_Generated_Image_1bbbwl1bbbwl1bbb_1774192989588.png';
import ganeshaGarden from '@assets/Gemini_Generated_Image_ifmulwifmulwifmu_1774192989589.png';
import ganeshaBlue from '@assets/Gemini_Generated_Image_1bbbwl1bbbwl1bbb_1774192989588.png';
import krishnaDay from '@assets/Gemini_Generated_Image_jfqzbljfqzbljfqz_1774192989585.png';
import krishnaNight from '@assets/generated_image_cc67c238-aeed-4a7e-9025-9628be15ae5e_1774192989590.png';
import radhKrishnaGarden from '@assets/Gemini_Generated_Image_67x2q467x2q467x2_1774193025040.png';
import radhKrishna2 from '@assets/71vIhTq82EL._SX522__1774193025041.jpg';
import shivaLamp from '@assets/Gemini_Generated_Image_ed7qkmed7qkmed7q_1774099982880.png';
import lakshmDay from '@assets/Gemini_Generated_Image_lxdikelxdikelxdi_1774192989587.png';

// LED Photo Frame images
import shivaDarkFrame from '@/assets/lifestyle/shiva-dark-frame.jpg';
import shivaPoojaRoom from '@/assets/lifestyle/shiva-pooja-room.jpg';
import shivaFamilyRoom from '@/assets/lifestyle/shiva-family-room.jpg';
import ramPoojaFrame from '@/assets/lifestyle/ram-pooja-frame.jpg';
import krishnaFrame from '@/assets/lifestyle/krishna-frame.jpg';
import hanumanFrame from '@/assets/lifestyle/hanuman-living-room.jpg';
import ganeshaGiftFrame from '@/assets/lifestyle/ganesha-gift-frame.jpg';

// Gift Set image
import giftSetImg from '@/assets/categories/gift-sets.png';

// Crystal lamp aliases
const shivaDay = shivaLamp;
const shivaNight = shivaLamp;
const lakshmNight = lakshmDay;

export const collections: Collection[] = [
  {
    id: 'led-frames',
    name: 'LED Photo Frames',
    slug: 'led-frames',
    description: 'Divine deity LED photo frames with warm golden glow for meditation & devotion',
    image: shivaDarkFrame,
    productCount: 5,
  },
  {
    id: 'crystal-lamps',
    name: '3D Crystal Lamps',
    slug: 'crystal-lamps',
    description: 'Precision-engraved deity crystal lamps with illuminated LED bases',
    image: ganeshaDay,
    productCount: 4,
  },
  {
    id: 'gift-sets',
    name: 'Premium Gift Sets',
    slug: 'gift-sets',
    description: 'Curated Diwali & festive gift boxes with LED frames, crystals & more',
    image: giftSetImg,
    productCount: 3,
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
      gallery: [ganeshaDay, ganeshaNight, ganeshaGarden, ganeshaBlue],
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
      gallery: [krishnaDay, krishnaNight, radhKrishna2, radhKrishnaGarden],
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
      gallery: [shivaDay, shivaNight, shivaDay],
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
    id: 'lakshmi-crystal-lamp',
    name: 'Goddess Lakshmi 3D Crystal Lamp',
    slug: 'lakshmi-crystal-lamp',
    description: 'Welcome prosperity and abundance with our stunning Goddess Lakshmi 3D Crystal Lamp. The divine form of Maa Lakshmi, seated gracefully on a lotus, is captured with exquisite detail. Perfect for Diwali celebrations, pooja rooms, and attracting positive energy.',
    shortDescription: 'Divine Goddess Lakshmi for prosperity and abundance',
    price: 2599,
    compareAtPrice: 3599,
    images: {
      day: lakshmDay,
      night: lakshmNight,
      gallery: [lakshmDay, lakshmNight, lakshmDay, lakshmNight],
    },
    category: 'deity',
    deity: 'lakshmi',
    features: [
      'Premium K9 optical crystal',
      '3D laser engraving technology',
      'Multi-color LED base included',
      'USB powered - safe & energy efficient',
      'Perfect for Diwali celebrations',
      'Attracts wealth and prosperity',
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
    reviewCount: 198,
    tags: ['bestseller', 'lakshmi', 'deity', 'diwali', 'prosperity'],
  },

  // ── LED Photo Frame Products ──────────────────────────────────────
  {
    id: 'shiva-led-frame',
    name: 'Lord Shiva LED Photo Frame',
    slug: 'shiva-led-frame',
    description: 'A masterfully crafted LED backlit photo frame featuring Lord Shiva in deep meditation. The warm golden LED glow creates a divine atmosphere, making it the perfect centrepiece for your pooja room, meditation space, or living area. Premium black frame with fade-resistant print.',
    shortDescription: 'Majestic Lord Shiva LED backlit photo frame with golden glow',
    price: 2699,
    compareAtPrice: 3799,
    images: {
      day: shivaDarkFrame,
      night: shivaPoojaRoom,
      gallery: [shivaDarkFrame, shivaPoojaRoom, shivaFamilyRoom, shivaDarkFrame],
    },
    category: 'led-frame',
    deity: 'shiva',
    features: [
      'Premium black wooden frame',
      'High-resolution devotional print',
      'Warm LED backlight — USB powered',
      'Colour temperature: 3000K warm white',
      'Perfect for pooja rooms & living areas',
      'Ideal gift for all occasions',
    ],
    specifications: {
      size: '12" × 16" (frame), 10" × 14" (print)',
      weight: '850g',
      material: 'MDF frame, acrylic front',
      power: 'USB 5V DC',
      ledType: 'Warm white LED strip',
    },
    inStock: true,
    rating: 4.9,
    reviewCount: 156,
    tags: ['bestseller', 'shiva', 'led-frame', 'pooja', 'gift'],
  },
  {
    id: 'ram-led-frame',
    name: 'Lord Ram LED Photo Frame',
    slug: 'ram-led-frame',
    description: 'Bring the divine energy of Maryada Purushottam Shri Ram into your home with this stunning LED photo frame. The glowing blue-white illumination highlights every detail of the engraved artwork, creating a sacred and serene atmosphere in any room.',
    shortDescription: 'Divine Lord Ram LED photo frame with glowing blue-white light',
    price: 2499,
    compareAtPrice: 3499,
    images: {
      day: ramPoojaFrame,
      night: shivaPoojaRoom,
      gallery: [ramPoojaFrame, shivaPoojaRoom, ramPoojaFrame, shivaPoojaRoom],
    },
    category: 'led-frame',
    deity: 'ram',
    features: [
      'Premium black wooden frame',
      'High-resolution devotional print',
      'Cool LED backlight — USB powered',
      'Perfect for Ramnavami and housewarming',
      'Ready to hang — includes wall mounts',
      'Ideal spiritual gift',
    ],
    specifications: {
      size: '12" × 16" (frame), 10" × 14" (print)',
      weight: '850g',
      material: 'MDF frame, acrylic front',
      power: 'USB 5V DC',
      ledType: 'Cool white LED strip',
    },
    inStock: true,
    rating: 4.8,
    reviewCount: 98,
    tags: ['ram', 'led-frame', 'pooja', 'spiritual'],
  },
  {
    id: 'krishna-led-frame',
    name: 'Lord Krishna LED Photo Frame',
    slug: 'krishna-led-frame',
    description: 'Experience the divine melody of Shri Krishna with this beautifully illuminated LED photo frame. The golden glow complements the intricate artwork, bringing peaceful energy and spiritual joy to meditation corners, pooja rooms, and living spaces.',
    shortDescription: 'Lord Krishna LED photo frame with warm golden illumination',
    price: 2499,
    compareAtPrice: 3499,
    images: {
      day: krishnaFrame,
      night: krishnaFrame,
      gallery: [krishnaFrame, krishnaFrame, shivaDarkFrame, krishnaFrame],
    },
    category: 'led-frame',
    deity: 'krishna',
    features: [
      'Premium black wooden frame',
      'High-resolution devotional print',
      'Warm golden LED backlight',
      'Perfect for Janmashtami celebrations',
      'Ready to hang — includes wall mounts',
      'Creates peaceful meditation ambience',
    ],
    specifications: {
      size: '12" × 16" (frame), 10" × 14" (print)',
      weight: '850g',
      material: 'MDF frame, acrylic front',
      power: 'USB 5V DC',
      ledType: 'Warm white LED strip',
    },
    inStock: true,
    rating: 4.8,
    reviewCount: 112,
    tags: ['krishna', 'led-frame', 'pooja', 'janmashtami'],
  },
  {
    id: 'hanuman-led-frame',
    name: 'Lord Hanuman LED Photo Frame',
    slug: 'hanuman-led-frame',
    description: "Invoke the strength and devotion of Bajrangbali with this powerful LED photo frame. The vibrant illumination brings out the glory of Lord Hanuman's form, filling your space with courage, protection, and positive energy. A perfect addition to home, gym, or study.",
    shortDescription: 'Powerful Lord Hanuman LED photo frame for strength & protection',
    price: 2699,
    compareAtPrice: 3799,
    images: {
      day: hanumanFrame,
      night: hanumanFrame,
      gallery: [hanumanFrame, shivaFamilyRoom, hanumanFrame, shivaDarkFrame],
    },
    category: 'led-frame',
    deity: 'hanuman',
    features: [
      'Premium black wooden frame',
      'High-resolution devotional print',
      'Warm golden LED backlight',
      'Perfect for Hanuman Jayanti',
      'Inspires strength and devotion daily',
      'Ready to hang — includes wall mounts',
    ],
    specifications: {
      size: '12" × 16" (frame), 10" × 14" (print)',
      weight: '850g',
      material: 'MDF frame, acrylic front',
      power: 'USB 5V DC',
      ledType: 'Warm white LED strip',
    },
    inStock: true,
    rating: 4.9,
    reviewCount: 134,
    tags: ['hanuman', 'led-frame', 'pooja', 'strength'],
  },
  {
    id: 'ganesha-led-frame',
    name: 'Lord Ganesha LED Photo Frame',
    slug: 'ganesha-led-frame',
    description: "Welcome new beginnings with our auspicious Lord Ganesha LED Photo Frame. The warm glow highlights every blessed detail of Vighnharta's form, making it the ideal gift for housewarmings, Diwali, and all sacred occasions. Remove obstacles — invite prosperity.",
    shortDescription: 'Auspicious Lord Ganesha LED photo frame — perfect housewarming gift',
    price: 2499,
    compareAtPrice: 3499,
    images: {
      day: ganeshaGiftFrame,
      night: ganeshaGiftFrame,
      gallery: [ganeshaGiftFrame, shivaPoojaRoom, ganeshaGiftFrame, shivaFamilyRoom],
    },
    category: 'led-frame',
    deity: 'ganesha',
    features: [
      'Premium black wooden frame',
      'High-resolution devotional print',
      'Warm golden LED backlight',
      'Perfect housewarming & Diwali gift',
      'Beautifully packaged in gift box',
      'Ready to hang — includes wall mounts',
    ],
    specifications: {
      size: '12" × 16" (frame), 10" × 14" (print)',
      weight: '850g',
      material: 'MDF frame, acrylic front',
      power: 'USB 5V DC',
      ledType: 'Warm white LED strip',
    },
    inStock: true,
    rating: 4.9,
    reviewCount: 178,
    tags: ['bestseller', 'ganesha', 'led-frame', 'gift', 'housewarming', 'diwali'],
  },

  // ── Premium Gift Sets ─────────────────────────────────────────────
  {
    id: 'premium-diwali-gift-set',
    name: 'Premium Diwali Gift Set',
    slug: 'premium-diwali-gift-set',
    description: 'Curate the perfect Diwali celebration with our Premium Gift Set. Includes a Goddess Lakshmi LED Photo Frame, a 3D crystal lamp, and premium packaging with ribbon. A thoughtful, luxurious gift that radiates devotion and prosperity for your loved ones.',
    shortDescription: 'LED frame + crystal lamp in luxury Diwali gift packaging',
    price: 4999,
    compareAtPrice: 6999,
    images: {
      day: giftSetImg,
      night: giftSetImg,
      gallery: [giftSetImg, ganeshaGiftFrame, giftSetImg, lakshmDay],
    },
    category: 'gift-set',
    features: [
      'Lakshmi LED Photo Frame (12"×16")',
      'Ganesha 3D Crystal Lamp (80mm)',
      'Premium gift box with ribbon',
      'Handwritten personalisation card',
      'Diwali packaging with shredded paper fill',
      'Free gift wrapping included',
    ],
    specifications: {
      size: 'Gift box: 35cm × 25cm × 15cm',
      weight: '1.8kg',
      material: 'Assorted (see individual items)',
      power: 'USB 5V DC (both items)',
      ledType: 'Warm white + RGB',
    },
    inStock: true,
    rating: 4.9,
    reviewCount: 89,
    tags: ['bestseller', 'diwali', 'gift-set', 'festival', 'luxury'],
  },
  {
    id: 'housewarming-gift-set',
    name: 'Sacred Housewarming Gift Set',
    slug: 'housewarming-gift-set',
    description: 'Bless a new home with our Sacred Housewarming Gift Set. Contains a Lord Ganesha LED Frame and a Lakshmi Crystal Lamp to invite prosperity, peace, and divine protection into the new space. Presented in a premium gift box.',
    shortDescription: 'Ganesha LED frame + Lakshmi crystal lamp in gift box',
    price: 4499,
    compareAtPrice: 5999,
    images: {
      day: giftSetImg,
      night: giftSetImg,
      gallery: [giftSetImg, ganeshaGiftFrame, lakshmDay, giftSetImg],
    },
    category: 'gift-set',
    features: [
      'Ganesha LED Photo Frame (12"×16")',
      'Lakshmi 3D Crystal Lamp (80mm)',
      'Premium kraft gift box',
      'Personalisation card included',
      'Ready to give — beautifully packed',
      'Free gift wrapping',
    ],
    specifications: {
      size: 'Gift box: 35cm × 25cm × 15cm',
      weight: '1.7kg',
      material: 'Assorted (see individual items)',
      power: 'USB 5V DC (both items)',
      ledType: 'Warm white + RGB',
    },
    inStock: true,
    rating: 4.8,
    reviewCount: 67,
    tags: ['housewarming', 'gift-set', 'ganesha', 'lakshmi'],
  },
  {
    id: 'corporate-gift-set',
    name: 'Corporate Festive Gift Set',
    slug: 'corporate-gift-set',
    description: 'Make a lasting impression with our Corporate Festive Gift Set. A premium 3D crystal lamp in a branded gift box — ideal for Diwali corporate gifting, client appreciation, and employee rewards. Bulk discounts available.',
    shortDescription: 'Premium crystal lamp in branded box — ideal for corporate gifting',
    price: 3499,
    compareAtPrice: 4499,
    images: {
      day: giftSetImg,
      night: giftSetImg,
      gallery: [giftSetImg, ganeshaDay, giftSetImg, lakshmDay],
    },
    category: 'gift-set',
    features: [
      'Lakshmi or Ganesha crystal lamp (choice)',
      'Premium branded gift box',
      'Custom company card slot',
      'Bulk order discounts up to 30%',
      'Same-day dispatch before 2 PM',
      'Free gift wrapping',
    ],
    specifications: {
      size: 'Gift box: 20cm × 20cm × 20cm',
      weight: '900g',
      material: 'K9 Crystal + Natural Wood',
      power: 'USB 5V DC',
      ledType: 'RGB with remote',
    },
    inStock: true,
    rating: 4.7,
    reviewCount: 43,
    tags: ['corporate', 'gift-set', 'bulk', 'diwali', 'business'],
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
    id: 'review-5',
    productId: 'lakshmi-crystal-lamp',
    author: 'Sunita R.',
    rating: 5,
    title: 'Perfect for Diwali',
    content: 'Purchased this beautiful Lakshmi lamp for Diwali and it was the centerpiece of our celebration. The quality is outstanding and the glow is mesmerizing. Will buy more as gifts!',
    date: '2024-01-18',
    verified: true,
  },
  {
    id: 'review-6',
    productId: 'shiva-crystal-lamp',
    author: 'Vikram T.',
    rating: 5,
    title: 'Mahadev is Magnificent',
    content: 'The Shiva lamp exceeded all expectations. The meditation pose is captured so beautifully. It brings such positive energy to my home office. Absolutely love it!',
    date: '2024-01-12',
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
