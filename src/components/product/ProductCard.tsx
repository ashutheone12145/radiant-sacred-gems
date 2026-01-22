import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingBag, Heart, Eye, GitCompare } from 'lucide-react';
import { Product } from '@/types/product';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCompare } from '@/contexts/CompareContext';
import { useState } from 'react';
import { QuickViewModal } from './QuickViewModal';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const { toggleItem: toggleCompare, isInCompare, itemCount: compareCount, maxItems } = useCompare();
  const [isNightMode, setIsNightMode] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const inWishlist = isInWishlist(product.id);
  const inCompare = isInCompare(product.id);
  const canAddToCompare = compareCount < maxItems || inCompare;

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
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="product-card group transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <Link to={`/product/${product.slug}`} className="block relative aspect-square overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-foreground/5 z-10 pointer-events-none" />
        
        {/* Day/Night Toggle with Zoom Effect */}
        <motion.img
          src={isNightMode ? product.images.night : product.images.day}
          alt={product.name}
          animate={{ scale: isHovered ? 1.08 : 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
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
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex flex-col gap-1 sm:gap-2">
          {discount > 0 && (
            <span className="bg-primary text-primary-foreground text-[10px] sm:text-xs font-medium px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-sm">
              -{discount}%
            </span>
          )}
          {product.tags.includes('bestseller') && (
            <span className="bg-accent text-accent-foreground text-[10px] sm:text-xs font-medium px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-sm">
              Bestseller
            </span>
          )}
        </div>

        {/* Action Buttons - Simplified for mobile */}
        <div className="absolute top-2 sm:top-3 right-2 sm:right-3 flex flex-col gap-1.5 sm:gap-2">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.preventDefault();
              toggleItem(product);
            }}
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all ${
              inWishlist 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-background/90 text-foreground hover:bg-primary/20'
            }`}
          >
            <Heart className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${inWishlist ? 'fill-current' : ''}`} />
          </motion.button>

          {/* Compare button - hidden on mobile for cleaner UI */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.preventDefault();
              if (canAddToCompare) toggleCompare(product);
            }}
            className={`hidden sm:flex w-8 h-8 rounded-full items-center justify-center transition-all ${
              inCompare 
                ? 'bg-accent text-accent-foreground' 
                : canAddToCompare
                  ? 'bg-background/90 text-foreground hover:bg-accent/20'
                  : 'bg-background/50 text-muted-foreground cursor-not-allowed'
            }`}
            title={inCompare ? 'Remove from compare' : canAddToCompare ? 'Add to compare' : 'Compare limit reached'}
          >
            <GitCompare className="h-4 w-4" />
          </motion.button>
          
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsNightMode(!isNightMode);
            }}
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all text-sm ${
              isNightMode 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-background/90 text-foreground'
            }`}
          >
            {isNightMode ? '🌙' : '☀️'}
          </button>
        </div>

        {/* Quick View & Quick Add - Show on hover/touch */}
        <motion.div 
          className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
          transition={{ duration: 0.2 }}
        >
          {/* Desktop version */}
          <div className="hidden sm:flex gap-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setQuickViewOpen(true);
              }}
              className="w-1/2 bg-background/95 backdrop-blur-sm text-foreground py-2.5 rounded-sm font-medium text-xs flex items-center justify-center gap-1.5 hover:bg-background transition-colors border border-border"
            >
              <Eye className="h-3.5 w-3.5" />
              Quick View
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addItem(product);
              }}
              className="w-1/2 bg-primary py-2.5 rounded-sm font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
              style={{ color: 'hsl(var(--primary-foreground))' }}
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              Add
            </button>
          </div>
          
          {/* Mobile version - show on touch */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addItem(product);
            }}
            className="sm:hidden w-full bg-primary py-2 rounded-sm font-medium text-xs flex items-center justify-center gap-1.5 active:bg-primary/90 transition-colors"
            style={{ color: 'hsl(var(--primary-foreground))' }}
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            Add to Cart
          </button>
        </motion.div>
      </Link>

      {/* Product Info */}
      <div className="p-3 sm:p-4">
        <Link to={`/product/${product.slug}`}>
          <h3 className="font-serif font-medium text-sm sm:text-lg line-clamp-2 hover:text-primary transition-colors leading-tight">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 sm:gap-1.5 mt-1.5 sm:mt-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 sm:h-3.5 sm:w-3.5 ${
                  i < Math.floor(product.rating)
                    ? 'fill-primary text-primary'
                    : 'fill-muted text-muted'
                }`}
              />
            ))}
          </div>
          <span className="text-[10px] sm:text-xs text-muted-foreground">
            ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-1.5 sm:gap-2 mt-2 sm:mt-3">
          <span className="text-sm sm:text-lg font-semibold text-primary">
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice && (
            <span className="text-xs sm:text-sm text-muted-foreground line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={product}
        open={quickViewOpen}
        onOpenChange={setQuickViewOpen}
      />
    </motion.div>
  );
}
