import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Heart } from 'lucide-react';
import { ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { useState } from 'react';

interface ShopifyProductCardProps {
  product: ShopifyProduct;
  index?: number;
}

export function ShopifyProductCard({ product, index = 0 }: ShopifyProductCardProps) {
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);
  const [isHovered, setIsHovered] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);

  const { node } = product;
  const firstVariant = node.variants.edges[0]?.node;
  const firstImage = node.images.edges[0]?.node;
  const secondImage = node.images.edges[1]?.node;
  
  const price = parseFloat(node.priceRange.minVariantPrice.amount);
  const compareAtPrice = firstVariant?.compareAtPrice 
    ? parseFloat(firstVariant.compareAtPrice.amount) 
    : null;
  const currencyCode = node.priceRange.minVariantPrice.currencyCode;

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currencyCode === 'INR' ? 'INR' : 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const discount = compareAtPrice && compareAtPrice > price
    ? Math.round((1 - price / compareAtPrice) * 100)
    : 0;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!firstVariant) return;

    await addItem({
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions || []
    });
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsInWishlist(!isInWishlist);
  };

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
      className="card-saffron group rounded-lg overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <Link to={`/product/${node.handle}`} className="block relative aspect-square overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-foreground/5 z-10 pointer-events-none" />
        
        {/* Product Image with Hover Switch */}
        <motion.img
          src={isHovered && secondImage ? secondImage.url : firstImage?.url}
          alt={firstImage?.altText || node.title}
          animate={{ scale: isHovered ? 1.08 : 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full h-full object-cover transition-all duration-700"
        />

        {/* Badges */}
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex flex-col gap-1 sm:gap-2">
          {discount > 0 && (
            <span className="bg-primary text-primary-foreground text-[10px] sm:text-xs font-medium px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-sm">
              -{discount}%
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-2 sm:top-3 right-2 sm:right-3 flex flex-col gap-1.5 sm:gap-2">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleWishlist}
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all ${
              isInWishlist 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-background/90 text-foreground hover:bg-primary/20'
            }`}
          >
            <Heart className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${isInWishlist ? 'fill-current' : ''}`} />
          </motion.button>
        </div>

        {/* Quick Add Button */}
        <motion.div 
          className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
          transition={{ duration: 0.2 }}
        >
          <button
            onClick={handleAddToCart}
            disabled={isLoading || !firstVariant?.availableForSale}
            className="w-full bg-primary py-2 sm:py-2.5 rounded-sm font-medium text-xs flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
            style={{ color: 'hsl(var(--primary-foreground))' }}
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            {!firstVariant?.availableForSale ? 'Out of Stock' : isLoading ? 'Adding...' : 'Add to Cart'}
          </button>
        </motion.div>
      </Link>

      {/* Product Info */}
      <div className="p-3 sm:p-4">
        <Link to={`/product/${node.handle}`}>
          <h3 className="font-serif font-medium text-sm sm:text-lg line-clamp-2 hover:text-primary transition-colors leading-tight">
            {node.title}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-center gap-1.5 sm:gap-2 mt-2 sm:mt-3">
          <span className="text-sm sm:text-lg font-semibold text-primary">
            {formatPrice(price)}
          </span>
          {compareAtPrice && compareAtPrice > price && (
            <span className="text-xs sm:text-sm text-muted-foreground line-through">
              {formatPrice(compareAtPrice)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
