import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";
import { Button } from "@/components/ui/button";

interface RelatedProductsCarouselProps {
  products: Product[];
  title?: string;
}

export function RelatedProductsCarousel({ 
  products, 
  title = "You May Also Like" 
}: RelatedProductsCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (products.length === 0) return null;

  return (
    <section className="mb-12 md:mb-16">
      <div className="flex items-center justify-between mb-4 md:mb-8">
        <h2 className="font-serif text-xl md:text-2xl font-bold text-foreground">
          {title}
        </h2>
        
        {/* Navigation arrows - hidden on mobile */}
        <div className="hidden sm:flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("left")}
            className="h-9 w-9 rounded-full border-border"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("right")}
            className="h-9 w-9 rounded-full border-border"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Scrollable container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-3 md:gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 snap-x snap-mandatory"
      >
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="min-w-[160px] sm:min-w-[200px] md:min-w-[250px] snap-start"
          >
            <ProductCard product={product} index={index} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
