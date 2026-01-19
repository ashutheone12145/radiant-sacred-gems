import { useState, useRef, useEffect } from "react";
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const allImages = [isNightMode ? nightImage : dayImage, ...gallery];
  const currentImage = allImages[selectedIndex] || allImages[0];

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  // Scroll to selected thumbnail on mobile
  useEffect(() => {
    if (scrollContainerRef.current && allImages.length > 1) {
      const container = scrollContainerRef.current;
      const thumbnails = container.children;
      if (thumbnails[selectedIndex]) {
        const thumbnail = thumbnails[selectedIndex] as HTMLElement;
        const containerRect = container.getBoundingClientRect();
        const thumbnailRect = thumbnail.getBoundingClientRect();
        
        if (thumbnailRect.left < containerRect.left || thumbnailRect.right > containerRect.right) {
          thumbnail.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
      }
    }
  }, [selectedIndex, allImages.length]);

  // Touch/swipe handling for mobile
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrevious();
    }
  };

  return (
    <div className="space-y-3 md:space-y-4">
      {/* Main Image */}
      <div 
        className="relative aspect-square rounded-xl md:rounded-2xl overflow-hidden bg-gradient-to-br from-cream to-sand group"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
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
        
        {/* Mobile swipe indicator dots */}
        <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 md:hidden">
          {allImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                selectedIndex === index
                  ? "w-4 bg-primary"
                  : "w-1.5 bg-foreground/30"
              }`}
            />
          ))}
        </div>
        
        {/* Controls overlay - always visible on mobile, hover on desktop */}
        <div className="absolute inset-0 z-20 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
          {/* Navigation arrows - larger touch targets on mobile */}
          {allImages.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePrevious}
                className="absolute left-1 md:left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background h-10 w-10 md:h-9 md:w-9 rounded-full shadow-md"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleNext}
                className="absolute right-1 md:right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background h-10 w-10 md:h-9 md:w-9 rounded-full shadow-md"
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
            className="absolute top-2 right-2 bg-background/80 hover:bg-background h-9 w-9 rounded-full shadow-md"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Day/Night Toggle */}
        <div className="absolute bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 z-20">
          <DayNightToggle
            isNightMode={isNightMode}
            onToggle={() => {
              setIsNightMode(!isNightMode);
              setSelectedIndex(0);
            }}
          />
        </div>
      </div>
      
      {/* Thumbnails - horizontal scroll on mobile */}
      {allImages.length > 1 && (
        <div 
          ref={scrollContainerRef}
          className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory"
        >
          {allImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden transition-all snap-start ${
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
      
      {/* Lightbox - fullscreen on mobile */}
      <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <DialogContent className="max-w-4xl w-screen h-screen md:h-auto md:w-auto bg-black/95 border-none p-0 m-0 md:m-4">
          <DialogClose className="absolute right-3 top-3 z-50">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 h-10 w-10">
              <X className="h-6 w-6" />
            </Button>
          </DialogClose>
          <div 
            className="relative aspect-square w-full h-full md:h-auto flex items-center justify-center p-4 md:p-8"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {isNightMode && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-1/2 h-1/2 bg-primary/30 rounded-full blur-3xl animate-glow-pulse" />
              </div>
            )}
            <div className="relative z-10 w-full max-w-md aspect-square rounded-lg bg-primary/10 flex items-center justify-center">
              <span className="text-sm text-white/60 text-center p-4">
                {productName}
                <br />
                {isNightMode ? "(Night Mode)" : "(Day Mode)"}
              </span>
            </div>
            
            {/* Lightbox navigation */}
            {allImages.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handlePrevious}
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 h-12 w-12"
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 h-12 w-12"
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>
              </>
            )}
            
            {/* Lightbox dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {allImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    selectedIndex === index
                      ? "w-6 bg-primary"
                      : "w-2 bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
