import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero/shivji-led-frame.jpg";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Full-width hero image with overlay */}
      <div className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Lord Shiva LED Photo Frame glowing with divine golden light"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          {/* Warm golden tint */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
        </div>

        {/* Content */}
        <div className="container relative z-10 px-4 sm:px-6 py-16 sm:py-24">
          <div className="max-w-xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-primary font-medium tracking-[0.2em] uppercase text-xs sm:text-sm mb-4 sm:mb-6"
            >
              Premium Spiritual LED Décor
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 sm:mb-8"
              style={{ lineHeight: '1.05' }}
            >
              Illuminate Your
              <br />
              <span className="text-gradient-gold">Sacred Space</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-white/80 text-base sm:text-lg md:text-xl max-w-md mb-8 sm:mb-10 leading-relaxed"
            >
              Handcrafted LED photo frames & 3D crystal lamps featuring divine 
              deities — bring peace, prosperity and warm golden light to your home.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
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
                className="text-sm px-8 h-12 sm:h-14 border-white/30 text-white hover:bg-white/10 hover:text-white bg-transparent"
              >
                <Link to="/collections/deity-lamps">Explore Deities</Link>
              </Button>
            </motion.div>

            {/* Trust strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex items-center gap-6 sm:gap-8 mt-12 sm:mt-16 pt-8 border-t border-white/15"
            >
              <div>
                <p className="text-2xl sm:text-3xl font-serif font-bold text-primary">5000+</p>
                <p className="text-xs text-white/60 mt-0.5">Happy Customers</p>
              </div>
              <div className="w-px h-10 bg-white/15" />
              <div>
                <p className="text-2xl sm:text-3xl font-serif font-bold text-primary">4.9★</p>
                <p className="text-xs text-white/60 mt-0.5">Average Rating</p>
              </div>
              <div className="w-px h-10 bg-white/15" />
              <div>
                <p className="text-2xl sm:text-3xl font-serif font-bold text-primary">25+</p>
                <p className="text-xs text-white/60 mt-0.5">Unique Designs</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
