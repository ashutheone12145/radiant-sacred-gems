import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const announcements = [
  "🕉️ Free Shipping on Orders Over ₹999",
  "✨ 30% OFF on First Order - Use Code: AATMAN30",
  "🚚 Same Day Dispatch Before 2 PM",
  "🎁 Free Gift Wrapping Available",
  "🙏 Handcrafted with Devotion in India",
];

export const AnnouncementBar = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Handle scroll to collapse/expand
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Collapse after scrolling down 100px
      if (currentScrollY > 100 && currentScrollY > lastScrollY) {
        setIsCollapsed(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Infinite scroll animation
  useEffect(() => {
    if (isCollapsed) return;
    
    const scrollContainer = scrollRef.current;
    const content = contentRef.current;
    if (!scrollContainer || !content) return;

    let animationId: number;
    let scrollPos = 0;
    const speed = 0.5;

    const animate = () => {
      scrollPos += speed;
      const contentWidth = content.scrollWidth / 2;
      if (scrollPos >= contentWidth) {
        scrollPos = 0;
      }
      scrollContainer.scrollLeft = scrollPos;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isCollapsed]);

  return (
    <div className="sticky top-0 z-40">
      <AnimatePresence mode="wait">
        {!isCollapsed ? (
          <motion.div
            key="expanded"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="bg-primary text-primary-foreground overflow-hidden"
          >
            <div className="py-2 overflow-hidden">
              <div
                ref={scrollRef}
                className="overflow-hidden scrollbar-hide"
                style={{ scrollBehavior: "auto" }}
              >
                <div ref={contentRef} className="flex whitespace-nowrap">
                  {[...announcements, ...announcements].map((text, index) => (
                    <span
                      key={index}
                      className="mx-8 text-xs sm:text-sm font-medium inline-flex items-center"
                    >
                      {text}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="collapsed"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsCollapsed(false)}
            className="w-full bg-primary text-primary-foreground py-1.5 flex items-center justify-center gap-1.5 hover:bg-primary/90 transition-colors cursor-pointer"
          >
            <span className="text-xs font-medium">View Offers</span>
            <ChevronDown className="h-3.5 w-3.5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};