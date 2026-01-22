import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import { useCart } from "@/contexts/CartContext";

interface StickyMobileCartProps {
  product: Product;
  triggerRef: React.RefObject<HTMLElement>;
}

export const StickyMobileCart = ({ product, triggerRef }: StickyMobileCartProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { addItem, openCart } = useCart();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show sticky bar when trigger element is NOT visible
        setIsVisible(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "-100px 0px 0px 0px" }
    );

    if (triggerRef.current) {
      observer.observe(triggerRef.current);
    }

    return () => observer.disconnect();
  }, [triggerRef]);

  const handleAddToCart = () => {
    addItem(product, quantity);
    openCart();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/95 backdrop-blur-lg border-t border-border shadow-lg safe-area-pb"
        >
          <div className="container px-4 py-3">
            <div className="flex items-center gap-3">
              {/* Price */}
              <div className="flex-shrink-0">
                <p className="text-lg font-bold text-foreground">
                  {formatPrice(product.price)}
                </p>
                {product.compareAtPrice && (
                  <p className="text-xs text-muted-foreground line-through">
                    {formatPrice(product.compareAtPrice)}
                  </p>
                )}
              </div>
              
              {/* Quantity Controls */}
              <div className="flex items-center border border-border rounded-lg flex-shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-9 w-9"
                >
                  <Minus className="h-3.5 w-3.5" />
                </Button>
                <span className="w-8 text-center text-sm font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-9 w-9"
                >
                  <Plus className="h-3.5 w-3.5" />
                </Button>
              </div>
              
              {/* Add to Cart Button */}
              <Button
                onClick={handleAddToCart}
                className="flex-1 btn-premium h-11"
                disabled={!product.inStock}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
