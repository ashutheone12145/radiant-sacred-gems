import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Gift, Sparkles, ArrowRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

const denominations = [
  { amount: '₹500', desc: 'Perfect for a small blessing' },
  { amount: '₹1,000', desc: 'Ideal for LED photo frames' },
  { amount: '₹2,500', desc: 'Great for crystal lamps' },
  { amount: '₹5,000', desc: 'For the complete gift experience' },
];

const GiftCards = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container px-4 py-8 md:py-12 max-w-3xl mx-auto">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Gift Cards</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-10">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Gift className="h-8 w-8 text-primary" />
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">Gift Cards</h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Give the gift of divine light. Let your loved ones choose their own sacred crystal lamp or LED photo frame.
          </p>
        </motion.div>

        <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-6 md:p-8 mb-10 text-center">
          <Sparkles className="h-8 w-8 text-primary mx-auto mb-3" />
          <h2 className="font-serif text-xl font-bold text-foreground mb-2">Coming Soon</h2>
          <p className="text-muted-foreground text-sm max-w-sm mx-auto mb-6">
            We're crafting a beautiful digital gift card experience. Subscribe to be the first to know when it launches.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-2.5 rounded-full border border-border bg-background text-sm focus:outline-none focus:border-primary"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors whitespace-nowrap"
            >
              Notify Me
            </button>
          </form>
        </div>

        <h2 className="font-serif text-xl font-bold text-foreground mb-5 text-center">Planned Denominations</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {denominations.map((d, i) => (
            <motion.div
              key={d.amount}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-card border border-border rounded-xl p-4 text-center"
            >
              <p className="font-serif text-2xl font-bold text-primary mb-1">{d.amount}</p>
              <p className="text-xs text-muted-foreground">{d.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center bg-card border border-border rounded-xl p-6">
          <p className="text-muted-foreground mb-4 text-sm">
            Meanwhile, explore our curated gift sets — beautifully packaged and ready to gift.
          </p>
          <Link
            to="/collections/gift-sets"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors"
          >
            Shop Gift Sets <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default GiftCards;
