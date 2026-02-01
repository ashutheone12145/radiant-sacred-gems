import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

// Import hero videos
import heroMobileVideo from "@/assets/hero/hero-mobile.webm";
import heroDesktopVideo from "@/assets/hero/hero-desktop.webm";
export const HeroSection = () => {
  const isMobile = useIsMobile();
  return <section className="bg-gradient-to-b from-background via-cream/20 to-background">
      {/* Top Section - Heading and Subheading */}
      <div className="container px-4 pt-8 sm:pt-12 md:pt-16 pb-6 sm:pb-8">
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8
      }} className="text-center max-w-3xl mx-auto">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.2
        }} className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium mb-4 sm:mb-6 border border-primary/20">
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
            Rooted in Tradition, Radiant in Spirit
          </motion.div>
          
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-foreground via-primary to-saffron bg-clip-text text-transparent">
              Awaken Your Inner Light
            </span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover sacred crystal lamps handcrafted with devotion, featuring divine 
            deities to bring peace, prosperity, and spiritual energy to your home.
          </p>
        </motion.div>
      </div>
      
      {/* Middle Section - Image Carousel */}
      <div className="container px-4">
        <motion.div initial={{
        opacity: 0,
        scale: 0.95
      }} animate={{
        opacity: 1,
        scale: 1
      }} transition={{
        duration: 0.8,
        delay: 0.3
      }} className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl max-w-5xl mx-auto">
          {/* Video - square on mobile, 21:9 cinematic on desktop/tablet */}
          <div className={isMobile ? "aspect-square" : "aspect-[21/9]"}>
            <video src={isMobile ? heroMobileVideo : heroDesktopVideo} autoPlay loop muted playsInline className="w-full h-full object-cover" />
          </div>
          
          {/* Subtle gradient overlay for aesthetics */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
        </motion.div>
      </div>
      
      {/* Bottom Section - CTA and Stats */}
      <div className="container px-4 pt-8 sm:pt-12 pb-10 sm:pb-16">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.6
      }} className="text-center">
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12">
            <Button asChild size="lg" className="btn-premium text-sm sm:text-base px-6 sm:px-8 h-11 sm:h-12">
              <Link to="/collections">Shop Collection</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-sm sm:text-base px-6 sm:px-8 h-11 sm:h-12 border-primary/30 hover:bg-primary/10 hover:text-foreground">
              <Link to="/collections/deity">Explore Deities</Link>
            </Button>
          </div>
          
          {/* Stats */}
          <div className="flex gap-8 sm:gap-12 justify-center pt-6 sm:pt-8 border-t border-border/50 max-w-xl mx-auto">
            <div className="text-center">
              <p className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-primary">5000+</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Happy Customers</p>
            </div>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-primary">4.9★</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Average Rating</p>
            </div>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-primary">25+</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Unique Designs</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>;
};