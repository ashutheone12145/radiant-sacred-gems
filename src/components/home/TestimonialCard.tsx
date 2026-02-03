import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

interface TestimonialCardProps {
  author: string;
  rating: number;
  content: string;
  location?: string;
  image?: string;
  index?: number;
}

export const TestimonialCard = ({
  author,
  rating,
  content,
  location,
  index = 0,
}: TestimonialCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 }}
      className="relative card-saffron overflow-visible rounded-2xl p-6 md:p-8 mt-6"
    >
      {/* Quote icon */}
      <div className="absolute -top-4 left-6 z-10 h-8 w-8 rounded-full bg-primary flex items-center justify-center">
        <Quote className="h-4 w-4 text-primary-foreground" />
      </div>
      
      {/* Stars */}
      <div className="flex gap-1 mb-4 mt-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < rating ? "fill-primary text-primary" : "text-muted"
            }`}
          />
        ))}
      </div>
      
      {/* Content */}
      <p className="text-foreground mb-6 leading-relaxed">"{content}"</p>
      
      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
          <span className="text-primary font-semibold text-sm">
            {author.charAt(0)}
          </span>
        </div>
        <div>
          <p className="font-medium text-foreground">{author}</p>
          {location && (
            <p className="text-sm text-muted-foreground">{location}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};
