import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

const sections = [
  {
    title: 'Acceptance of Terms',
    content: `By accessing and using the आत्मन् Roots website and placing orders, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our website or services.`,
  },
  {
    title: 'Products & Pricing',
    content: `All products listed on our website are subject to availability. Prices are displayed in Indian Rupees (INR) and are inclusive of applicable taxes. We reserve the right to modify prices at any time without prior notice. However, the price at the time of your order will always be honoured.`,
  },
  {
    title: 'Orders & Payment',
    content: `By placing an order, you confirm that the information provided is accurate and complete. We accept payments via major credit/debit cards, UPI, net banking, and wallets through our secure payment partners. All transactions are encrypted and processed securely.`,
  },
  {
    title: 'Shipping & Delivery',
    content: `We aim to dispatch all orders within 1–2 business days. Delivery timelines vary by location (see our Shipping Information page for details). आत्मन् Roots is not responsible for delays caused by courier partners, natural disasters, or other factors beyond our control.`,
  },
  {
    title: 'Returns & Refunds',
    content: `Returns are accepted within 7 days of delivery for damaged, defective, or wrongly delivered items. Please refer to our Returns & Exchanges page for the complete return process. Refunds are processed within 3–5 business days of receiving the returned item.`,
  },
  {
    title: 'Intellectual Property',
    content: `All content on this website — including text, images, logos, product designs, and graphics — is the intellectual property of आत्मन् Roots and is protected by copyright law. You may not reproduce, distribute, or use our content without explicit written permission.`,
  },
  {
    title: 'Limitation of Liability',
    content: `आत्मन् Roots shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or website. Our maximum liability is limited to the total amount paid for the specific order in dispute.`,
  },
  {
    title: 'Governing Law',
    content: `These Terms of Service are governed by the laws of India. Any disputes arising from these terms or your use of our website shall be subject to the exclusive jurisdiction of the courts of Mumbai, Maharashtra.`,
  },
  {
    title: 'Changes to Terms',
    content: `We reserve the right to update these Terms of Service at any time. Significant changes will be communicated via email or a notice on our website. Continued use of our services after any changes constitutes your acceptance of the updated terms.`,
  },
];

const Terms = () => {
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
              <BreadcrumbPage>Terms of Service</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">Terms of Service</h1>
          <p className="text-sm text-muted-foreground mb-8">Last updated: January 2025</p>

          <p className="text-muted-foreground mb-8 leading-relaxed">
            Please read these Terms of Service carefully before using the आत्मन् Roots website or making a purchase.
            These terms govern your relationship with us and your use of our products and services.
          </p>

          <div className="space-y-8">
            {sections.map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <h2 className="font-serif text-lg md:text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                  <span className="text-primary text-sm font-mono">{String(i + 1).padStart(2, '0')}.</span>
                  {section.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{section.content}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 pt-6 border-t border-border text-center">
            <p className="text-sm text-muted-foreground mb-4">Have questions about our terms?</p>
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors">
              Contact Us
            </Link>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;
