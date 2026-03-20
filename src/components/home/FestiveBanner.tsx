import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Gift, ArrowRight } from "lucide-react";
import diwaliImg from "@/assets/lifestyle/diwali-festive.png";

export const FestiveBanner = () => {
  return (
    <section className="py-16 sm:py-20 md:py-28">
      <div className="container px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-2xl sm:rounded-3xl"
        >
          {/* Background image */}
          <div className="relative">
            <img
              src={diwaliImg}
              alt="Diwali festive display with LED deity frames, crystal lamps, diyas and marigold garlands"
              className="w-full aspect-[16/7] sm:aspect-[21/9] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
          </div>

          {/* Content overlay */}
          <div className="absolute inset-0 flex items-center">
            <div className="px-6 sm:px-10 md:px-16 max-w-lg">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 mb-4">
                <Gift className="h-3.5 w-3.5 text-primary" />
                <span className="text-primary text-xs font-medium tracking-wider uppercase">
                  Festive Gifting
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4" style={{ lineHeight: '1.1' }}>
                Light Up Every
                <br />
                Celebration
              </h2>

              <p className="text-white/75 text-sm sm:text-base mb-6 max-w-sm leading-relaxed">
                Curated gift sets for Diwali, housewarming, and sacred occasions. 
                Beautifully packaged with love and devotion.
              </p>

              <Button
                asChild
                size="lg"
                className="btn-premium text-sm px-6 sm:px-8 h-11 sm:h-12"
              >
                <Link to="/collections" className="gap-2">
                  Shop Festive Gifts <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
