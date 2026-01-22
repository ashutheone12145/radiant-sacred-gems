import { motion } from "framer-motion";

const announcements = [
  "🕉️ Free Shipping on Orders Over ₹999",
  "✨ 30% OFF on First Order - Use Code: AATMAN30",
  "🚚 Same Day Dispatch Before 2 PM",
  "🎁 Free Gift Wrapping Available",
  "🙏 Handcrafted with Devotion in India",
];

export const AnnouncementBar = () => {
  return (
    <div className="bg-primary text-primary-foreground py-2 overflow-hidden">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 25,
            ease: "linear",
          },
        }}
      >
        {/* Duplicate the announcements for seamless loop */}
        {[...announcements, ...announcements].map((text, index) => (
          <span
            key={index}
            className="mx-8 text-xs sm:text-sm font-medium inline-flex items-center"
          >
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
};
