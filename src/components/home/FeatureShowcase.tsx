import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Sparkles, Zap, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import ganeshaLampDay from "@/assets/products/hero-lamp.png";
import ganeshaLampNight from "@/assets/products/hero-lamp-night.png";

export const FeatureShowcase = () => {
  const [isNightMode, setIsNightMode] = useState(false);

  const features = [
    {
      icon: Sparkles,
      title: "Premium K9 Crystal",
      description: "Optical grade crystal for brilliant light refraction",
    },
    {
      icon: Zap,
      title: "USB Powered",
      description: "Convenient USB-C connection with included cable",
    },
    {
      icon: Palette,
      title: "Multi-Color LED",
      description: "Warm white, cool white, and 7-color options",
    },
  ];

  return (
    <section className="py-16 md:py-24 overflow-hidden">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Demo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Background gradient */}
              <div
                className={`absolute inset-0 rounded-3xl transition-all duration-700 ${
                  isNightMode
                    ? "bg-gradient-to-br from-navy via-navy/90 to-navy/80"
                    : "bg-gradient-to-br from-cream via-sand/50 to-cream"
                }`}
              />
              
              {/* Glow effect for night mode */}
              {isNightMode && (
                <div className="absolute inset-0 rounded-3xl">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/40 rounded-full blur-3xl animate-glow-pulse" />
                </div>
              )}
              
              {/* Product image with day/night toggle */}
              <div className="relative z-10 h-full flex items-center justify-center p-8">
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={isNightMode ? "night" : "day"}
                      src={isNightMode ? ganeshaLampNight : ganeshaLampDay}
                      alt={isNightMode ? "Crystal lamp glowing at night" : "Crystal lamp in daylight"}
                      className="w-full h-full object-cover rounded-2xl"
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.5 }}
                    />
                  </AnimatePresence>
                  
                  {/* Glow overlay for night mode */}
                  {isNightMode && (
                    <div className="absolute inset-0 bg-primary/10 mix-blend-overlay rounded-2xl" />
                  )}
                </div>
              </div>
              
              {/* Toggle button */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
                <Button
                  onClick={() => setIsNightMode(!isNightMode)}
                  variant="outline"
                  size="lg"
                  className={`gap-2 transition-all duration-300 ${
                    isNightMode
                      ? "bg-navy/80 border-primary/50 text-primary hover:bg-navy"
                      : "bg-white/80 border-border hover:bg-white"
                  }`}
                >
                  {isNightMode ? (
                    <>
                      <Sun className="h-4 w-4" />
                      Day Mode
                    </>
                  ) : (
                    <>
                      <Moon className="h-4 w-4" />
                      Night Mode
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
          
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Stunning in <span className="text-gradient-gold">Every Light</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our crystal lamps are designed to enchant both day and night. During the day, 
              the precision-cut crystal catches natural light beautifully. At night, the LED 
              base transforms it into a mesmerizing glowing masterpiece.
            </p>
            
            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4 card-saffron-featured p-4 rounded-xl"
                >
                  <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-primary/15 flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
