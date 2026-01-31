import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import logo from '@/assets/logo.png';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const footerLinks = {
  shop: [
    { name: 'All Products', href: '/collections' },
    { name: 'Deity Lamps', href: '/collections/deity-lamps' },
    { name: 'Galaxy Series', href: '/collections/galaxy-collection' },
    { name: 'Accessories', href: '/collections/accessories' },
    { name: 'Gift Cards', href: '/gift-cards' },
  ],
  support: [
    { name: 'Contact Us', href: '/contact' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Shipping Info', href: '/shipping' },
    { name: 'Returns', href: '/returns' },
    { name: 'Track Order', href: '/track-order' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Our Story', href: '/story' },
    { name: 'Blog', href: '/blog' },
    { name: 'Reviews', href: '/reviews' },
    { name: 'Wholesale', href: '/wholesale' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-accent text-accent-foreground pb-mobile-nav">
      {/* Newsletter Section */}
      <div className="border-b border-accent-foreground/10">
        <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-serif mb-2 sm:mb-3">
              Join the आत्मन् Roots Family
            </h3>
            <p className="text-accent-foreground/70 text-sm sm:text-base mb-4 sm:mb-6">
              Receive blessings, exclusive offers, and sacred inspiration for your spiritual journey.
            </p>
            <form className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2.5 sm:py-3 bg-accent-foreground/10 border border-accent-foreground/20 rounded-sm text-accent-foreground placeholder:text-accent-foreground/50 focus:outline-none focus:border-primary text-sm sm:text-base"
              />
              <button
                type="submit"
                className="btn-premium whitespace-nowrap text-sm sm:text-base py-2.5 sm:py-4 px-6 sm:px-8"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Brand Column */}
          <div className="text-center lg:text-left">
            <Link to="/" className="inline-flex items-center gap-1.5 mb-3">
              <span className="font-serif text-sm font-semibold text-primary">आत्मन्</span>
              <img src={logo} alt="आत्मन् Roots" className="h-10 w-auto" />
              <span className="font-serif text-sm font-semibold text-primary">Roots</span>
            </Link>
            <p className="text-accent-foreground/70 text-sm mb-2 max-w-xs mx-auto lg:mx-0">
              Rooted in Tradition, Radiant in Spirit
            </p>
            <div className="flex gap-4 justify-center lg:justify-start mt-4">
              <a href="#" className="text-accent-foreground/60 hover:text-primary transition-colors p-2 -m-2">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-accent-foreground/60 hover:text-primary transition-colors p-2 -m-2">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-accent-foreground/60 hover:text-primary transition-colors p-2 -m-2">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Accordion Links - Mobile */}
          <div className="lg:hidden col-span-1">
            <Accordion type="multiple" className="w-full">
              <AccordionItem value="shop" className="border-accent-foreground/10">
                <AccordionTrigger className="text-sm font-serif font-semibold hover:no-underline py-3">
                  Shop
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 pb-2">
                    {footerLinks.shop.map((link) => (
                      <li key={link.name}>
                        <Link to={link.href} className="text-sm text-accent-foreground/70 hover:text-accent-foreground transition-colors">
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="support" className="border-accent-foreground/10">
                <AccordionTrigger className="text-sm font-serif font-semibold hover:no-underline py-3">
                  Support
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 pb-2">
                    {footerLinks.support.map((link) => (
                      <li key={link.name}>
                        <Link to={link.href} className="text-sm text-accent-foreground/70 hover:text-accent-foreground transition-colors">
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="company" className="border-accent-foreground/10">
                <AccordionTrigger className="text-sm font-serif font-semibold hover:no-underline py-3">
                  Company
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 pb-2">
                    {footerLinks.company.map((link) => (
                      <li key={link.name}>
                        <Link to={link.href} className="text-sm text-accent-foreground/70 hover:text-accent-foreground transition-colors">
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="contact" className="border-accent-foreground/10">
                <AccordionTrigger className="text-sm font-serif font-semibold hover:no-underline py-3">
                  Contact
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 pb-2">
                    <li>
                      <a href="mailto:support@aatmanroots.com" className="flex items-center gap-2 text-sm text-accent-foreground/70 hover:text-accent-foreground transition-colors">
                        <Mail className="h-4 w-4" />
                        support@aatmanroots.com
                      </a>
                    </li>
                    <li>
                      <a href="tel:+919876543210" className="flex items-center gap-2 text-sm text-accent-foreground/70 hover:text-accent-foreground transition-colors">
                        <Phone className="h-4 w-4" />
                        +91 98765 43210
                      </a>
                    </li>
                    <li className="flex items-center gap-2 text-sm text-accent-foreground/70">
                      <MapPin className="h-4 w-4" />
                      Mumbai, Maharashtra, India
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Desktop Links - Hidden on Mobile */}
          <div className="hidden lg:block">
            <h4 className="font-serif font-semibold mb-3 text-sm">Shop</h4>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-accent-foreground/70 hover:text-accent-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden lg:block">
            <h4 className="font-serif font-semibold mb-3 text-sm">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-accent-foreground/70 hover:text-accent-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden lg:block">
            <h4 className="font-serif font-semibold mb-3 text-sm">Company & Contact</h4>
            <ul className="space-y-2 mb-4">
              {footerLinks.company.slice(0, 3).map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-accent-foreground/70 hover:text-accent-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="space-y-2 pt-3 border-t border-accent-foreground/10">
              <li>
                <a href="mailto:support@aatmanroots.com" className="flex items-center gap-2 text-sm text-accent-foreground/70 hover:text-accent-foreground transition-colors">
                  <Mail className="h-4 w-4" />
                  support@aatmanroots.com
                </a>
              </li>
              <li>
                <a href="tel:+919876543210" className="flex items-center gap-2 text-sm text-accent-foreground/70 hover:text-accent-foreground transition-colors">
                  <Phone className="h-4 w-4" />
                  +91 98765 43210
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-accent-foreground/10">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 text-xs sm:text-sm text-accent-foreground/60">
            <p className="text-center sm:text-left">© 2024 आत्मन् Roots. Crafted with devotion.</p>
            <div className="flex gap-4 sm:gap-6">
              <Link to="/privacy" className="hover:text-accent-foreground transition-colors py-1">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-accent-foreground transition-colors py-1">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
