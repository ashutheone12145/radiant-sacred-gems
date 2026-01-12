import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRecentlyViewed } from '@/contexts/RecentlyViewedContext';

interface RecentlyViewedProps {
  excludeProductId?: string;
  title?: string;
  maxItems?: number;
}

export function RecentlyViewed({ 
  excludeProductId, 
  title = "Recently Viewed",
  maxItems = 6 
}: RecentlyViewedProps) {
  const { items, clearHistory } = useRecentlyViewed();

  // Filter out current product if on product page
  const displayItems = items
    .filter(item => item.id !== excludeProductId)
    .slice(0, maxItems);

  if (displayItems.length === 0) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-serif font-semibold text-foreground">
              {title}
            </h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearHistory}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {displayItems.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                to={`/product/${product.slug}`}
                className="group block"
              >
                <div className="relative aspect-square rounded-lg overflow-hidden bg-muted mb-3">
                  <img
                    src={product.images.day}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {product.compareAtPrice && (
                    <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] font-medium px-1.5 py-0.5 rounded">
                      -{Math.round((1 - product.price / product.compareAtPrice) * 100)}%
                    </span>
                  )}
                </div>
                <h3 className="font-medium text-sm text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-primary font-medium mt-1">
                  {formatPrice(product.price)}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
