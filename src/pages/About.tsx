import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, Heart, Leaf, Users } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const values = [
  {
    icon: Sparkles,
    title: "Divine Craftsmanship",
    description:
      "Each lamp is meticulously crafted using premium K9 optical crystal, ensuring exceptional clarity and light refraction that brings the divine imagery to life.",
  },
  {
    icon: Heart,
    title: "Spiritual Connection",
    description:
      "We believe in creating more than products – we craft sacred objects that help deepen your spiritual practice and bring blessings into your home.",
  },
  {
    icon: Leaf,
    title: "Sustainable Practices",
    description:
      "From energy-efficient LED technology to eco-friendly packaging, we're committed to honoring both tradition and our planet.",
  },
  {
    icon: Users,
    title: "Community First",
    description:
      "We support local artisans and give back to communities through partnerships with organizations preserving traditional arts and crafts.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Breadcrumb */}
        <div className="container py-8">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>About Us</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cream via-background to-sand/30" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
          
          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Illuminating Faith, <br />
                <span className="text-gradient-gold">Inspiring Devotion</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                We blend ancient spiritual traditions with modern artistry to create 
                crystal lamps that transform your sacred spaces into sanctuaries of 
                peace and divine light.
              </p>
            </motion.div>
          </div>
        </section>
        
        {/* Our Story */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Our Story
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    आत्मन् Roots was born from a simple observation: while our homes have 
                    evolved with modern technology, our spiritual spaces often remained 
                    unchanged. We saw an opportunity to bridge this gap – to honor 
                    timeless traditions while embracing contemporary design.
                  </p>
                  <p>
                    Our journey began in 2020, when our founder visited a traditional 
                    crystal workshop and witnessed the mesmerizing way light danced 
                    through precision-cut crystal. That moment of inspiration led to 
                    a vision: what if we could combine this optical brilliance with 
                    sacred Hindu imagery?
                  </p>
                  <p>
                    Today, we partner with skilled artisans who share our passion for 
                    quality and devotion. Each lamp undergoes a meticulous creation 
                    process, from 3D laser engraving of divine forms to the careful 
                    selection of LED lighting that brings each deity to life.
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative aspect-square max-w-md mx-auto"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl" />
                <div className="absolute inset-8 bg-cream rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                      <Sparkles className="h-12 w-12 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground">Crafted with devotion since 2020</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Our Values */}
        <section className="py-16 md:py-24 bg-cream/30">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Values
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Everything we create is guided by principles that honor both tradition 
                and innovation.
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-2xl p-6 md:p-8 border border-border/50"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Craftsmanship */}
        <section className="py-16 md:py-24">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
                The Art of Crystal Illumination
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Our lamps are made from K9 optical crystal – the same material used in 
                premium camera lenses and scientific instruments. This ensures 
                exceptional clarity and light transmission, allowing the laser-engraved 
                divine imagery to appear almost ethereal when illuminated.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Each deity is rendered through a precise 3D laser engraving process, 
                creating thousands of tiny points within the crystal that scatter light 
                in breathtaking ways. The result is a lamp that's a simple decoration 
                by day and a glowing sanctuary by night.
              </p>
            </motion.div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="py-16 md:py-24 bg-cream/30">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto text-center"
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                Experience Divine Illumination
              </h2>
              <p className="text-muted-foreground mb-8">
                Explore our collection and find the perfect lamp to enhance your 
                spiritual practice.
              </p>
              <Link
                to="/collections"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                Shop Collections
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
