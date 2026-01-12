import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCompare } from '@/contexts/CompareContext';

export function CompareBar() {
  const { items, removeItem, clearCompare, maxItems } = useCompare();

  if (items.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-lg"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Products */}
            <div className="flex items-center gap-3 overflow-x-auto">
              <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                Compare ({items.length}/{maxItems}):
              </span>
              
              <div className="flex gap-2">
                {items.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="relative group"
                  >
                    <img
                      src={product.images.day}
                      alt={product.name}
                      className="w-14 h-14 object-cover rounded-lg border border-border"
                    />
                    <button
                      onClick={() => removeItem(product.id)}
                      className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </motion.div>
                ))}
                
                {/* Empty slots */}
                {Array.from({ length: maxItems - items.length }).map((_, i) => (
                  <div
                    key={`empty-${i}`}
                    className="w-14 h-14 rounded-lg border-2 border-dashed border-border flex items-center justify-center"
                  >
                    <span className="text-xs text-muted-foreground">+</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearCompare}
                className="text-muted-foreground"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Clear</span>
              </Button>
              
              <Button asChild size="sm" disabled={items.length < 2}>
                <Link to="/compare">
                  Compare
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
