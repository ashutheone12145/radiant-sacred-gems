import { useCallback } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { AnnouncementBar } from "@/components/home/AnnouncementBar";
import { TrustBadges } from "@/components/home/TrustBadges";
import { CollectionCard } from "@/components/home/CollectionCard";
import { FeatureShowcase } from "@/components/home/FeatureShowcase";
import { TestimonialCard } from "@/components/home/TestimonialCard";
import { InstagramGallery } from "@/components/home/InstagramGallery";
import { ProductCard } from "@/components/product/ProductCard";
import { PullToRefresh } from "@/components/ui/pull-to-refresh";
import { ScrollAnimate, StaggerContainer, StaggerItem } from "@/components/ui/scroll-animate";
import { products, collections, reviews } from "@/data/products";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const featuredProducts = products.slice(0, 4);
  const featuredReviews = reviews.slice(0, 3);

  const handleRefresh = useCallback(async () => {
    // Simulate refresh delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success("Content refreshed!", {
      duration: 2000,
      position: "top-center",
    });
  }, []);

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="min-h-screen bg-background">
        {/* Announcement Bar */}
        <AnnouncementBar />
        
        <Header />
        
        <main>
          {/* Hero Section */}
          <HeroSection />
          
          {/* Featured Collections */}
          <section className="py-10 sm:py-16 md:py-24 bg-cream/30">
            <div className="container px-3 sm:px-4">
              <ScrollAnimate animation="fadeUp" className="text-center mb-8 sm:mb-12">
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2 sm:mb-4">
                  Explore Our Collections
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-4">
                  Discover handcrafted crystal lamps featuring divine deities and celestial designs
                </p>
              </ScrollAnimate>
              
              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {collections.map((collection) => (
                  <StaggerItem key={collection.slug}>
                    <CollectionCard collection={collection} />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </section>
          
          {/* Bestsellers */}
          <section className="py-10 sm:py-16 md:py-24">
            <div className="container px-3 sm:px-4">
              <ScrollAnimate animation="fadeUp" className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-12 gap-3">
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2 sm:mb-4">
                    Bestselling Lamps
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground max-w-xl">
                    Our most loved crystal lamps, chosen by thousands of happy customers
                  </p>
                </div>
                <Button asChild variant="ghost" className="text-primary hover:text-primary/80 self-start sm:self-auto">
                  <Link to="/collections" className="flex items-center gap-2 text-sm sm:text-base">
                    View All <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </ScrollAnimate>
              
              <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6" staggerDelay={0.08}>
                {featuredProducts.map((product) => (
                  <StaggerItem key={product.id}>
                    <ProductCard product={product} />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </section>
          
          {/* Day/Night Feature */}
          <ScrollAnimate animation="fadeIn">
            <FeatureShowcase />
          </ScrollAnimate>
          
          {/* Instagram Gallery */}
          <ScrollAnimate animation="fadeUp" delay={0.1}>
            <InstagramGallery />
          </ScrollAnimate>
          
          {/* Trust Badges - Moved above Testimonials */}
          <TrustBadges />
          
          {/* Testimonials */}
          <section className="py-10 sm:py-16 md:py-24 bg-cream/30">
            <div className="container px-3 sm:px-4">
              <ScrollAnimate animation="fadeUp" className="text-center mb-8 sm:mb-12">
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2 sm:mb-4">
                  What Our Customers Say
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-4">
                  Join thousands of satisfied customers who have transformed their spaces
                </p>
              </ScrollAnimate>
              
              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {featuredReviews.map((review, index) => (
                  <StaggerItem key={review.id}>
                    <TestimonialCard 
                      author={review.author}
                      rating={review.rating}
                      content={review.content}
                      index={index}
                    />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </section>
          
          {/* CTA Section */}
          <section className="py-10 sm:py-16 md:py-24 bg-gradient-to-br from-primary/10 via-background to-sand/30">
            <div className="container px-4">
              <ScrollAnimate animation="scale" className="text-center max-w-3xl mx-auto">
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-6">
                  Ready to Illuminate Your Space?
                </h2>
                <p className="text-sm sm:text-lg text-muted-foreground mb-6 sm:mb-8 px-4">
                  Browse our complete collection of divine crystal lamps and find the perfect 
                  piece to transform your home into a sacred sanctuary.
                </p>
                <Button asChild size="lg" className="btn-premium text-sm sm:text-base px-6 sm:px-8 h-11 sm:h-12">
                  <Link to="/collections">Shop All Lamps</Link>
                </Button>
              </ScrollAnimate>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </PullToRefresh>
  );
};

export default Index;
