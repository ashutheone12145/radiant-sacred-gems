import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Instagram, Heart, ShoppingBag } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroLamp from "@/assets/products/hero-lamp.jpg";
import krishnaLamp from "@/assets/products/krishna-lamp.jpg";
import ganeshaLamp1 from "@/assets/products/ganesha-lamp-1.jpg";
import ganeshaLamp2 from "@/assets/products/ganesha-lamp-2.jpg";

const galleryImages = [
  { src: heroLamp, alt: "Divine Crystal Lamp", likes: 1247, productSlug: "shiva-crystal-lamp" },
  { src: ganeshaLamp1, alt: "Lord Ganesha Crystal Lamp", likes: 982, productSlug: "ganesha-crystal-lamp" },
  { src: krishnaLamp, alt: "Radha Krishna Crystal Lamp", likes: 1456, productSlug: "krishna-crystal-lamp" },
  { src: ganeshaLamp2, alt: "Ganesha Lamp Illuminated", likes: 867, productSlug: "ganesha-crystal-lamp" },
  { src: heroLamp, alt: "Spiritual Ambiance Lamp", likes: 1123, productSlug: "shiva-crystal-lamp" },
  { src: krishnaLamp, alt: "Krishna Playing Flute", likes: 934, productSlug: "krishna-crystal-lamp" },
  { src: ganeshaLamp1, alt: "Ganesha Blessing Pose", likes: 1089, productSlug: "ganesha-crystal-lamp" },
  { src: ganeshaLamp2, alt: "Crystal Lamp Night Glow", likes: 756, productSlug: "ganesha-crystal-lamp" },
];

interface InstagramGalleryProps {
  title?: string;
  subtitle?: string;
}

export const InstagramGallery = ({ 
  title = "Follow Our Journey",
  subtitle = "Tag us @crystaldivinelamps for a chance to be featured"
}: InstagramGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [likedImages, setLikedImages] = useState<Set<number>>(new Set());

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const goToPrevious = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  const goToNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % galleryImages.length);
    }
  };

  const toggleLike = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedImages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <section className="py-16 md:py-24 bg-cream/30">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-orange-500/10 mb-4">
            <Instagram className="h-5 w-5 text-pink-500" />
            <span className="text-sm font-medium bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">
              @crystaldivinelamps
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            {title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Instagram-style Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group relative aspect-square cursor-pointer overflow-hidden rounded-lg"
              onClick={() => openLightbox(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/50 transition-colors duration-300 flex flex-col items-center justify-center gap-3">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-4">
                  <button
                    onClick={(e) => toggleLike(index, e)}
                    className="flex items-center gap-1 text-white"
                  >
                    <Heart 
                      className={`h-6 w-6 transition-all ${
                        likedImages.has(index) 
                          ? "fill-red-500 text-red-500 scale-110" 
                          : "text-white"
                      }`}
                    />
                    <span className="font-semibold">
                      {likedImages.has(index) ? image.likes + 1 : image.likes}
                    </span>
                  </button>
                </div>
                
                {/* Shop Now Button */}
                <Link
                  to={`/product/${image.productSlug}`}
                  onClick={(e) => e.stopPropagation()}
                  className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                >
                  <Button size="sm" className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg">
                    <ShoppingBag className="h-4 w-4" />
                    Shop Now
                  </Button>
                </Link>
              </div>

              {/* Corner gradient */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        <Dialog open={selectedIndex !== null} onOpenChange={() => closeLightbox()}>
          <DialogContent className="max-w-4xl w-full p-0 bg-background/95 backdrop-blur-xl border-primary/20">
            <AnimatePresence mode="wait">
              {selectedIndex !== null && (
                <motion.div
                  key={selectedIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  {/* Close button */}
                  <button
                    onClick={closeLightbox}
                    className="absolute top-4 right-4 z-50 p-2 rounded-full bg-foreground/10 hover:bg-foreground/20 transition-colors"
                  >
                    <X className="h-5 w-5 text-foreground" />
                  </button>

                  {/* Navigation buttons */}
                  <button
                    onClick={goToPrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-foreground/10 hover:bg-foreground/20 transition-colors"
                  >
                    <ChevronLeft className="h-6 w-6 text-foreground" />
                  </button>
                  <button
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-foreground/10 hover:bg-foreground/20 transition-colors"
                  >
                    <ChevronRight className="h-6 w-6 text-foreground" />
                  </button>

                  {/* Image */}
                  <div className="aspect-square md:aspect-[4/3] overflow-hidden rounded-lg">
                    <img
                      src={galleryImages[selectedIndex].src}
                      alt={galleryImages[selectedIndex].alt}
                      className="w-full h-full object-contain bg-background"
                    />
                  </div>

                  {/* Image info */}
                  <div className="p-4 flex items-center justify-between border-t border-border">
                    <div>
                      <p className="font-medium text-foreground">
                        {galleryImages[selectedIndex].alt}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Crystal Divine Lamps Collection
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => toggleLike(selectedIndex, e)}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                      >
                        <Heart 
                          className={`h-5 w-5 transition-all ${
                            likedImages.has(selectedIndex) 
                              ? "fill-red-500 text-red-500" 
                              : "text-primary"
                          }`}
                        />
                        <span className="font-medium text-foreground">
                          {likedImages.has(selectedIndex) 
                            ? galleryImages[selectedIndex].likes + 1 
                            : galleryImages[selectedIndex].likes
                          }
                        </span>
                      </button>
                      <Button asChild className="gap-2">
                        <Link to={`/product/${galleryImages[selectedIndex].productSlug}`}>
                          <ShoppingBag className="h-4 w-4" />
                          Shop Now
                        </Link>
                      </Button>
                    </div>
                  </div>

                  {/* Thumbnails */}
                  <div className="p-4 border-t border-border">
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {galleryImages.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedIndex(idx)}
                          className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden transition-all ${
                            idx === selectedIndex 
                              ? "ring-2 ring-primary ring-offset-2 ring-offset-background" 
                              : "opacity-60 hover:opacity-100"
                          }`}
                        >
                          <img
                            src={img.src}
                            alt={img.alt}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};