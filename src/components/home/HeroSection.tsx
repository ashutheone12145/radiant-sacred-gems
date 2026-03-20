import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero/shiva-led-glow.png";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="container px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        {/* Center-aligned content */}
        <div className="max-w-3xl mx-auto text-center">
          {/* Tagline badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-6"
          >
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs sm:text-sm font-medium text-primary tracking-wide">
              Rooted in Tradition, Radiant in Spirit
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6"
            style={{ lineHeight: '1.05' }}
          >
            Awaken Your{' '}
            <span className="text-gradient-gold">Inner Light</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-xl mx-auto mb-8 leading-relaxed"
          >
            Discover sacred crystal lamps handcrafted with devotion, featuring divine 
            deities to bring peace, prosperity, and spiritual energy to your home.
          </motion.p>
        </div>

        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="max-w-4xl mx-auto mb-10"
        >
          <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl">
            <img
              src={heroImage}
              alt="Lord Shiva LED Photo Frame glowing with divine light"
              className="w-full aspect-[4/3] sm:aspect-[3/2] md:aspect-[16/9] object-cover"
            />
          </div>
        </motion.div>

        {/* CTAs centered */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12 sm:mb-16"
        >
          <Button
            asChild
            size="lg"
            className="btn-premium text-sm px-8 h-12 sm:h-14"
          >
            <Link to="/collections">
              Shop Collection
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="text-sm px-8 h-12 sm:h-14 border-border text-foreground hover:bg-secondary hover:text-foreground"
          >
            <Link to="/collections/deity-lamps">Explore Deities</Link>
          </Button>
        </motion.div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex items-center justify-center gap-8 sm:gap-12 pt-8 border-t border-border"
        >
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-serif font-bold text-primary">5000+</p>
            <p className="text-xs text-muted-foreground mt-0.5">Happy Customers</p>
          </div>
          <div className="w-px h-10 bg-border" />
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-serif font-bold text-primary">4.9★</p>
            <p className="text-xs text-muted-foreground mt-0.5">Average Rating</p>
          </div>
          <div className="w-px h-10 bg-border" />
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-serif font-bold text-primary">25+</p>
            <p className="text-xs text-muted-foreground mt-0.5">Unique Designs</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
