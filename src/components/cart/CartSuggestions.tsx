import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '@/data/products';
import { Product } from '@/types/product';
import { useCart } from '@/contexts/CartContext';
import { useCartStore } from '@/stores/cartStore';
import { Button } from '@/components/ui/button';

interface CartSuggestionsProps {
  maxItems?: number;
}

export function CartSuggestions({ maxItems = 4 }: CartSuggestionsProps) {
  const { items: localItems, addItem } = useCart();
  const shopifyItems = useCartStore(state => state.items);
  const closeCart = useCartStore(state => state.closeCart);

  // Get IDs of products already in cart
  const cartProductIds = [
    ...localItems.map(item => item.product.id),
    ...shopifyItems.map(item => item.product.node.id)
  ];

  // Filter out products already in cart and get random suggestions
  const suggestions = products
    .filter(p => !cartProductIds.includes(p.id) && p.inStock)
    .sort(() => Math.random() - 0.5)
    .slice(0, maxItems);

  if (suggestions.length === 0) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleQuickAdd = (product: Product) => {
    addItem(product, 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mt-6 pt-6 border-t border-border"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-serif font-medium text-sm text-foreground">
          Add More Products
        </h3>
        <Link 
          to="/collections" 
          onClick={closeCart}
          className="text-xs text-primary hover:underline"
        >
          View All
        </Link>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {suggestions.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            className="group relative bg-secondary/50 rounded-lg overflow-hidden"
          >
            <Link 
              to={`/product/${product.slug}`} 
              onClick={closeCart}
              className="block"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.images.day}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-2">
                <h4 className="text-xs font-medium line-clamp-1 text-foreground">
                  {product.name}
                </h4>
                <p className="text-xs font-semibold text-primary mt-0.5">
                  {formatPrice(product.price)}
                </p>
              </div>
            </Link>
            
            {/* Quick Add Button */}
            <Button
              size="icon"
              variant="secondary"
              onClick={() => handleQuickAdd(product)}
              className="absolute top-2 right-2 h-7 w-7 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
            >
              <Plus className="h-3.5 w-3.5" />
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
