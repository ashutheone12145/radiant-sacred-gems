import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Star, ShoppingBag, Shield, Truck, RotateCcw } from "lucide-react";
import shivjiCloseup from "@/assets/products/shivji-closeup.png";
import shivjiFrame from "@/assets/hero/shivji-led-frame.png";
import familyRoom from "@/assets/lifestyle/family-room.png";
import { useState } from "react";

const productImages = [shivjiCloseup, shivjiFrame, familyRoom];

export const FeaturedProduct = () => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <section className="py-16 sm:py-20 md:py-28 bg-secondary/40">
      <div className="container px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <p className="text-primary font-medium tracking-[0.15em] uppercase text-xs mb-3">
            Best Seller
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
            Featured Product
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center max-w-5xl mx-auto">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative rounded-2xl overflow-hidden bg-card mb-3">
              <img
                src={productImages[selectedImage]}
                alt="Lord Shiva LED Photo Frame - Featured Product"
                className="w-full aspect-square object-cover"
              />
              {/* Sale badge */}
              <div className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                30% OFF
              </div>
            </div>
            {/* Thumbnail strip */}
            <div className="flex gap-2">
              {productImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    idx === selectedImage
                      ? "border-primary"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-1.5 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-primary text-primary" />
              ))}
              <span className="text-sm text-muted-foreground ml-2">4.9 (156 reviews)</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
              Lord Shiva LED Photo Frame
            </h3>

            <p className="text-muted-foreground text-sm sm:text-base mb-6 leading-relaxed">
              A masterfully crafted LED backlit photo frame featuring Lord Shiva, 
              with warm golden illumination that creates a divine atmosphere in any room. 
              Premium quality frame with energy-efficient LEDs.
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl sm:text-4xl font-serif font-bold text-foreground">₹2,699</span>
              <span className="text-lg text-muted-foreground line-through">₹3,799</span>
              <span className="text-sm text-primary font-medium">Save ₹1,100</span>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Button asChild size="lg" className="btn-premium flex-1 h-12 sm:h-14 text-sm">
                <Link to="/product/shiva-crystal-lamp" className="gap-2">
                  <ShoppingBag className="h-4 w-4" />
                  Add to Cart
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 sm:h-14 text-sm border-primary/25 hover:bg-primary/5">
                <Link to="/product/shiva-crystal-lamp">
                  View Details
                </Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Truck, label: "Free Shipping", sub: "Orders ₹999+" },
                { icon: Shield, label: "Secure Payment", sub: "100% Protected" },
                { icon: RotateCcw, label: "Easy Returns", sub: "30-Day Policy" },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="text-center p-3 rounded-lg bg-background border border-border/50">
                  <Icon className="h-4 w-4 text-primary mx-auto mb-1.5" />
                  <p className="text-xs font-medium text-foreground">{label}</p>
                  <p className="text-[10px] text-muted-foreground">{sub}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
