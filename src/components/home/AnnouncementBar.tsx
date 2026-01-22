import { useEffect, useRef } from "react";

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

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    const content = contentRef.current;
    if (!scrollContainer || !content) return;

    let animationId: number;
    let scrollPos = 0;
    const speed = 0.5; // pixels per frame

    const animate = () => {
      scrollPos += speed;
      // Reset when first set of announcements has scrolled past
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
  }, []);

  return (
    <div className="bg-primary text-primary-foreground py-2 overflow-hidden">
      <div
        ref={scrollRef}
        className="overflow-hidden scrollbar-hide"
        style={{ scrollBehavior: "auto" }}
      >
        <div ref={contentRef} className="flex whitespace-nowrap">
          {/* Duplicate the announcements for seamless infinite loop */}
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
  );
};
