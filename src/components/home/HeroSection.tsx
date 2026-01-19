import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import heroLamp from "@/assets/products/hero-lamp.png";

const heroImages = [
  { src: heroLamp, alt: "आत्मन् Roots Sacred Crystal Lamp with spiritual ambiance" },
];

export const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSwipe = (swipeDirection: number) => {
    setDirection(swipeDirection);
    if (swipeDirection > 0) {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    } else {
      setCurrentIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
    }
  };

  const swipeVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-cream via-background to-sand/30">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-pattern-subtle opacity-30" />
      
      {/* Animated glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[400px] lg:w-[600px] h-[300px] sm:h-[400px] lg:h-[600px] bg-primary/20 rounded-full blur-[80px] sm:blur-[120px] animate-glow-pulse" />
      
      <div className="container relative z-10 py-8 sm:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium mb-4 sm:mb-6"
            >
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
              Rooted in Tradition, Radiant in Spirit
            </motion.div>
            
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight mb-4 sm:mb-6">
              Awaken Your{" "}
              <span className="text-gradient-gold">Inner Light</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-6 sm:mb-8">
              Discover sacred crystal lamps handcrafted with devotion, featuring divine 
              deities to bring peace, prosperity, and spiritual energy to your home.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="btn-premium text-sm sm:text-base px-6 sm:px-8 h-11 sm:h-12">
                <Link to="/collections">Shop Collection</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-sm sm:text-base px-6 sm:px-8 h-11 sm:h-12 border-primary/30 hover:bg-primary/5">
                <Link to="/collections/deity">Explore Deities</Link>
              </Button>
            </div>
            
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex gap-6 sm:gap-8 justify-center lg:justify-start mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border/50"
            >
              <div className="text-center lg:text-left">
                <p className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-primary">5000+</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Happy Customers</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-primary">4.9★</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Average Rating</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-primary">25+</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Unique Designs</p>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Hero Image - Now visible on mobile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative aspect-square max-w-[280px] sm:max-w-[350px] lg:max-w-lg mx-auto">
              {/* Glow effect behind image */}
              <div className="absolute inset-0 bg-gradient-radial from-primary/40 via-primary/10 to-transparent rounded-full blur-2xl sm:blur-3xl animate-glow-pulse" />
              
              {/* Image Carousel with Swipe */}
              <div className="relative z-10 aspect-square rounded-2xl sm:rounded-3xl overflow-hidden border border-primary/20 shadow-gold">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.img
                    key={currentIndex}
                    src={heroImages[currentIndex].src}
                    alt={heroImages[currentIndex].alt}
                    className="w-full h-full object-cover cursor-grab active:cursor-grabbing"
                    custom={direction}
                    variants={swipeVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={(_, info) => {
                      const swipeThreshold = 50;
                      if (info.offset.x < -swipeThreshold) {
                        handleSwipe(1);
                      } else if (info.offset.x > swipeThreshold) {
                        handleSwipe(-1);
                      }
                    }}
                  />
                </AnimatePresence>
              </div>

              {/* Carousel Indicators */}
              {heroImages.length > 1 && (
                <div className="absolute -bottom-6 sm:-bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                  {heroImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex 
                          ? "w-6 sm:w-8 bg-primary" 
                          : "bg-primary/30 hover:bg-primary/50"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden sm:flex"
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
