import { z } from 'zod';

// Checkout form validation schema
export const checkoutSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  firstName: z
    .string()
    .trim()
    .min(1, { message: "First name is required" })
    .max(50, { message: "First name must be less than 50 characters" })
    .regex(/^[a-zA-Z\s'-]+$/, { message: "First name contains invalid characters" }),
  lastName: z
    .string()
    .trim()
    .min(1, { message: "Last name is required" })
    .max(50, { message: "Last name must be less than 50 characters" })
    .regex(/^[a-zA-Z\s'-]+$/, { message: "Last name contains invalid characters" }),
  phone: z
    .string()
    .trim()
    .min(1, { message: "Phone number is required" })
    .regex(/^\+?[0-9\s-]{10,15}$/, { message: "Invalid phone number format" }),
  address: z
    .string()
    .trim()
    .min(1, { message: "Address is required" })
    .max(200, { message: "Address must be less than 200 characters" }),
  city: z
    .string()
    .trim()
    .min(1, { message: "City is required" })
    .max(100, { message: "City must be less than 100 characters" }),
  state: z
    .string()
    .trim()
    .min(1, { message: "State is required" })
    .max(100, { message: "State must be less than 100 characters" }),
  pincode: z
    .string()
    .trim()
    .min(1, { message: "PIN code is required" })
    .regex(/^[0-9]{6}$/, { message: "PIN code must be 6 digits" }),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;

// Product validation schema for localStorage
export const storedProductSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).max(200),
  slug: z.string().min(1).max(200),
  description: z.string().max(2000),
  shortDescription: z.string().max(500),
  price: z.number().positive(),
  compareAtPrice: z.number().positive().optional(),
  images: z.object({
    day: z.string(),
    night: z.string(),
    gallery: z.array(z.string()),
  }),
  category: z.enum(['deity', 'galaxy', 'accessories']),
  deity: z.enum(['ganesha', 'krishna', 'shiva', 'hanuman', 'lakshmi', 'durga']).optional(),
  features: z.array(z.string()),
  specifications: z.object({
    size: z.string(),
    weight: z.string(),
    material: z.string(),
    power: z.string(),
    ledType: z.string(),
  }),
  inStock: z.boolean(),
  rating: z.number().min(0).max(5),
  reviewCount: z.number().min(0),
  tags: z.array(z.string()),
});

export const storedProductsArraySchema = z.array(storedProductSchema);

import type { Product } from '@/types/product';

/**
 * Safely parse localStorage data with validation
 */
export function parseStoredProducts(storageKey: string): Product[] {
  try {
    const stored = localStorage.getItem(storageKey);
    if (!stored) return [];
    
    const parsed = JSON.parse(stored);
    const result = storedProductsArraySchema.safeParse(parsed);
    
    if (result.success) {
      // Cast to Product[] since we validated the shape matches
      return result.data as Product[];
    }
    
    // If validation fails, clear invalid data
    console.warn(`Invalid data in ${storageKey}, clearing storage`);
    localStorage.removeItem(storageKey);
    return [];
  } catch (error) {
    // JSON parse failed
    console.warn(`Failed to parse ${storageKey}, clearing storage`);
    localStorage.removeItem(storageKey);
    return [];
  }
}
