import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ArrowRight, Quote } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { reviews } from '@/data/products';

const overallStats = [
  { label: '5 Stars', pct: 82 },
  { label: '4 Stars', pct: 13 },
  { label: '3 Stars', pct: 4 },
  { label: '2 Stars', pct: 1 },
  { label: '1 Star', pct: 0 },
];

const Reviews = () => {
  const avgRating = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container px-4 py-8 md:py-12 max-w-4xl mx-auto">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Customer Reviews</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-10">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">What Our Customers Say</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Real stories from families across India who brought divine light into their homes.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-xl p-6 text-center"
          >
            <p className="font-serif text-6xl font-bold text-primary mb-1">{avgRating.toFixed(1)}</p>
            <div className="flex justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-5 w-5 ${i < Math.round(avgRating) ? 'fill-primary text-primary' : 'fill-muted text-muted'}`} />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">Based on {reviews.length} verified reviews</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-card border border-border rounded-xl p-6 space-y-3"
          >
            {overallStats.map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-12 text-right">{s.label}</span>
                <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${s.pct}%` }} />
                </div>
                <span className="text-xs text-muted-foreground w-8">{s.pct}%</span>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-5 mb-10">
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="bg-card border border-border rounded-xl p-5"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-foreground text-sm">{review.author}</p>
                  <div className="flex gap-0.5 mt-1">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className={`h-3.5 w-3.5 ${j < review.rating ? 'fill-primary text-primary' : 'fill-muted text-muted'}`} />
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {review.verified && (
                    <span className="text-[10px] bg-green-500/10 text-green-600 px-2 py-0.5 rounded-full font-medium">Verified</span>
                  )}
                  <Quote className="h-4 w-4 text-primary/30" />
                </div>
              </div>
              <h3 className="font-medium text-foreground text-sm mb-1">{review.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{review.content}</p>
              <p className="text-xs text-muted-foreground/50 mt-3">{review.date}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center bg-primary/5 border border-primary/20 rounded-xl p-6">
          <h2 className="font-serif text-lg font-bold text-foreground mb-2">Ready to Experience the Divine?</h2>
          <p className="text-sm text-muted-foreground mb-5">Join thousands of happy families. Shop our collections today.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/collections/crystal-lamps" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors">
              Shop Crystal Lamps <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/collections/led-frames" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground font-medium text-sm hover:bg-secondary transition-colors">
              Shop LED Frames
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Reviews;
