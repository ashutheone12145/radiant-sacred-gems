import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingBag } from 'lucide-react';
import { Product } from '@/types/product';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCart();
  const [isNightMode, setIsNightMode] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const discount = product.compareAtPrice 
    ? Math.round((1 - product.price / product.compareAtPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="product-card group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <Link to={`/product/${product.slug}`} className="block relative aspect-square overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-foreground/5" />
        
        {/* Day/Night Toggle */}
        <motion.img
          src={isNightMode ? product.images.night : product.images.day}
          alt={product.name}
          className={`w-full h-full object-cover transition-all duration-700 ${
            isNightMode ? 'brightness-50' : ''
          }`}
        />

        {/* Glow Effect */}
        {isNightMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at center 60%, hsl(43 90% 60% / 0.3) 0%, transparent 50%)',
            }}
          />
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {discount > 0 && (
            <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-sm">
              -{discount}%
            </span>
          )}
          {product.tags.includes('bestseller') && (
            <span className="bg-accent text-accent-foreground text-xs font-medium px-2 py-1 rounded-sm">
              Bestseller
            </span>
          )}
        </div>

        {/* Night/Day Toggle Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsNightMode(!isNightMode);
          }}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isNightMode 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-background/80 text-foreground'
          }`}
        >
          {isNightMode ? '🌙' : '☀️'}
        </button>

        {/* Quick Add Button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => {
            e.preventDefault();
            addItem(product);
          }}
          className="absolute bottom-4 left-4 right-4 bg-primary text-primary-foreground py-3 rounded-sm font-medium text-sm flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
        >
          <ShoppingBag className="h-4 w-4" />
          Quick Add
        </motion.button>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <Link to={`/product/${product.slug}`}>
          <h3 className="font-serif font-medium text-lg line-clamp-2 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mt-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${
                  i < Math.floor(product.rating)
                    ? 'fill-primary text-primary'
                    : 'fill-muted text-muted'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mt-3">
          <span className="text-lg font-semibold text-primary">
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
