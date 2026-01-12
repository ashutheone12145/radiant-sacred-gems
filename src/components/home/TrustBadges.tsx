import { Truck, ShieldCheck, Award, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

const badges = [
  { icon: Truck, label: "Free Shipping", description: "On orders over ₹999" },
  { icon: ShieldCheck, label: "Secure Checkout", description: "100% Protected" },
  { icon: Award, label: "Handcrafted", description: "Premium K9 Crystal" },
  { icon: RotateCcw, label: "Easy Returns", description: "30-Day Policy" },
];

export const TrustBadges = () => {
  return (
    <section className="border-y border-border/50 bg-cream/50 py-6">
      <div className="container">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3 justify-center md:justify-start"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <badge.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{badge.label}</p>
                <p className="text-xs text-muted-foreground">{badge.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
