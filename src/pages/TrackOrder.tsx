import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, Search, Truck, CheckCircle } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

const TrackOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId.trim() && email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container px-4 py-8 md:py-12 max-w-2xl mx-auto">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Track Order</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-10">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Package className="h-8 w-8 text-primary" />
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">Track Your Order</h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Enter your order ID and email to get real-time updates on your delivery status.
          </p>
        </motion.div>

        {!submitted ? (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            onSubmit={handleSubmit}
            className="bg-card border border-border rounded-xl p-6 md:p-8 space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Order ID</label>
              <Input
                type="text"
                placeholder="e.g. AR-2024-XXXXX"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                required
                className="h-11"
              />
              <p className="text-xs text-muted-foreground mt-1">Find your Order ID in your order confirmation email.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Email Address</label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11"
              />
            </div>
            <Button type="submit" className="w-full h-11 btn-premium gap-2">
              <Search className="h-4 w-4" />
              Track Order
            </Button>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-xl p-6 md:p-8"
          >
            <div className="text-center mb-6">
              <CheckCircle className="h-10 w-10 text-green-500 mx-auto mb-3" />
              <h2 className="font-serif text-xl font-bold text-foreground mb-1">Tracking details sent!</h2>
              <p className="text-sm text-muted-foreground">
                We've sent the latest tracking info to <strong>{email}</strong>. 
                Please check your inbox (and spam folder).
              </p>
            </div>
            <div className="space-y-3">
              {[
                { icon: CheckCircle, label: 'Order Confirmed', status: 'Done', color: 'text-green-500' },
                { icon: Package, label: 'Packed & Ready', status: 'Done', color: 'text-green-500' },
                { icon: Truck, label: 'Out for Delivery', status: 'In Progress', color: 'text-primary' },
                { icon: CheckCircle, label: 'Delivered', status: 'Pending', color: 'text-muted-foreground' },
              ].map((step) => (
                <div key={step.label} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30">
                  <step.icon className={`h-5 w-5 ${step.color}`} />
                  <span className="text-sm font-medium text-foreground flex-1">{step.label}</span>
                  <span className={`text-xs font-medium ${step.color}`}>{step.status}</span>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              className="w-full mt-5"
              onClick={() => { setSubmitted(false); setOrderId(''); setEmail(''); }}
            >
              Track Another Order
            </Button>
          </motion.div>
        )}

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground mb-3">Need help with your order?</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-border text-foreground text-sm font-medium hover:bg-secondary transition-colors">
              Contact Support
            </Link>
            <Link to="/shipping" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-border text-foreground text-sm font-medium hover:bg-secondary transition-colors">
              Shipping Info
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TrackOrder;
