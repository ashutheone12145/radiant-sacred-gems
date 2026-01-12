import { Star, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import type { Review } from "@/types/product";

interface ReviewCardProps {
  review: Review;
  index?: number;
}

export const ReviewCard = ({ review, index = 0 }: ReviewCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="border border-border/50 rounded-xl p-5 bg-card"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-primary font-semibold text-sm">
              {review.author.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-foreground">{review.author}</span>
              {review.verified && (
                <span className="inline-flex items-center gap-1 text-xs text-green-600">
                  <CheckCircle className="h-3 w-3" />
                  Verified
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">{formatDate(review.date)}</p>
          </div>
        </div>
        
        {/* Stars */}
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < review.rating ? "fill-primary text-primary" : "text-muted"
              }`}
            />
          ))}
        </div>
      </div>
      
      {/* Content */}
      <h4 className="font-medium text-foreground mb-2">{review.title}</h4>
      <p className="text-muted-foreground text-sm leading-relaxed">{review.content}</p>
      
      {/* Review images */}
      {review.images && review.images.length > 0 && (
        <div className="flex gap-2 mt-4">
          {review.images.map((image, imgIndex) => (
            <div
              key={imgIndex}
              className="w-16 h-16 rounded-lg bg-muted overflow-hidden"
            >
              <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                Photo
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};
