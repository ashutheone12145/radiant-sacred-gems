import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';

export default function Wishlist() {
  const { items, removeItem, clearWishlist } = useWishlist();
  const { addItem } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = (product: typeof items[0]) => {
    addItem(product);
    removeItem(product.id);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-muted/30 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-4">
                My Wishlist
              </h1>
              <p className="text-muted-foreground">
                {items.length} item{items.length !== 1 ? 's' : ''} saved for later
              </p>
            </motion.div>
          </div>
        </section>

        {/* Wishlist Content */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            {items.length > 0 ? (
              <>
                {/* Actions Bar */}
                <div className="flex justify-end mb-8">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearWishlist}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear Wishlist
                  </Button>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {items.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.05 }}
                      className="group bg-card rounded-xl border border-border overflow-hidden"
                    >
                      {/* Image */}
                      <Link to={`/product/${product.slug}`} className="block relative aspect-square overflow-hidden">
                        <img
                          src={product.images.day}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        
                        {/* Remove Button */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            removeItem(product.id);
                          }}
                          className="absolute top-3 right-3 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors"
                        >
                          <Heart className="h-5 w-5 fill-current" />
                        </button>

                        {/* Discount Badge */}
                        {product.compareAtPrice && (
                          <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-sm">
                            -{Math.round((1 - product.price / product.compareAtPrice) * 100)}%
                          </span>
                        )}
                      </Link>

                      {/* Info */}
                      <div className="p-4">
                        <Link to={`/product/${product.slug}`}>
                          <h3 className="font-serif font-medium text-lg line-clamp-2 hover:text-primary transition-colors mb-2">
                            {product.name}
                          </h3>
                        </Link>

                        {/* Price */}
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-lg font-semibold text-primary">
                            {formatPrice(product.price)}
                          </span>
                          {product.compareAtPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              {formatPrice(product.compareAtPrice)}
                            </span>
                          )}
                        </div>

                        {/* Add to Cart */}
                        <Button
                          onClick={() => handleAddToCart(product)}
                          className="w-full"
                        >
                          <ShoppingBag className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                  <Heart className="h-10 w-10 text-muted-foreground" />
                </div>
                <h2 className="text-2xl font-serif font-semibold text-foreground mb-3">
                  Your wishlist is empty
                </h2>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  Start adding items you love by clicking the heart icon on any product
                </p>
                <Button asChild size="lg">
                  <Link to="/collections">
                    Explore Collections
                  </Link>
                </Button>
              </motion.div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
