import { motion } from "framer-motion";

const badges = [
  { emoji: "🚚", label: "Free Shipping", description: "Orders over ₹999" },
  { emoji: "🔒", label: "Secure Checkout", description: "100% Protected" },
  { emoji: "🕉️", label: "Handcrafted", description: "Premium K9 Crystal" },
  { emoji: "↩️", label: "Easy Returns", description: "30-Day Policy" },
];

export const TrustBadges = () => {
  return (
    <section className="border-y border-border/50 bg-cream/50 py-4 sm:py-6">
      <div className="container px-3 sm:px-4">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:gap-8">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-2 sm:gap-3 justify-center sm:justify-start"
            >
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                <span className="text-base sm:text-xl">{badge.emoji}</span>
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-medium text-foreground truncate">{badge.label}</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground truncate">{badge.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
