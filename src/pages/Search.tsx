import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search as SearchIcon, X } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/product/ProductCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';
import { Product } from '@/types/product';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchInput, setSearchInput] = useState(query);
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    if (query) {
      const searchLower = query.toLowerCase();
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower) ||
          product.category.toLowerCase().includes(searchLower) ||
          (product.deity && product.deity.toLowerCase().includes(searchLower)) ||
          product.features.some((f) => f.toLowerCase().includes(searchLower))
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchParams({ q: searchInput.trim() });
    }
  };

  const clearSearch = () => {
    setSearchInput('');
    setSearchParams({});
  };

  return (
    <div className="min-h-screen flex flex-col bg-background pb-mobile-nav">
      <Header />
      
      <main className="flex-1">
        {/* Search Header */}
        <section className="bg-muted/30 py-8 sm:py-12 md:py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto text-center"
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold text-foreground mb-4 sm:mb-6">
                Search Products
              </h1>
              
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="text"
                  placeholder="Search for crystal lamps..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full h-11 sm:h-14 pl-10 sm:pl-12 pr-20 sm:pr-24 text-sm sm:text-lg rounded-full border-2 border-border focus:border-primary bg-background"
                />
                <SearchIcon className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                {searchInput && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-16 sm:right-20 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full transition-colors"
                  >
                    <X className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
                  </button>
                )}
                <Button
                  type="submit"
                  className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 rounded-full px-4 sm:px-6 h-8 sm:h-auto text-xs sm:text-sm"
                  size="sm"
                >
                  Search
                </Button>
              </form>
            </motion.div>
          </div>
        </section>

        {/* Results */}
        <section className="py-8 sm:py-12 md:py-16">
          <div className="container mx-auto px-4">
            {query ? (
              <>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-8"
                >
                  {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
                </motion.p>

                {results.length > 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
                  >
                    {results.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <ProductCard product={product} />
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-16"
                  >
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                      <SearchIcon className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h2 className="text-xl font-serif font-semibold text-foreground mb-2">
                      No products found
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      Try adjusting your search or browse our collections
                    </p>
                    <Button asChild variant="outline">
                      <Link to="/collections">Browse Collections</Link>
                    </Button>
                  </motion.div>
                )}
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                  <SearchIcon className="h-8 w-8 text-muted-foreground" />
                </div>
                <h2 className="text-xl font-serif font-semibold text-foreground mb-2">
                  Start your search
                </h2>
                <p className="text-muted-foreground mb-8">
                  Find the perfect crystal lamp for your sacred space
                </p>
                
                <div className="flex flex-wrap justify-center gap-2">
                  <span className="text-sm text-muted-foreground">Popular:</span>
                  {['Ganesha', 'Galaxy', 'Krishna', 'Crystal'].map((term) => (
                    <Button
                      key={term}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSearchInput(term);
                        setSearchParams({ q: term });
                      }}
                      className="rounded-full"
                    >
                      {term}
                    </Button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
