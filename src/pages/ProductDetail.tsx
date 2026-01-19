import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Minus, Plus, Gift, Check, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ImageGallery } from "@/components/product/ImageGallery";
import { SizeComparison } from "@/components/product/SizeComparison";
import { ReviewCard } from "@/components/product/ReviewCard";
import { ProductFAQ } from "@/components/product/ProductFAQ";
import { ProductCard } from "@/components/product/ProductCard";
import { RecentlyViewed } from "@/components/product/RecentlyViewed";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useCart } from "@/contexts/CartContext";
import { useRecentlyViewed } from "@/contexts/RecentlyViewedContext";
import { getProductBySlug, getRelatedProducts, getProductReviews } from "@/data/products";

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || "");
  const { addItem, openCart } = useCart();
  const { addItem: addToRecentlyViewed } = useRecentlyViewed();
  
  const [quantity, setQuantity] = useState(1);
  const [showGiftMessage, setShowGiftMessage] = useState(false);
  const [giftMessage, setGiftMessage] = useState("");

  // Track product view
  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product);
    }
  }, [product, addToRecentlyViewed]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-24 text-center">
          <h1 className="text-2xl font-serif font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/collections">Browse All Products</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const relatedProducts = getRelatedProducts(product.id, 4);
  const reviews = getProductReviews(product.id);
  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : product.rating;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = () => {
    addItem(product, quantity, showGiftMessage ? giftMessage : undefined);
    openCart();
  };

  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 py-4 md:py-8 pb-28 md:pb-8">
        {/* Breadcrumb - simplified on mobile */}
        <Breadcrumb className="mb-4 md:mb-8">
          <BreadcrumbList className="text-xs md:text-sm">
            <BreadcrumbItem className="hidden md:inline-flex">
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:inline-flex" />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/collections">Collections</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="truncate max-w-[150px] md:max-w-none">{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        {/* Product Section */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 mb-12 md:mb-16">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ImageGallery
              dayImage={product.images.day}
              nightImage={product.images.night}
              gallery={product.images.gallery}
              productName={product.name}
            />
          </motion.div>
          
          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="space-y-4 md:space-y-6"
          >
            {/* Title & Rating - compact on mobile */}
            <div>
              <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-2 md:gap-3">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 md:h-4 md:w-4 ${
                        i < Math.round(averageRating)
                          ? "fill-primary text-primary"
                          : "text-muted"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs md:text-sm text-muted-foreground">
                  {averageRating.toFixed(1)} ({product.reviewCount} reviews)
                </span>
              </div>
            </div>
            
            {/* Price - more compact on mobile */}
            <div className="flex items-baseline gap-2 md:gap-3 flex-wrap">
              <span className="text-2xl md:text-3xl font-bold text-foreground">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && (
                <>
                  <span className="text-base md:text-lg text-muted-foreground line-through">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                  <span className="px-2 py-0.5 text-xs font-medium bg-destructive/10 text-destructive rounded">
                    {discount}% OFF
                  </span>
                </>
              )}
            </div>
            
            {/* Short Description - hidden on mobile, shown in accordion */}
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base hidden md:block">
              {product.shortDescription}
            </p>
            
            {/* Trust indicators - horizontal scroll on mobile */}
            <div className="flex gap-3 md:gap-4 py-3 md:py-4 border-y border-border/50 overflow-x-auto scrollbar-hide">
              <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-muted-foreground whitespace-nowrap">
                <Truck className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary flex-shrink-0" />
                Free Shipping
              </div>
              <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-muted-foreground whitespace-nowrap">
                <ShieldCheck className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary flex-shrink-0" />
                Secure Checkout
              </div>
              <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-muted-foreground whitespace-nowrap">
                <RotateCcw className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary flex-shrink-0" />
                30-Day Returns
              </div>
            </div>
            
            {/* Quantity & Add to Cart - hidden on mobile (shown in sticky bar) */}
            <div className="space-y-3 md:space-y-4 hidden md:block">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-foreground">Quantity</span>
                <div className="flex items-center border border-border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-10 w-10"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-10 w-10"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Gift Message */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="gift-message"
                    checked={showGiftMessage}
                    onCheckedChange={(checked) => setShowGiftMessage(!!checked)}
                  />
                  <label
                    htmlFor="gift-message"
                    className="flex items-center gap-2 text-sm font-medium cursor-pointer"
                  >
                    <Gift className="h-4 w-4 text-primary" />
                    Add a gift message
                  </label>
                </div>
                {showGiftMessage && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <Input
                      placeholder="Enter your gift message..."
                      value={giftMessage}
                      onChange={(e) => setGiftMessage(e.target.value)}
                      className="bg-cream/50"
                    />
                  </motion.div>
                )}
              </div>
              
              {/* Add to Cart Button - desktop only */}
              <Button
                onClick={handleAddToCart}
                size="lg"
                className="w-full btn-premium text-base"
                disabled={!product.inStock}
              >
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </Button>
              
              {/* Stock indicator */}
              {product.inStock && (
                <p className="flex items-center gap-2 text-sm text-green-600">
                  <Check className="h-4 w-4" />
                  In Stock - Ships within 2-3 business days
                </p>
              )}
            </div>
            
            {/* Mobile stock indicator */}
            {product.inStock && (
              <p className="flex items-center gap-1.5 text-xs text-green-600 md:hidden">
                <Check className="h-3.5 w-3.5" />
                In Stock - Ships in 2-3 days
              </p>
            )}
            
            {/* Features & Specs Accordion - collapsible sections */}
            <Accordion type="multiple" defaultValue={["features"]} className="w-full">
              {/* Description - mobile only */}
              <AccordionItem value="description" className="md:hidden">
                <AccordionTrigger className="text-foreground text-sm py-3">Description</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {product.shortDescription}
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="features">
                <AccordionTrigger className="text-foreground text-sm md:text-base py-3 md:py-4">Features</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-1.5 md:space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-muted-foreground text-sm">
                        <Check className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary mt-0.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="specifications">
                <AccordionTrigger className="text-foreground text-sm md:text-base py-3 md:py-4">Specifications</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-1.5 md:gap-2 text-xs md:text-sm">
                      <span className="text-muted-foreground">Size</span>
                      <span className="text-foreground">{product.specifications.size}</span>
                      <span className="text-muted-foreground">Weight</span>
                      <span className="text-foreground">{product.specifications.weight}</span>
                      <span className="text-muted-foreground">Material</span>
                      <span className="text-foreground">{product.specifications.material}</span>
                      <span className="text-muted-foreground">Power</span>
                      <span className="text-foreground">{product.specifications.power}</span>
                      <span className="text-muted-foreground">LED Type</span>
                      <span className="text-foreground">{product.specifications.ledType}</span>
                    </div>
                    <div className="mt-4 hidden md:block">
                      <SizeComparison size={product.specifications.size} />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              {/* Gift option - mobile only */}
              <AccordionItem value="gift" className="md:hidden">
                <AccordionTrigger className="text-foreground text-sm py-3">
                  <span className="flex items-center gap-2">
                    <Gift className="h-4 w-4 text-primary" />
                    Gift Options
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="gift-message-mobile"
                        checked={showGiftMessage}
                        onCheckedChange={(checked) => setShowGiftMessage(!!checked)}
                      />
                      <label
                        htmlFor="gift-message-mobile"
                        className="text-sm font-medium cursor-pointer"
                      >
                        Add a gift message
                      </label>
                    </div>
                    {showGiftMessage && (
                      <Input
                        placeholder="Enter your gift message..."
                        value={giftMessage}
                        onChange={(e) => setGiftMessage(e.target.value)}
                        className="bg-cream/50 text-sm"
                      />
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>
        
        {/* Full Description - hidden on mobile (in accordion) */}
        <section className="mb-12 md:mb-16 hidden md:block">
          <h2 className="font-serif text-xl md:text-2xl font-bold text-foreground mb-3 md:mb-4">
            About This Product
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-3xl text-sm md:text-base">
            {product.description}
          </p>
        </section>
        
        {/* Reviews Section */}
        {reviews.length > 0 && (
          <section className="mb-12 md:mb-16">
            <div className="flex items-center justify-between mb-4 md:mb-8">
              <div>
                <h2 className="font-serif text-xl md:text-2xl font-bold text-foreground mb-1 md:mb-2">
                  Customer Reviews
                </h2>
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 md:h-5 md:w-5 ${
                          i < Math.round(averageRating)
                            ? "fill-primary text-primary"
                            : "text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-muted-foreground text-xs md:text-base">
                    Based on {reviews.length} reviews
                  </span>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              {reviews.map((review, index) => (
                <ReviewCard key={review.id} review={review} index={index} />
              ))}
            </div>
          </section>
        )}
        
        {/* Product FAQ */}
        <section className="mb-12 md:mb-16">
          <ProductFAQ />
        </section>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="font-serif text-xl md:text-2xl font-bold text-foreground mb-4 md:mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
              {relatedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </section>
        )}
      </main>
      
      {/* Mobile Sticky Add to Cart - improved with quantity controls */}
      <div className="fixed bottom-16 left-0 right-0 p-3 bg-background/95 backdrop-blur-md border-t border-border md:hidden z-40 safe-area-pb">
        <div className="flex items-center gap-3">
          {/* Quantity controls */}
          <div className="flex items-center border border-border rounded-lg bg-background">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="h-10 w-10 flex items-center justify-center text-foreground"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-8 text-center font-medium text-sm">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="h-10 w-10 flex items-center justify-center text-foreground"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          
          {/* Add to Cart */}
          <Button
            onClick={handleAddToCart}
            className="flex-1 btn-premium h-10"
            disabled={!product.inStock}
          >
            <span className="flex items-center gap-2">
              {product.inStock ? (
                <>
                  Add to Cart
                  <span className="text-xs opacity-80">• {formatPrice(product.price * quantity)}</span>
                </>
              ) : (
                "Out of Stock"
              )}
            </span>
          </Button>
        </div>
      </div>
      
      {/* Recently Viewed */}
      <RecentlyViewed excludeProductId={product.id} />
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
