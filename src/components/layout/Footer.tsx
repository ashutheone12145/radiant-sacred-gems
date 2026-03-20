import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

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
    <footer className="bg-foreground text-background pb-mobile-nav">
      {/* Newsletter */}
      <div className="border-b border-background/10">
        <div className="container mx-auto px-4 py-10 sm:py-14">
          <div className="max-w-xl mx-auto text-center">
            <p className="text-primary font-medium tracking-[0.15em] uppercase text-xs mb-3">
              Stay Connected
            </p>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold mb-3 text-background">
              Join the आत्मन् Roots Family
            </h3>
            <p className="text-background/60 text-sm sm:text-base mb-6">
              Receive blessings, exclusive offers, and sacred inspiration for your spiritual journey.
            </p>
            <form className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-background/10 border border-background/15 rounded-sm text-background placeholder:text-background/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 text-sm transition-colors"
              />
              <button type="submit" className="btn-premium whitespace-nowrap text-sm py-3 px-8">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="text-center lg:text-left">
            <Link to="/" className="inline-block mb-3">
              <span className="font-serif text-xl font-semibold text-primary tracking-tight">
                आत्मन् Roots
              </span>
            </Link>
            <p className="text-background/50 text-sm mb-1 max-w-xs mx-auto lg:mx-0">
              Rooted in Tradition, Radiant in Spirit
            </p>
            <p className="text-background/35 text-xs max-w-xs mx-auto lg:mx-0 mb-5">
              Handcrafted divine LED décor that transforms your home into a sacred sanctuary.
            </p>
            <div className="flex gap-3 justify-center lg:justify-start">
              {[Instagram, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full border border-background/15 flex items-center justify-center text-background/50 hover:text-primary hover:border-primary/40 transition-all duration-200"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Mobile Accordion */}
          <div className="lg:hidden col-span-1">
            <Accordion type="multiple" className="w-full">
              {[
                { key: 'shop', title: 'Shop', links: footerLinks.shop },
                { key: 'support', title: 'Support', links: footerLinks.support },
                { key: 'company', title: 'Company', links: footerLinks.company },
              ].map(({ key, title, links }) => (
                <AccordionItem key={key} value={key} className="border-background/10">
                  <AccordionTrigger className="text-sm font-serif font-semibold hover:no-underline py-3 text-background/80">
                    {title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 pb-2">
                      {links.map((link) => (
                        <li key={link.name}>
                          <Link to={link.href} className="text-sm text-background/50 hover:text-primary transition-colors">
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}

              <AccordionItem value="contact" className="border-background/10">
                <AccordionTrigger className="text-sm font-serif font-semibold hover:no-underline py-3 text-background/80">
                  Contact
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2.5 pb-2">
                    <li>
                      <a href="mailto:support@aatmanroots.com" className="flex items-center gap-2 text-sm text-background/50 hover:text-primary transition-colors">
                        <Mail className="h-3.5 w-3.5" /> support@aatmanroots.com
                      </a>
                    </li>
                    <li>
                      <a href="tel:+919876543210" className="flex items-center gap-2 text-sm text-background/50 hover:text-primary transition-colors">
                        <Phone className="h-3.5 w-3.5" /> +91 98765 43210
                      </a>
                    </li>
                    <li className="flex items-center gap-2 text-sm text-background/50">
                      <MapPin className="h-3.5 w-3.5" /> Mumbai, Maharashtra, India
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Desktop Links */}
          {[
            { title: 'Shop', links: footerLinks.shop },
            { title: 'Support', links: footerLinks.support },
          ].map(({ title, links }) => (
            <div key={title} className="hidden lg:block">
              <h4 className="font-serif font-semibold mb-4 text-background/80 tracking-wide uppercase text-xs">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link to={link.href} className="text-sm text-background/50 hover:text-primary transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="hidden lg:block">
            <h4 className="font-serif font-semibold mb-4 text-background/80 tracking-wide uppercase text-xs">
              Company & Contact
            </h4>
            <ul className="space-y-2.5 mb-5">
              {footerLinks.company.slice(0, 3).map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-background/50 hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="space-y-2.5 pt-4 border-t border-background/10">
              <li>
                <a href="mailto:support@aatmanroots.com" className="flex items-center gap-2 text-sm text-background/50 hover:text-primary transition-colors">
                  <Mail className="h-3.5 w-3.5" /> support@aatmanroots.com
                </a>
              </li>
              <li>
                <a href="tel:+919876543210" className="flex items-center gap-2 text-sm text-background/50 hover:text-primary transition-colors">
                  <Phone className="h-3.5 w-3.5" /> +91 98765 43210
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-5 sm:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-background/40">
            <p>© 2024 आत्मन् Roots. Crafted with devotion ✨</p>
            <div className="flex gap-5">
              <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
