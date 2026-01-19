import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import heroVideo from "@/assets/videos/hero-video.mp4";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] sm:min-h-screen flex items-center overflow-hidden">
      {/* Full-width Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          Your browser does not support the video tag.
        </video>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
      </div>
      
      {/* Animated glow */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[400px] lg:w-[500px] h-[300px] sm:h-[400px] lg:h-[500px] bg-primary/20 rounded-full blur-[80px] sm:blur-[120px] animate-glow-pulse z-[1]" />
      
      <div className="container relative z-10 py-8 sm:py-12">
        <div className="max-w-2xl">
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
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-xs sm:text-sm font-medium mb-4 sm:mb-6 border border-white/20"
            >
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
              Rooted in Tradition, Radiant in Spirit
            </motion.div>
            
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-4 sm:mb-6 drop-shadow-lg">
              Awaken Your{" "}
              <span className="text-gradient-gold">Inner Light</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-xl mx-auto lg:mx-0 mb-6 sm:mb-8 drop-shadow-md">
              Discover sacred crystal lamps handcrafted with devotion, featuring divine 
              deities to bring peace, prosperity, and spiritual energy to your home.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="btn-premium text-sm sm:text-base px-6 sm:px-8 h-11 sm:h-12">
                <Link to="/collections">Shop Collection</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-sm sm:text-base px-6 sm:px-8 h-11 sm:h-12 border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:text-white">
                <Link to="/collections/deity">Explore Deities</Link>
              </Button>
            </div>
            
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex gap-6 sm:gap-8 justify-center lg:justify-start mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/20"
            >
              <div className="text-center lg:text-left">
                <p className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-primary drop-shadow-lg">5000+</p>
                <p className="text-xs sm:text-sm text-white/80">Happy Customers</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-primary drop-shadow-lg">4.9★</p>
                <p className="text-xs sm:text-sm text-white/80">Average Rating</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-primary drop-shadow-lg">25+</p>
                <p className="text-xs sm:text-sm text-white/80">Unique Designs</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden sm:flex z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center gap-2 text-white/80"
        >
          <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </motion.div>
    </section>
  );
};
