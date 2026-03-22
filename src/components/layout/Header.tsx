import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, Search, Heart } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useCartStore } from '@/stores/cartStore';
import { useWishlist } from '@/contexts/WishlistContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { products } from '@/data/products';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Shop All', href: '/collections' },
  { name: 'LED Photo Frames', href: '/collections/led-frames' },
  { name: '3D Crystal Lamps', href: '/collections/crystal-lamps' },
  { name: 'Gift Sets', href: '/collections/gift-sets' },
  { name: 'About', href: '/about' },
];

export function Header() {
  const itemCount = useCartStore(state => state.itemCount);
  const toggleCart = useCartStore(state => state.toggleCart);
  const { itemCount: wishlistCount } = useWishlist();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<typeof products>([]);
  const [scrolled, setScrolled] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();

  const isActiveLink = (href: string) => {
    if (href === '/collections') {
      return location.pathname === '/collections';
    }
    return location.pathname.startsWith(href);
  };
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    if (searchQuery.length > 1) {
      const query = searchQuery.toLowerCase();
      const filtered = products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query) ||
            (p.deity && p.deity.toLowerCase().includes(query))
        )
        .slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleSuggestionClick = (slug: string) => {
    navigate(`/product/${slug}`);
    setSearchOpen(false);
    setSearchQuery('');
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border"
            : "bg-background border-b border-transparent"
        )}
      >
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex items-center h-14 sm:h-16 md:h-20">
            {/* Left Section - Mobile Menu + Logo or Desktop Nav */}
            <div className="flex-1 flex items-center gap-2">
              {/* Mobile Menu */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="ghost" size="icon" className="h-9 w-9 flex-shrink-0 text-foreground hover:text-primary">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[85vw] max-w-80 bg-background p-0">
                  {/* Mobile menu header with brand */}
                  <div className="flex items-center justify-center gap-2 p-5 border-b border-border bg-secondary/30">
                    <span className="font-serif text-xl font-semibold text-primary whitespace-nowrap tracking-tight">
                      आत्मन् Roots
                    </span>
                  </div>
                  <nav className="flex flex-col gap-0.5 p-3">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        to={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "text-sm font-medium transition-all py-3 px-4 rounded-lg",
                          isActiveLink(link.href)
                            ? "bg-primary/10 text-primary border-l-2 border-primary"
                            : "text-foreground hover:text-primary hover:bg-secondary/50"
                        )}
                      >
                        {link.name}
                      </Link>
                    ))}
                    {/* Mobile-only wishlist link */}
                    <div className="border-t border-border mt-2 pt-2">
                      <Link
                        to="/wishlist"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-sm font-medium text-foreground hover:text-primary hover:bg-secondary/50 transition-colors py-3 px-4 rounded-lg flex items-center gap-2"
                      >
                        <Heart className="h-4 w-4" />
                        Wishlist
                        {wishlistCount > 0 && (
                          <span className="ml-auto h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
                            {wishlistCount}
                          </span>
                        )}
                      </Link>
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>

              {/* Logo - Next to hamburger on mobile, hidden on desktop */}
              <Link to="/" className="flex items-center flex-shrink-0 lg:hidden hover:opacity-80 transition-opacity">
                <span className="font-serif text-lg sm:text-xl font-semibold text-primary whitespace-nowrap tracking-tight">
                  आत्मन् Roots
                </span>
              </Link>

              {/* Desktop Navigation - Left side */}
              <nav className="hidden lg:flex items-center gap-0.5">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={cn(
                      "text-sm font-medium transition-all duration-200 px-3.5 py-2 rounded-sm whitespace-nowrap relative",
                      isActiveLink(link.href)
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {link.name}
                    {isActiveLink(link.href) && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-primary rounded-full"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                      />
                    )}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Center - Logo (Desktop only) */}
            <Link to="/" className="hidden lg:flex items-center flex-shrink-0 mx-6 hover:opacity-80 transition-opacity">
              <span className="font-serif text-xl md:text-2xl font-semibold text-primary whitespace-nowrap tracking-tight">
                आत्मन् Roots
              </span>
            </Link>

            {/* Right Section - Actions */}
            <div className="flex-1 flex items-center justify-end gap-0.5 sm:gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(true)}
                className="h-9 w-9 text-foreground hover:text-primary hover:bg-primary/5"
              >
                <Search className="h-[18px] w-[18px]" />
                <span className="sr-only">Search</span>
              </Button>
              
              <Button variant="ghost" size="icon" className="relative h-9 w-9 text-foreground hover:text-primary hover:bg-primary/5" asChild>
                <Link to="/wishlist">
                  <Heart className="h-[18px] w-[18px]" />
                  {wishlistCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-medium"
                    >
                      {wishlistCount}
                    </motion.span>
                  )}
                  <span className="sr-only">Wishlist</span>
                </Link>
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative h-9 w-9 text-foreground hover:text-primary hover:bg-primary/5"
                onClick={toggleCart}
              >
                <ShoppingBag className="h-[18px] w-[18px]" />
                {itemCount() > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-medium"
                  >
                    {itemCount()}
                  </motion.span>
                )}
                <span className="sr-only">Cart</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/98 backdrop-blur-lg"
          >
            <div className="container mx-auto px-4 py-4 sm:py-8">
              <div className="flex justify-end mb-4 sm:mb-8">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery('');
                  }}
                  className="text-foreground hover:text-primary"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto"
              >
                <form onSubmit={handleSearch} className="relative">
                  <Input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search for divine lamps, crystals..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-12 sm:h-14 pl-12 pr-4 text-base sm:text-lg rounded-sm border border-border focus:border-primary focus:ring-1 focus:ring-primary/20 bg-background"
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </form>

                {/* Suggestions */}
                {suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 bg-card rounded-lg border border-border shadow-md overflow-hidden"
                  >
                    {suggestions.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => handleSuggestionClick(product.slug)}
                        className="w-full flex items-center gap-3 sm:gap-4 p-3 sm:p-4 hover:bg-secondary/50 transition-colors text-left"
                      >
                        <img
                          src={product.images.day}
                          alt={product.name}
                          className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-foreground text-sm sm:text-base truncate">{product.name}</p>
                          <p className="text-xs sm:text-sm text-muted-foreground">₹{product.price.toLocaleString()}</p>
                        </div>
                      </button>
                    ))}
                    <Link
                      to={`/search?q=${encodeURIComponent(searchQuery)}`}
                      onClick={() => {
                        setSearchOpen(false);
                        setSearchQuery('');
                      }}
                      className="block w-full p-3 sm:p-4 text-center text-primary hover:bg-secondary/30 transition-colors border-t border-border text-sm font-medium"
                    >
                      View all results →
                    </Link>
                  </motion.div>
                )}

                {/* Popular Searches */}
                {searchQuery.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mt-6 sm:mt-8 text-center"
                  >
                    <p className="text-sm text-muted-foreground mb-3 sm:mb-4">Popular searches</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {['Ganesha Lamp', 'Lakshmi Crystal', 'Krishna Lamp', 'LED Frame'].map((term) => (
                        <Button
                          key={term}
                          variant="outline"
                          size="sm"
                          onClick={() => setSearchQuery(term)}
                          className="rounded-sm text-xs sm:text-sm border-border hover:border-primary hover:text-primary hover:bg-primary/5"
                        >
                          {term}
                        </Button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
