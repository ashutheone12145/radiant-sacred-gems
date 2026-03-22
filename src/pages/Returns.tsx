import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RotateCcw, ShieldCheck, AlertCircle, CheckCircle, XCircle, Phone } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

const eligibleReasons = [
  'Item arrived damaged or broken',
  'Wrong product delivered',
  'Significant defect in craftsmanship',
  'Crystal engraving quality issue',
];

const notEligible = [
  'Change of mind after delivery',
  'Minor variations in crystal clarity (natural property)',
  'Items without original packaging',
  'Products returned after 7 days of delivery',
  'Items showing signs of use or tampering',
];

const steps = [
  {
    step: '01',
    title: 'Contact Us Within 7 Days',
    desc: 'Email us at support@aatmanroots.com or WhatsApp +91 98765 43210 within 7 days of receiving your order. Include your order number and photos of the issue.',
  },
  {
    step: '02',
    title: 'Approval & Return Label',
    desc: 'Our team will review your request within 24–48 hours. Once approved, we\'ll send a prepaid return shipping label to your email.',
  },
  {
    step: '03',
    title: 'Pack & Ship',
    desc: 'Pack the item securely in its original packaging. Drop it off at the nearest courier partner. Keep the receipt for your records.',
  },
  {
    step: '04',
    title: 'Refund or Replacement',
    desc: 'Once we receive and inspect the returned item, we\'ll process your refund or dispatch the replacement within 3–5 business days.',
  },
];

const Returns = () => {
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
              <BreadcrumbPage>Returns & Exchanges</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">Returns & Exchanges</h1>
          <p className="text-muted-foreground mb-10 max-w-2xl">
            Your satisfaction is our highest priority. We stand behind every product we make. 
            If something isn't right, we'll make it right.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <h2 className="font-semibold text-foreground">Eligible for Return</h2>
              </div>
              <ul className="space-y-2.5">
                {eligibleReasons.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-green-500 mt-0.5">✓</span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <XCircle className="h-5 w-5 text-destructive" />
                <h2 className="font-semibold text-foreground">Not Eligible for Return</h2>
              </div>
              <ul className="space-y-2.5">
                {notEligible.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-destructive mt-0.5">✗</span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="font-serif text-xl md:text-2xl font-bold text-foreground mb-6">How to Return — Step by Step</h2>
            <div className="space-y-4">
              {steps.map((s, i) => (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4 bg-card border border-border rounded-xl p-5"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold text-sm">{s.step}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5 mb-10">
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
              <ShieldCheck className="h-6 w-6 text-primary mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Refund Policy</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Approved refunds are processed within 3–5 business days back to your original payment method. 
                UPI and wallet refunds are typically instant once approved.
              </p>
            </div>
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
              <RotateCcw className="h-6 w-6 text-primary mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Exchange Policy</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Prefer an exchange? We're happy to swap a damaged or defective item for the same product. 
                Exchanges are processed within 5–7 business days after we receive the return.
              </p>
            </div>
          </div>

          <div className="text-center pt-4 border-t border-border">
            <p className="text-muted-foreground text-sm mb-4">Need help with a return?</p>
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

export default Returns;
