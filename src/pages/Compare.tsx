import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, X, Star, Check, Minus, ShoppingBag } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useCompare } from '@/contexts/CompareContext';
import { useCart } from '@/contexts/CartContext';

export default function Compare() {
  const { items, removeItem, clearCompare } = useCompare();
  const { addItem } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Get all unique specification keys across all products
  const allSpecKeys = Array.from(
    new Set(items.flatMap((p) => Object.keys(p.specifications)))
  );

  // Get all unique features across all products
  const allFeatures = Array.from(
    new Set(items.flatMap((p) => p.features))
  );

  return (
    <div className="min-h-screen flex flex-col bg-background pb-mobile-nav">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-muted/30 py-6 sm:py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <Link
                  to="/collections"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm text-muted-foreground hover:text-foreground mb-2 sm:mb-4"
                >
                  <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  Back to Collections
                </Link>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-serif font-semibold text-foreground">
                  Compare Products
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground mt-1">
                  {items.length} product{items.length !== 1 ? 's' : ''} selected
                </p>
              </div>
              {items.length > 0 && (
                <Button variant="outline" size="sm" onClick={clearCompare} className="self-start sm:self-auto text-xs sm:text-sm">
                  Clear All
                </Button>
              )}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-6 sm:py-8 md:py-12">
          <div className="container mx-auto px-4">
            {items.length >= 2 ? (
              <div className="overflow-x-auto -mx-4 px-4">
                <table className="w-full min-w-[500px]">
                  <thead>
                    <tr>
                      <th className="text-left p-2 sm:p-4 bg-muted/50 rounded-tl-lg w-24 sm:w-40 md:w-48">
                        <span className="text-xs sm:text-sm font-medium text-muted-foreground">
                          Product
                        </span>
                      </th>
                      {items.map((product, index) => (
                        <th
                          key={product.id}
                          className={`p-2 sm:p-4 bg-muted/50 ${
                            index === items.length - 1 ? 'rounded-tr-lg' : ''
                          }`}
                        >
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative"
                          >
                            <button
                              onClick={() => removeItem(product.id)}
                              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center hover:bg-destructive/90 transition-colors"
                            >
                              <X className="h-3 w-3" />
                            </button>
                            <Link to={`/product/${product.slug}`}>
                              <img
                                src={product.images.day}
                                alt={product.name}
                                className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg mx-auto mb-3"
                              />
                              <h3 className="font-serif font-medium text-sm md:text-base text-foreground hover:text-primary transition-colors line-clamp-2">
                                {product.name}
                              </h3>
                            </Link>
                          </motion.div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {/* Price Row */}
                    <tr className="border-b border-border">
                      <td className="p-4 text-sm font-medium text-foreground">Price</td>
                      {items.map((product) => (
                        <td key={product.id} className="p-4 text-center">
                          <span className="text-lg font-semibold text-primary">
                            {formatPrice(product.price)}
                          </span>
                          {product.compareAtPrice && (
                            <span className="block text-sm text-muted-foreground line-through">
                              {formatPrice(product.compareAtPrice)}
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>

                    {/* Rating Row */}
                    <tr className="border-b border-border">
                      <td className="p-4 text-sm font-medium text-foreground">Rating</td>
                      {items.map((product) => (
                        <td key={product.id} className="p-4">
                          <div className="flex items-center justify-center gap-1">
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
                            <span className="text-sm text-muted-foreground ml-1">
                              ({product.reviewCount})
                            </span>
                          </div>
                        </td>
                      ))}
                    </tr>

                    {/* Category Row */}
                    <tr className="border-b border-border">
                      <td className="p-4 text-sm font-medium text-foreground">Category</td>
                      {items.map((product) => (
                        <td key={product.id} className="p-4 text-center text-sm text-muted-foreground capitalize">
                          {product.category}
                        </td>
                      ))}
                    </tr>

                    {/* Deity Row */}
                    <tr className="border-b border-border">
                      <td className="p-4 text-sm font-medium text-foreground">Deity</td>
                      {items.map((product) => (
                        <td key={product.id} className="p-4 text-center text-sm text-muted-foreground">
                          {product.deity || '—'}
                        </td>
                      ))}
                    </tr>

                    {/* Specifications */}
                    {allSpecKeys.map((specKey) => (
                      <tr key={specKey} className="border-b border-border">
                        <td className="p-4 text-sm font-medium text-foreground capitalize">
                          {specKey.replace(/([A-Z])/g, ' $1').trim()}
                        </td>
                        {items.map((product) => (
                          <td key={product.id} className="p-4 text-center text-sm text-muted-foreground">
                            {product.specifications[specKey] || '—'}
                          </td>
                        ))}
                      </tr>
                    ))}

                    {/* Features Section Header */}
                    <tr>
                      <td
                        colSpan={items.length + 1}
                        className="p-4 bg-muted/30 text-sm font-semibold text-foreground"
                      >
                        Features
                      </td>
                    </tr>

                    {/* Features Rows */}
                    {allFeatures.map((feature) => (
                      <tr key={feature} className="border-b border-border">
                        <td className="p-4 text-sm text-foreground">{feature}</td>
                        {items.map((product) => (
                          <td key={product.id} className="p-4 text-center">
                            {product.features.includes(feature) ? (
                              <Check className="h-5 w-5 text-green-500 mx-auto" />
                            ) : (
                              <Minus className="h-5 w-5 text-muted-foreground mx-auto" />
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}

                    {/* Add to Cart Row */}
                    <tr>
                      <td className="p-4"></td>
                      {items.map((product) => (
                        <td key={product.id} className="p-4">
                          <Button
                            onClick={() => addItem(product)}
                            className="w-full"
                          >
                            <ShoppingBag className="h-4 w-4 mr-2" />
                            Add to Cart
                          </Button>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-4xl">⚖️</span>
                </div>
                <h2 className="text-2xl font-serif font-semibold text-foreground mb-3">
                  {items.length === 0
                    ? 'No products to compare'
                    : 'Add one more product to compare'}
                </h2>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  {items.length === 0
                    ? 'Select at least 2 products from our collections to compare their features and specifications.'
                    : 'You need at least 2 products to start comparing. Add another product from our collections.'}
                </p>
                <Button asChild size="lg">
                  <Link to="/collections">Browse Collections</Link>
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
