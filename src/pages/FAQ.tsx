import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const faqCategories = [
  {
    name: "Ordering & Shipping",
    questions: [
      {
        question: "How long does shipping take?",
        answer:
          "Standard shipping typically takes 5-7 business days within India. Express shipping (2-3 business days) is available at checkout for an additional fee. We ship to all major cities and towns across India.",
      },
      {
        question: "Do you offer free shipping?",
        answer:
          "Yes! We offer free standard shipping on all orders over ₹999. Orders below this amount have a flat shipping fee of ₹99.",
      },
      {
        question: "Can I track my order?",
        answer:
          "Absolutely! Once your order ships, you'll receive an email with a tracking number and link. You can also track your order status in your account dashboard.",
      },
      {
        question: "Do you ship internationally?",
        answer:
          "Currently, we only ship within India. We're working on expanding to international shipping soon. Sign up for our newsletter to be notified when we launch international delivery.",
      },
    ],
  },
  {
    name: "Product Information",
    questions: [
      {
        question: "What is K9 crystal?",
        answer:
          "K9 crystal is a high-quality optical glass known for its exceptional clarity and light refraction properties. It's the same material used in premium camera lenses and scientific instruments. Our lamps use K9 crystal for brilliant, clear illumination.",
      },
      {
        question: "How does the LED base work?",
        answer:
          "Our LED bases are USB-powered for convenience. Simply connect the included USB cable to any USB port, power bank, or wall adapter. The base has a touch-sensitive button to cycle through colors and turn the light on/off.",
      },
      {
        question: "What LED colors are available?",
        answer:
          "Most of our lamps come with multi-color LED bases offering warm white (2700K), cool white (6500K), and a 7-color RGB mode. The RGB mode can display static colors or smoothly cycle through all colors.",
      },
      {
        question: "How do I clean my crystal lamp?",
        answer:
          "Use a soft, lint-free microfiber cloth to gently wipe the crystal. For deeper cleaning, slightly dampen the cloth with distilled water. Never use harsh chemicals, abrasive materials, or submerge the lamp in water.",
      },
      {
        question: "How long do the LEDs last?",
        answer:
          "Our premium LED bases are rated for 50,000+ hours of use. With typical usage of 4-6 hours per day, that's over 20 years of beautiful illumination!",
      },
    ],
  },
  {
    name: "Returns & Refunds",
    questions: [
      {
        question: "What is your return policy?",
        answer:
          "We offer a 30-day return policy for unused items in their original packaging. If you're not satisfied with your purchase, simply contact us to initiate a return. We'll provide a prepaid return label.",
      },
      {
        question: "What if my product arrives damaged?",
        answer:
          "We carefully package all orders, but if your product arrives damaged, please contact us within 48 hours with photos of the damage. We'll send a replacement immediately at no additional cost.",
      },
      {
        question: "How long do refunds take?",
        answer:
          "Once we receive your return, refunds are processed within 5-7 business days. The amount will be credited to your original payment method. Bank processing times may vary.",
      },
    ],
  },
  {
    name: "Gifting",
    questions: [
      {
        question: "Can I add a gift message?",
        answer:
          "Yes! During checkout, you can add a personalized gift message that will be printed on an elegant card and included with the order. This is a free service for all orders.",
      },
      {
        question: "Do you offer gift wrapping?",
        answer:
          "All our products come in premium packaging suitable for gifting. The beautiful box design means no additional wrapping is needed – it's ready to gift right out of the box!",
      },
      {
        question: "Can I send a gift directly to someone else?",
        answer:
          "Absolutely! During checkout, simply enter the recipient's address as the shipping address. Don't forget to add a gift message! We won't include any pricing information in the package.",
      },
    ],
  },
];

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = faqCategories
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>FAQ</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Find answers to common questions about our products, shipping, returns, 
            and more. Can't find what you're looking for? Contact us!
          </p>
          
          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </motion.div>
        
        {/* FAQ Categories */}
        <div className="max-w-3xl mx-auto space-y-8">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1 }}
              >
                <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
                  {category.name}
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((item, index) => (
                    <AccordionItem key={index} value={`${category.name}-${index}`}>
                      <AccordionTrigger className="text-left text-foreground hover:text-primary">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No questions found matching "{searchQuery}"
              </p>
            </div>
          )}
        </div>
        
        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center mt-16 p-8 bg-cream/50 rounded-2xl"
        >
          <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
            Still have questions?
          </h3>
          <p className="text-muted-foreground mb-4">
            Our support team is always happy to help. Reach out and we'll get back 
            to you within 24-48 hours.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            Contact Us
          </Link>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FAQ;
