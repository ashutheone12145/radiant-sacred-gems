import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import ganeshaImg from '@assets/Gemini_Generated_Image_ifmulwifmulwifmu_1774192989589.png';
import lakshmImg from '@assets/Gemini_Generated_Image_lxdikelxdikelxdi_1774192989587.png';
import krishnaImg from '@assets/generated_image_cc67c238-aeed-4a7e-9025-9628be15ae5e_1774192989590.png';

const upcomingPosts = [
  {
    title: 'The Spiritual Significance of Lord Ganesha in Your Home',
    category: 'Spirituality',
    image: ganeshaImg,
    excerpt: 'Discover why placing Ganesha at the entrance of your home is one of the most powerful spiritual practices in Hindu tradition, and how a crystal lamp elevates this energy.',
    readTime: '5 min read',
  },
  {
    title: 'How to Create a Sacred Pooja Room: A Complete Guide',
    category: 'Home Decor',
    image: lakshmImg,
    excerpt: 'From choosing the right direction to selecting divine décor that enhances spiritual energy — everything you need to design a beautiful, vibrant pooja room.',
    readTime: '8 min read',
  },
  {
    title: 'Radha Krishna: The Divine Union of Love and Devotion',
    category: 'Mythology',
    image: krishnaImg,
    excerpt: 'Explore the timeless love story of Radha and Krishna and why their imagery in your home is believed to bring harmony, love, and spiritual bliss.',
    readTime: '6 min read',
  },
];

const Blog = () => {
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
              <BreadcrumbPage>Blog</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-10">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">Sacred Insights</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Stories, guides, and spiritual wisdom from the आत्मन् Roots team. Our blog is coming soon.
          </p>
        </motion.div>

        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-center mb-10">
          <p className="text-sm text-muted-foreground mb-3">Be the first to read our articles on spirituality, home décor, and sacred art.</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-2.5 rounded-full border border-border bg-background text-sm focus:outline-none focus:border-primary"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors whitespace-nowrap"
            >
              Notify Me
            </button>
          </form>
        </div>

        <h2 className="font-serif text-xl font-bold text-foreground mb-6">Coming Soon</h2>
        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {upcomingPosts.map((post, i) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-xl overflow-hidden"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-primary font-medium">{post.category}</span>
                  <span className="text-xs text-muted-foreground">{post.readTime}</span>
                </div>
                <h3 className="font-serif font-bold text-foreground text-sm mb-2 line-clamp-2">{post.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">{post.excerpt}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center border-t border-border pt-8">
          <p className="text-muted-foreground text-sm mb-4">Explore our divine products while you wait</p>
          <Link to="/collections" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors">
            Shop All Collections <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
