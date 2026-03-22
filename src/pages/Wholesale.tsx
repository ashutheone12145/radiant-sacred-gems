import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, Users, TrendingUp, CheckCircle } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

const benefits = [
  { icon: Package, title: 'Bulk Discounts', desc: 'Tiered pricing starting from 20% off for orders of 10+ units, up to 40% for 100+ units.' },
  { icon: Users, title: 'Dedicated Support', desc: 'A dedicated account manager to assist with orders, customisation, and delivery coordination.' },
  { icon: TrendingUp, title: 'Custom Branding', desc: 'Add your logo or a custom message to the packaging for corporate gifting and branded events.' },
  { icon: CheckCircle, title: 'Priority Dispatch', desc: 'Wholesale orders are always prioritised. Bulk orders dispatched within 3–5 business days.' },
];

const Wholesale = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
              <BreadcrumbPage>Wholesale</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-10">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">Wholesale & Corporate Gifting</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Looking to order in bulk for Diwali gifting, corporate events, weddings, or retail?
            We offer attractive wholesale pricing with custom packaging options.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-card border border-border rounded-xl p-4"
            >
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <b.icon className="h-4.5 w-4.5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground text-sm mb-1.5">{b.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="font-serif text-xl font-bold text-foreground mb-4">Pricing Tiers</h2>
            <div className="space-y-3">
              {[
                { qty: '10–24 units', disc: '20% off', min: '₹2,000 per item' },
                { qty: '25–49 units', disc: '28% off', min: '₹1,800 per item' },
                { qty: '50–99 units', disc: '33% off', min: '₹1,600 per item' },
                { qty: '100+ units', disc: '40% off', min: 'Custom Quote' },
              ].map((tier) => (
                <div key={tier.qty} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                  <span className="text-sm text-foreground font-medium">{tier.qty}</span>
                  <div className="text-right">
                    <span className="text-primary font-semibold text-sm">{tier.disc}</span>
                    <p className="text-xs text-muted-foreground">{tier.min}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {!submitted ? (
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              onSubmit={handleSubmit}
              className="bg-card border border-border rounded-xl p-6 space-y-4"
            >
              <h2 className="font-serif text-xl font-bold text-foreground">Get a Quote</h2>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Name / Company</label>
                <Input placeholder="Your name or company name" required className="h-10" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Email Address</label>
                <Input type="email" placeholder="you@company.com" required className="h-10" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Phone Number</label>
                <Input placeholder="+91 XXXXX XXXXX" className="h-10" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Estimated Quantity</label>
                <Input placeholder="e.g. 50 units" required className="h-10" />
              </div>
              <Button type="submit" className="w-full btn-premium">
                Request Wholesale Quote
              </Button>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-card border border-border rounded-xl p-6 flex flex-col items-center justify-center text-center"
            >
              <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
              <h2 className="font-serif text-xl font-bold text-foreground mb-2">Request Received!</h2>
              <p className="text-muted-foreground text-sm">
                Thank you for your interest. Our wholesale team will get back to you within 24 hours with a customised quote.
              </p>
            </motion.div>
          )}
        </div>

        <div className="text-center border-t border-border pt-8">
          <p className="text-sm text-muted-foreground mb-1">Questions before you enquire?</p>
          <Link to="/contact" className="text-primary hover:underline text-sm font-medium">Contact our team →</Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Wholesale;
