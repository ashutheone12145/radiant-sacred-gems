import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import heroLamp from "@/assets/products/hero-lamp.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-cream via-background to-sand/30">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-pattern-subtle opacity-30" />
      
      {/* Animated glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] animate-glow-pulse" />
      
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
            >
              <Sparkles className="h-4 w-4" />
              Handcrafted Divine Illumination
            </motion.div>
            
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight mb-6">
              Illuminate Your{" "}
              <span className="text-gradient-gold">Sacred Space</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8">
              Experience divine radiance with our premium K9 crystal lamps featuring 
              beloved Hindu deities. Transform any room into a serene sanctuary.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="btn-premium text-base px-8">
                <Link to="/collections">Shop Collection</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base px-8 border-primary/30 hover:bg-primary/5">
                <Link to="/collections/deity">Explore Deities</Link>
              </Button>
            </div>
            
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex gap-8 justify-center lg:justify-start mt-12 pt-8 border-t border-border/50"
            >
              <div>
                <p className="text-2xl md:text-3xl font-serif font-bold text-primary">5000+</p>
                <p className="text-sm text-muted-foreground">Happy Customers</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-serif font-bold text-primary">4.9★</p>
                <p className="text-sm text-muted-foreground">Average Rating</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-serif font-bold text-primary">25+</p>
                <p className="text-sm text-muted-foreground">Unique Designs</p>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Glow effect behind image */}
              <div className="absolute inset-0 bg-gradient-radial from-primary/40 via-primary/10 to-transparent rounded-full blur-3xl animate-glow-pulse" />
              
              {/* Hero product image */}
              <div className="relative z-10 aspect-square rounded-3xl overflow-hidden border border-primary/20 shadow-gold">
                <img 
                  src={heroLamp} 
                  alt="Premium Crystal Lamp featuring divine deity" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden lg:flex"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </motion.div>
    </section>
  );
};
