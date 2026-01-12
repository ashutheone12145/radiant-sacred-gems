import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustBadges } from "@/components/home/TrustBadges";
import { CollectionCard } from "@/components/home/CollectionCard";
import { FeatureShowcase } from "@/components/home/FeatureShowcase";
import { TestimonialCard } from "@/components/home/TestimonialCard";
import { ProductCard } from "@/components/product/ProductCard";
import { products, collections, reviews } from "@/data/products";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const featuredProducts = products.slice(0, 4);
  const featuredReviews = reviews.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <HeroSection />
        
        {/* Trust Badges */}
        <TrustBadges />
        
        {/* Featured Collections */}
        <section className="py-16 md:py-24 bg-cream/30">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                Explore Our Collections
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover handcrafted crystal lamps featuring divine deities and celestial designs
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {collections.map((collection, index) => (
                <motion.div
                  key={collection.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <CollectionCard collection={collection} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Bestsellers */}
        <section className="py-16 md:py-24">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row md:items-end justify-between mb-12"
            >
              <div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Bestselling Lamps
                </h2>
                <p className="text-muted-foreground max-w-xl">
                  Our most loved crystal lamps, chosen by thousands of happy customers
                </p>
              </div>
              <Button asChild variant="ghost" className="mt-4 md:mt-0 text-primary hover:text-primary/80">
                <Link to="/collections" className="flex items-center gap-2">
                  View All <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Day/Night Feature */}
        <FeatureShowcase />
        
        {/* Testimonials */}
        <section className="py-16 md:py-24 bg-cream/30">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                What Our Customers Say
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Join thousands of satisfied customers who have transformed their spaces
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {featuredReviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <TestimonialCard 
                    author={review.author}
                    rating={review.rating}
                    content={review.content}
                    index={index}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 via-background to-sand/30">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
                Ready to Illuminate Your Space?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Browse our complete collection of divine crystal lamps and find the perfect 
                piece to transform your home into a sacred sanctuary.
              </p>
              <Button asChild size="lg" className="btn-premium text-base px-8">
                <Link to="/collections">Shop All Lamps</Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
