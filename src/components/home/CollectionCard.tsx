import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Collection } from "@/types/product";

interface CollectionCardProps {
  collection: Collection;
  index?: number;
}

export const CollectionCard = ({ collection, index = 0 }: CollectionCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 }}
    >
      <Link
        to={`/collections/${collection.slug}`}
        className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br from-sand to-cream"
      >
        {/* Background placeholder */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-foreground/60" />
        
        {/* Hover glow effect */}
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500" />
        
        {/* Shimmer effect on hover */}
        <div className="shimmer-overlay" />
        
        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <div className="transform transition-transform duration-300 group-hover:-translate-y-2">
            <p className="text-primary text-sm font-medium mb-2">
              {collection.productCount} Products
            </p>
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-2">
              {collection.name}
            </h3>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
              {collection.description}
            </p>
            <div className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
              Explore Collection
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </div>
        
        {/* Border glow on hover */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/30 transition-colors duration-500" />
      </Link>
    </motion.div>
  );
};
