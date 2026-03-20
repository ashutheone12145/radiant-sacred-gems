import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import poojaRoomImg from "@/assets/lifestyle/pooja-room.png";
import familyRoomImg from "@/assets/lifestyle/family-room.png";

export const LifestyleSection = () => {
  return (
    <section className="py-16 sm:py-20 md:py-28">
      <div className="container px-4 sm:px-6">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="text-primary font-medium tracking-[0.15em] uppercase text-xs mb-3">
            Transform Your Space
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            See It In Your Home
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
            From sacred pooja rooms to warm family gatherings — our LED décor brings divine energy everywhere.
          </p>
        </motion.div>

        {/* Two lifestyle panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Pooja Room */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="group relative overflow-hidden rounded-2xl"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={poojaRoomImg}
                alt="Traditional pooja mandir setup with Lord Shiva LED frame, diyas and incense"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <p className="text-primary text-xs font-medium tracking-wider uppercase mb-2">
                Sacred Spaces
              </p>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
                Pooja Room Décor
              </h3>
              <p className="text-white/70 text-sm mb-4 max-w-sm">
                Create a serene and devotional atmosphere with glowing LED deity frames, diyas, and divine accents.
              </p>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="border-white/30 text-white hover:bg-white/10 bg-transparent"
              >
                <Link to="/collections/deity-lamps" className="gap-2">
                  Shop Pooja Décor <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Family Living Room */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="group relative overflow-hidden rounded-2xl"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={familyRoomImg}
                alt="Indian family enjoying warm evening with Lord Shiva LED frame in living room"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <p className="text-primary text-xs font-medium tracking-wider uppercase mb-2">
                Family Moments
              </p>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
                Living Room Accent
              </h3>
              <p className="text-white/70 text-sm mb-4 max-w-sm">
                A divine LED frame that brings warmth and spiritual energy to your family's everyday moments.
              </p>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="border-white/30 text-white hover:bg-white/10 bg-transparent"
              >
                <Link to="/collections/galaxy-collection" className="gap-2">
                  Shop Wall Décor <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
