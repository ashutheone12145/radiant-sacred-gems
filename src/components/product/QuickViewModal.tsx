import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Heart, Minus, Plus, ShoppingBag, X, ExternalLink } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/product';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { DayNightToggle } from './DayNightToggle';

interface QuickViewModalProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function QuickViewModal({ product, open, onOpenChange }: QuickViewModalProps) {
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const [isNightMode, setIsNightMode] = useState(false);
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const inWishlist = isInWishlist(product.id);

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

  const handleAddToCart = () => {
    addItem(product, quantity);
    onOpenChange(false);
    setQuantity(1);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 gap-0 overflow-hidden">
        <DialogTitle className="sr-only">{product.name} - Quick View</DialogTitle>
        
        <div className="grid md:grid-cols-2">
          {/* Image Section */}
          <div className="relative aspect-square bg-muted">
            <motion.img
              key={isNightMode ? 'night' : 'day'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              src={isNightMode ? product.images.night : product.images.day}
              alt={product.name}
              className={`w-full h-full object-cover transition-all duration-500 ${
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
                  background: 'radial-gradient(circle at center 60%, hsl(43 90% 60% / 0.4) 0%, transparent 50%)',
                }}
              />
            )}

            {/* Day/Night Toggle */}
            <div className="absolute bottom-4 left-4">
              <DayNightToggle isNightMode={isNightMode} onToggle={() => setIsNightMode(!isNightMode)} />
            </div>

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {discount > 0 && (
                <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-sm">
                  -{discount}% OFF
                </span>
              )}
              {product.tags.includes('bestseller') && (
                <span className="bg-accent text-accent-foreground text-xs font-medium px-2 py-1 rounded-sm">
                  Bestseller
                </span>
              )}
            </div>
          </div>

          {/* Product Info Section */}
          <div className="p-6 md:p-8 flex flex-col">
            {/* Header */}
            <div className="flex-1">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <p className="text-sm text-primary font-medium uppercase tracking-wide mb-1">
                    {product.category}
                  </p>
                  <h2 className="text-2xl font-serif font-semibold text-foreground">
                    {product.name}
                  </h2>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleItem(product)}
                  className={inWishlist ? 'text-primary' : 'text-muted-foreground'}
                >
                  <Heart className={`h-5 w-5 ${inWishlist ? 'fill-current' : ''}`} />
                </Button>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-primary text-primary'
                          : 'fill-muted text-muted'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-semibold text-primary">
                  {formatPrice(product.price)}
                </span>
                {product.compareAtPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-muted-foreground mb-6 line-clamp-3">
                {product.description}
              </p>

              {/* Key Features */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-foreground mb-2">Key Features:</h4>
                <ul className="space-y-1">
                  {product.features.slice(0, 3).map((feature, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4 pt-4 border-t border-border">
              {/* Quantity */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-foreground">Quantity:</span>
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-muted transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-muted transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <Button onClick={handleAddToCart} className="flex-1" size="lg">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>

              {/* View Full Details Link */}
              <Link
                to={`/product/${product.slug}`}
                onClick={() => onOpenChange(false)}
                className="flex items-center justify-center gap-2 text-sm text-primary hover:underline"
              >
                View Full Details
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
