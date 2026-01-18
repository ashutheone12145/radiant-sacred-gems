import { useState, useMemo, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductGridSkeleton } from "@/components/product/ProductCardSkeleton";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { products, collections } from "@/data/products";
import type { Product } from "@/types/product";

type SortOption = "featured" | "price-asc" | "price-desc" | "rating" | "newest";

const deityOptions = [
  { value: "ganesha", label: "Lord Ganesha" },
  { value: "krishna", label: "Lord Krishna" },
  { value: "shiva", label: "Lord Shiva" },
  { value: "hanuman", label: "Lord Hanuman" },
  { value: "lakshmi", label: "Goddess Lakshmi" },
  { value: "durga", label: "Goddess Durga" },
];

// Get min and max prices from products
const allPrices = products.map(p => p.price);
const MIN_PRICE = Math.min(...allPrices);
const MAX_PRICE = Math.max(...allPrices);

const Collection = () => {
  const { slug } = useParams<{ slug: string }>();
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [selectedDeities, setSelectedDeities] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([MIN_PRICE, MAX_PRICE]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial loading
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [slug]);

  // Simulate loading when filters change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [selectedDeities, inStockOnly, priceRange, sortBy]);

  const collection = collections.find((c) => c.slug === slug);
  const collectionName = collection?.name || "All Products";
  const collectionDescription = collection?.description || "Browse our complete collection of divine crystal lamps";

  // Map collection slugs to product categories
  const collectionToCategoryMap: Record<string, string> = {
    'deity-lamps': 'deity',
    'galaxy-collection': 'galaxy',
    'accessories': 'accessories',
  };

  // Filter products
  const filteredProducts = useMemo(() => {
    let result = [...products];
    
    // Filter by collection/category
    if (slug && slug !== "all") {
      const category = collectionToCategoryMap[slug] || slug;
      result = result.filter((p) => p.category === category);
    }
    
    // Filter by deity
    if (selectedDeities.length > 0) {
      result = result.filter((p) => p.deity && selectedDeities.includes(p.deity));
    }

    // Filter by price range
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    
    // Filter by stock
    if (inStockOnly) {
      result = result.filter((p) => p.inStock);
    }
    
    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.reverse();
        break;
      default:
        // Featured - keep original order
        break;
    }
    
    return result;
  }, [slug, selectedDeities, inStockOnly, priceRange, sortBy]);

  const handleDeityToggle = (deity: string) => {
    setSelectedDeities((prev) =>
      prev.includes(deity)
        ? prev.filter((d) => d !== deity)
        : [...prev, deity]
    );
  };

  const clearFilters = () => {
    setSelectedDeities([]);
    setInStockOnly(false);
    setPriceRange([MIN_PRICE, MAX_PRICE]);
    setSortBy("featured");
  };

  const isPriceFiltered = priceRange[0] !== MIN_PRICE || priceRange[1] !== MAX_PRICE;
  const hasActiveFilters = selectedDeities.length > 0 || inStockOnly || isPriceFiltered;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Price Range Filter */}
      <div>
        <h3 className="font-medium text-foreground mb-3">Price Range</h3>
        <div className="px-1">
          <Slider
            value={priceRange}
            onValueChange={(value) => setPriceRange(value as [number, number])}
            min={MIN_PRICE}
            max={MAX_PRICE}
            step={100}
            className="mb-4"
          />
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{formatPrice(priceRange[0])}</span>
            <span className="text-muted-foreground">{formatPrice(priceRange[1])}</span>
          </div>
        </div>
      </div>

      {/* Deity Filter */}
      <div>
        <h3 className="font-medium text-foreground mb-3">Deity</h3>
        <div className="space-y-2">
          {deityOptions.map((deity) => (
            <div key={deity.value} className="flex items-center gap-2">
              <Checkbox
                id={`deity-${deity.value}`}
                checked={selectedDeities.includes(deity.value)}
                onCheckedChange={() => handleDeityToggle(deity.value)}
              />
              <label
                htmlFor={`deity-${deity.value}`}
                className="text-sm text-muted-foreground cursor-pointer"
              >
                {deity.label}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Availability Filter */}
      <div>
        <h3 className="font-medium text-foreground mb-3">Availability</h3>
        <div className="flex items-center gap-2">
          <Checkbox
            id="in-stock"
            checked={inStockOnly}
            onCheckedChange={(checked) => setInStockOnly(!!checked)}
          />
          <label
            htmlFor="in-stock"
            className="text-sm text-muted-foreground cursor-pointer"
          >
            In Stock Only
          </label>
        </div>
      </div>
      
      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          size="sm"
          onClick={clearFilters}
          className="w-full"
        >
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/collections">Collections</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {slug && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{collectionName}</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
        
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {collectionName}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {collectionDescription}
          </p>
        </motion.div>
        
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-4 mb-8 pb-4 border-b border-border/50">
          <p className="text-sm text-muted-foreground">
            {filteredProducts.length} products
          </p>
          
          <div className="flex items-center gap-3">
            {/* Mobile Filter Button */}
            <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="lg:hidden gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                  {hasActiveFilters && (
                    <span className="ml-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                      {selectedDeities.length + (inStockOnly ? 1 : 0) + (isPriceFiltered ? 1 : 0)}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>
            
            {/* Sort Dropdown */}
            <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <h2 className="font-semibold text-foreground mb-4">Filters</h2>
              <FilterContent />
            </div>
          </aside>
          
          {/* Product Grid */}
          <div className="flex-1">
            {isLoading ? (
              <ProductGridSkeleton count={6} />
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground mb-4">
                  No products match your filters
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Collection;
