import { useState } from "react";
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
import { getProductBySlug, getRelatedProducts, getProductReviews } from "@/data/products";

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || "");
  const { addItem, openCart } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [showGiftMessage, setShowGiftMessage] = useState(false);
  const [giftMessage, setGiftMessage] = useState("");

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
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        {/* Product Section */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
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
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Title & Rating */}
            <div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
                {product.name}
              </h1>
              <div className="flex items-center gap-3">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.round(averageRating)
                          ? "fill-primary text-primary"
                          : "text-muted"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {averageRating.toFixed(1)} ({product.reviewCount} reviews)
                </span>
              </div>
            </div>
            
            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-foreground">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                  <span className="px-2 py-1 text-xs font-medium bg-destructive/10 text-destructive rounded">
                    {discount}% OFF
                  </span>
                </>
              )}
            </div>
            
            {/* Short Description */}
            <p className="text-muted-foreground leading-relaxed">
              {product.shortDescription}
            </p>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap gap-4 py-4 border-y border-border/50">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Truck className="h-4 w-4 text-primary" />
                Free Shipping
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Secure Checkout
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <RotateCcw className="h-4 w-4 text-primary" />
                30-Day Returns
              </div>
            </div>
            
            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
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
              
              {/* Add to Cart Button */}
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
            
            {/* Features & Specs Accordion */}
            <Accordion type="single" collapsible defaultValue="features" className="w-full">
              <AccordionItem value="features">
                <AccordionTrigger className="text-foreground">Features</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-muted-foreground">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="specifications">
                <AccordionTrigger className="text-foreground">Specifications</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-sm">
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
                    <div className="mt-4">
                      <SizeComparison size={product.specifications.size} />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>
        
        {/* Full Description */}
        <section className="mb-16">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
            About This Product
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-3xl">
            {product.description}
          </p>
        </section>
        
        {/* Reviews Section */}
        {reviews.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
                  Customer Reviews
                </h2>
                <div className="flex items-center gap-3">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.round(averageRating)
                            ? "fill-primary text-primary"
                            : "text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-muted-foreground">
                    Based on {reviews.length} reviews
                  </span>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {reviews.map((review, index) => (
                <ReviewCard key={review.id} review={review} index={index} />
              ))}
            </div>
          </section>
        )}
        
        {/* Product FAQ */}
        <section className="mb-16">
          <ProductFAQ />
        </section>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="font-serif text-2xl font-bold text-foreground mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </section>
        )}
      </main>
      
      {/* Mobile Sticky Add to Cart */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm border-t border-border lg:hidden z-40">
        <div className="flex items-center gap-4">
          <div>
            <p className="font-bold text-foreground">{formatPrice(product.price)}</p>
            {product.compareAtPrice && (
              <p className="text-xs text-muted-foreground line-through">
                {formatPrice(product.compareAtPrice)}
              </p>
            )}
          </div>
          <Button
            onClick={handleAddToCart}
            className="flex-1 btn-premium"
            disabled={!product.inStock}
          >
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
