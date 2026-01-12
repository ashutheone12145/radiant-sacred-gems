import { motion } from "framer-motion";

interface SizeComparisonProps {
  size: string;
}

export const SizeComparison = ({ size }: SizeComparisonProps) => {
  // Parse size string (e.g., "8cm x 8cm x 10cm")
  const dimensions = size.match(/(\d+)cm/g);
  const height = dimensions ? parseInt(dimensions[dimensions.length - 1]) : 10;
  
  // Scale factor for visualization (max 100px height for 15cm)
  const scaleFactor = 100 / 15;
  const visualHeight = Math.min(height * scaleFactor, 100);
  
  const comparisonItems = [
    { name: "Credit Card", height: 8.5 * scaleFactor, width: 40 },
    { name: "Your Lamp", height: visualHeight, width: 50, highlight: true },
    { name: "Coffee Mug", height: 9.5 * scaleFactor, width: 35 },
  ];

  return (
    <div className="bg-cream/50 rounded-xl p-6">
      <h4 className="text-sm font-medium text-foreground mb-4">Size Comparison</h4>
      
      <div className="flex items-end justify-center gap-8 h-32">
        {comparisonItems.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col items-center"
          >
            <div
              className={`rounded-lg mb-2 flex items-end justify-center transition-all ${
                item.highlight
                  ? "bg-primary/20 border-2 border-primary shadow-gold"
                  : "bg-muted"
              }`}
              style={{
                height: `${item.height}px`,
                width: `${item.width}px`,
              }}
            >
              {item.highlight && (
                <span className="text-xs text-primary font-medium pb-1">
                  {height}cm
                </span>
              )}
            </div>
            <span
              className={`text-xs ${
                item.highlight ? "text-primary font-medium" : "text-muted-foreground"
              }`}
            >
              {item.name}
            </span>
          </motion.div>
        ))}
      </div>
      
      <p className="text-xs text-muted-foreground text-center mt-4">
        Actual dimensions: {size}
      </p>
    </div>
  );
};
