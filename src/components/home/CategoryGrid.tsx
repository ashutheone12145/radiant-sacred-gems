import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ledFramesImg from "@/assets/categories/led-photo-frames.jpg";
import crystalLampsImg from "@/assets/categories/3d-crystal-lamps.jpg";
import giftingImg from "@/assets/categories/gifting-items.jpg";

const categories = [
  {
    title: "LED Photo Frames",
    description: "Divine deity frames with warm golden backlighting",
    image: ledFramesImg,
    href: "/collections/deity-lamps",
    count: "12 Products",
  },
  {
    title: "3D Crystal Lamps",
    description: "Laser-engraved K9 crystal with multi-color LED",
    image: crystalLampsImg,
    href: "/collections/galaxy-collection",
    count: "8 Products",
  },
  {
    title: "Gifting Collection",
    description: "Beautifully packaged spiritual gift sets",
    image: giftingImg,
    href: "/collections/accessories",
    count: "6 Products",
  },
];

export const CategoryGrid = () => {
  return (
    <section className="py-16 sm:py-20 md:py-28">
      <div className="container px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <p className="text-primary font-medium tracking-[0.15em] uppercase text-xs mb-3">
            Our Collections
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
            Shop by Category
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                to={cat.href}
                className="group relative block aspect-[3/4] overflow-hidden rounded-xl"
              >
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                
                <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-7">
                  <p className="text-primary/90 text-xs font-medium tracking-wider uppercase mb-1">
                    {cat.count}
                  </p>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-1.5">
                    {cat.title}
                  </h3>
                  <p className="text-white/70 text-sm mb-4 line-clamp-2">
                    {cat.description}
                  </p>
                  <div className="inline-flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all duration-300">
                    Explore
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>

                {/* Subtle border on hover */}
                <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-primary/20 transition-colors duration-500" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
