import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Truck, Clock, MapPin, Package, ShieldCheck, RefreshCcw } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

const shippingInfo = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'Enjoy free shipping on all orders above ₹999. Orders below ₹999 are shipped at a flat rate of ₹99.',
  },
  {
    icon: Clock,
    title: 'Same Day Dispatch',
    description: 'Orders placed before 2 PM IST are dispatched the same day, Monday to Saturday (excluding public holidays).',
  },
  {
    icon: MapPin,
    title: 'Pan-India Delivery',
    description: 'We deliver to all pin codes across India. Metro cities receive orders within 2–3 business days; other areas within 4–7 business days.',
  },
  {
    icon: Package,
    title: 'Secure Packaging',
    description: 'Every product is packed with premium protective foam and bubble wrap to ensure it arrives in perfect condition.',
  },
  {
    icon: ShieldCheck,
    title: 'Insured Shipments',
    description: 'All shipments are fully insured against transit damage. If your item arrives damaged, we replace it at no cost.',
  },
  {
    icon: RefreshCcw,
    title: 'Real-Time Tracking',
    description: 'Once dispatched, you will receive an SMS and email with your tracking link so you can follow your order every step of the way.',
  },
];

const deliveryTimeline = [
  { zone: 'Metro Cities', cities: 'Mumbai, Delhi, Bangalore, Chennai, Hyderabad, Kolkata', days: '2–3 Business Days' },
  { zone: 'Tier 2 Cities', cities: 'Pune, Ahmedabad, Jaipur, Lucknow, Bhopal, Surat', days: '3–5 Business Days' },
  { zone: 'Rest of India', cities: 'All other pin codes across India', days: '5–7 Business Days' },
  { zone: 'Remote Areas', cities: 'J&K, Northeast India, Andaman & Nicobar', days: '7–10 Business Days' },
];

const Shipping = () => {
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
              <BreadcrumbPage>Shipping Info</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">Shipping Information</h1>
          <p className="text-muted-foreground mb-10 max-w-2xl">
            We take great care to deliver your divine products safely and promptly across India.
            Here's everything you need to know about our shipping process.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 mb-12">
            {shippingInfo.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="bg-card border border-border rounded-xl p-5"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1.5">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="mb-12">
            <h2 className="font-serif text-xl md:text-2xl font-bold text-foreground mb-5">Delivery Timeline by Zone</h2>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead className="bg-secondary/50">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Zone</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Covers</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Estimated Delivery</th>
                  </tr>
                </thead>
                <tbody>
                  {deliveryTimeline.map((row, i) => (
                    <tr key={row.zone} className={i % 2 === 0 ? 'bg-background' : 'bg-secondary/20'}>
                      <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">{row.zone}</td>
                      <td className="px-4 py-3 text-muted-foreground">{row.cities}</td>
                      <td className="px-4 py-3 text-primary font-medium whitespace-nowrap">{row.days}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-10">
            <h2 className="font-serif text-lg font-bold text-foreground mb-3">International Shipping</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Currently, we ship only within India. We are working on expanding internationally.
              If you are based outside India and wish to place an order, please{' '}
              <Link to="/contact" className="text-primary hover:underline">contact us</Link> and we will do our best to accommodate you.
            </p>
          </div>

          <div className="text-center pt-4 border-t border-border">
            <p className="text-muted-foreground text-sm mb-4">Have more questions about shipping?</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors">
                Contact Support
              </Link>
              <Link to="/faq" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-border text-foreground font-medium text-sm hover:bg-secondary transition-colors">
                View FAQ
              </Link>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Shipping;
