import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ZoomIn, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DayNightToggle } from "./DayNightToggle";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";

interface ImageGalleryProps {
  dayImage: string;
  nightImage: string;
  gallery: string[];
  productName: string;
}

export const ImageGallery = ({
  dayImage,
  nightImage,
  gallery,
  productName,
}: ImageGalleryProps) => {
  const [isNightMode, setIsNightMode] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const allImages = [isNightMode ? nightImage : dayImage, ...gallery];
  const currentImage = allImages[selectedIndex] || allImages[0];

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-cream to-sand group">
        {/* Night mode glow effect */}
        {isNightMode && (
          <div className="absolute inset-0 z-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/30 rounded-full blur-3xl animate-glow-pulse" />
          </div>
        )}
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage + isNightMode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`relative z-10 h-full w-full flex items-center justify-center ${
              isNightMode ? "bg-navy/90" : ""
            }`}
          >
            {/* Placeholder for actual image */}
            <div className="w-3/4 h-3/4 rounded-lg bg-primary/10 flex items-center justify-center">
              <span className="text-sm text-muted-foreground text-center p-4">
                {productName}
                <br />
                {isNightMode ? "(Night Mode)" : "(Day Mode)"}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
        
        {/* Controls overlay */}
        <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
          {/* Navigation arrows */}
          {allImages.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePrevious}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </>
          )}
          
          {/* Zoom button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsLightboxOpen(true)}
            className="absolute top-2 right-2 bg-white/80 hover:bg-white"
          >
            <ZoomIn className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Day/Night Toggle */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
          <DayNightToggle
            isNightMode={isNightMode}
            onToggle={() => {
              setIsNightMode(!isNightMode);
              setSelectedIndex(0);
            }}
          />
        </div>
      </div>
      
      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {allImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all ${
                selectedIndex === index
                  ? "ring-2 ring-primary ring-offset-2"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              <div className="w-full h-full bg-gradient-to-br from-cream to-sand flex items-center justify-center">
                <span className="text-xs text-muted-foreground">{index + 1}</span>
              </div>
            </button>
          ))}
        </div>
      )}
      
      {/* Lightbox */}
      <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <DialogContent className="max-w-4xl bg-black/95 border-none p-0">
          <DialogClose className="absolute right-4 top-4 z-50">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <X className="h-6 w-6" />
            </Button>
          </DialogClose>
          <div className="relative aspect-square w-full flex items-center justify-center p-8">
            {isNightMode && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-1/2 h-1/2 bg-primary/30 rounded-full blur-3xl animate-glow-pulse" />
              </div>
            )}
            <div className="relative z-10 w-3/4 h-3/4 rounded-lg bg-primary/10 flex items-center justify-center">
              <span className="text-sm text-white/60 text-center p-4">
                {productName}
                <br />
                {isNightMode ? "(Night Mode)" : "(Day Mode)"}
              </span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
