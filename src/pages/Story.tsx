import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import ganeshaImg from '@assets/Gemini_Generated_Image_8dzrhm8dzrhm8dzr_1774192989588.png';
import krishnaImg from '@assets/Gemini_Generated_Image_jfqzbljfqzbljfqz_1774192989585.png';

const milestones = [
  { year: '2019', title: 'The Spark', desc: 'Founder Aryan Mehta gifted his mother a handcrafted Ganesha crystal lamp for Diwali. Her tears of joy became the seed of आत्मन् Roots.' },
  { year: '2020', title: 'First Workshop', desc: 'Operating out of a small workshop in Mumbai, we hand-crafted our first 50 crystal lamps, each engraved with devotion and care.' },
  { year: '2021', title: 'Going Online', desc: 'Launched our e-commerce store. Within three months, we shipped to customers in 15 states across India.' },
  { year: '2022', title: 'LED Photo Frames', desc: 'Expanded into LED photo frames, bringing a new dimension of sacred art to Indian homes and pooja rooms.' },
  { year: '2023', title: '5,000 Families', desc: 'Reached the milestone of 5,000 happy families. Every product still crafted with the same devotion as the very first.' },
  { year: '2024', title: 'Growing Together', desc: 'Launching premium gift sets, expanding our deity collection, and continuing to bring divine light into homes across India.' },
];

const Story = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <div className="container px-4 py-8 md:py-12">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Our Story</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <section className="container px-4 max-w-4xl mx-auto pb-12 md:pb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-5">
              <Heart className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-medium text-primary tracking-wide">Crafted with Devotion Since 2019</span>
            </div>
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4">
              Rooted in Tradition,<br />
              <span className="text-gradient-gold">Radiant in Spirit</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
              आत्मन् Roots was born from a simple belief — that sacred art, crafted with love and devotion,
              can transform any home into a sanctuary of peace and divine energy.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={ganeshaImg}
                alt="Ganesha 3D Crystal Lamp"
                className="rounded-2xl shadow-xl w-full aspect-square object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">Where It All Began</h2>
              <p className="text-muted-foreground leading-relaxed">
                It started with a gift. In 2019, our founder wanted to give his mother something truly meaningful for Diwali — 
                not just another decoration, but a piece of divine art that carried spiritual energy.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                He discovered the art of 3D crystal laser engraving and hand-crafted a Ganesha lamp in a small workshop. 
                When his mother unwrapped it and saw Lord Ganesha glowing within the crystal, her eyes filled with tears.
                That moment became our purpose.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, आत्मन् Roots brings that same devotion to thousands of families across India. 
                Every crystal lamp and LED frame we create carries the same intention — to illuminate your space with divinity.
              </p>
            </motion.div>
          </div>

          <div className="mb-16">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground text-center mb-10">Our Journey</h2>
            <div className="relative">
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />
              <div className="space-y-8">
                {milestones.map((m, i) => (
                  <motion.div
                    key={m.year}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`relative flex gap-6 md:gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-start`}
                  >
                    <div className="md:w-1/2 flex gap-4 items-start pl-10 md:pl-0">
                      <div className="absolute left-0 md:left-1/2 w-8 h-8 rounded-full bg-primary flex items-center justify-center -translate-x-0 md:-translate-x-4 flex-shrink-0 z-10">
                        <Sparkles className="h-3.5 w-3.5 text-primary-foreground" />
                      </div>
                      <div className={`bg-card border border-border rounded-xl p-5 ${i % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                        <span className="text-primary font-bold text-sm">{m.year}</span>
                        <h3 className="font-serif font-bold text-foreground mt-1 mb-2">{m.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
                      </div>
                    </div>
                    <div className="hidden md:block md:w-1/2" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4 order-2 md:order-1"
            >
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">Our Commitment</h2>
              <p className="text-muted-foreground leading-relaxed">
                Every product at आत्मन् Roots is crafted with premium K9 optical crystal and state-of-the-art 3D laser 
                engraving technology. But beyond the craft, it's the intention that sets us apart.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We believe in the power of sacred imagery to create positive energy in a home. 
                That's why we partner with experienced artisans who understand not just the technical aspects 
                of crystal engraving, but also the spiritual significance of each deity.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 md:order-2"
            >
              <img
                src={krishnaImg}
                alt="Radha Krishna Crystal Lamp"
                className="rounded-2xl shadow-xl w-full aspect-square object-cover"
              />
            </motion.div>
          </div>

          <div className="text-center bg-primary/5 border border-primary/20 rounded-2xl p-8">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-3">Join Our Sacred Journey</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Bring divine light into your home. Explore our collections of 3D crystal lamps and LED photo frames.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/collections/crystal-lamps" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors">
                Explore Crystal Lamps <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/collections/led-frames" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-border text-foreground font-medium text-sm hover:bg-secondary transition-colors">
                Shop LED Frames
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Story;
