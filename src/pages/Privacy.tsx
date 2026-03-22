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
    title: 'Information We Collect',
    content: `When you place an order, we collect your name, email address, phone number, shipping address, and payment information. We may also collect browsing data (pages visited, time spent) through cookies to improve your shopping experience. We do not store your complete card details — payments are processed securely via PCI-DSS compliant gateways.`,
  },
  {
    title: 'How We Use Your Information',
    content: `Your information is used to process and fulfil your orders, send order confirmation and shipping updates, provide customer support, and occasionally send offers and spiritual inspiration (only if you've opted in). We do not sell, rent, or share your personal data with third parties except as required for order fulfilment (e.g., shipping partners).`,
  },
  {
    title: 'Cookies & Tracking',
    content: `We use essential cookies to keep your cart active and remember your preferences. Analytics cookies (Google Analytics) help us understand how visitors use our site so we can improve it. You can disable cookies in your browser settings, though some features may not function properly.`,
  },
  {
    title: 'Data Security',
    content: `We use industry-standard SSL encryption for all data transmitted through our website. Your payment details are processed through Razorpay/Stripe and are never stored on our servers. We regularly review our security practices to keep your data safe.`,
  },
  {
    title: 'Your Rights',
    content: `You have the right to access, correct, or delete the personal data we hold about you. You can unsubscribe from marketing emails at any time using the link in any email. To exercise any of these rights, please contact us at privacy@aatmanroots.com.`,
  },
  {
    title: 'Third-Party Links',
    content: `Our website may contain links to third-party websites (e.g., social media). We are not responsible for the privacy practices of those sites and encourage you to review their privacy policies independently.`,
  },
  {
    title: 'Changes to This Policy',
    content: `We may update this Privacy Policy from time to time. Any significant changes will be communicated via email or a prominent notice on our website. Continued use of our site after changes constitutes your acceptance of the updated policy.`,
  },
  {
    title: 'Contact Us',
    content: `For any privacy-related questions or concerns, please reach out to us at privacy@aatmanroots.com or write to: आत्मन् Roots, Mumbai, Maharashtra, India.`,
  },
];

const Privacy = () => {
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
              <BreadcrumbPage>Privacy Policy</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground mb-8">Last updated: January 2025</p>

          <p className="text-muted-foreground mb-8 leading-relaxed">
            At आत्मन् Roots, we are committed to protecting your privacy. This policy explains how we collect,
            use, and safeguard your personal information when you visit our website or make a purchase.
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
            <p className="text-sm text-muted-foreground mb-4">Questions about your data?</p>
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

export default Privacy;
