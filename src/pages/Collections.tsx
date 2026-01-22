import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { collections } from "@/data/products";
import { InstagramGallery } from "@/components/home/InstagramGallery";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const Collections = () => {
  return (
    <div className="min-h-screen bg-background pb-mobile-nav">
      <Header />
      
      <main>
        <div className="container px-4 py-4 sm:py-8">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-4 sm:mb-8">
            <BreadcrumbList className="text-xs sm:text-sm">
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Collections</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4">
              Our Collections
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-2">
              Discover our curated collections of sacred crystal lamps, each designed to bring 
              spiritual elegance and radiant light to your sacred spaces.
            </p>
          </motion.div>
          
          {/* Collections Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 mb-8 sm:mb-12">
            {collections.map((collection, index) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/collections/${collection.slug}`}
                  className="group relative block aspect-[3/4] sm:aspect-[4/5] overflow-hidden rounded-xl sm:rounded-2xl"
                >
                  {/* Collection image */}
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-foreground/20 to-foreground/80" />
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500" />
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-6">
                    <div className="transform transition-transform duration-300 group-hover:-translate-y-2">
                      <p className="text-primary text-[10px] sm:text-sm font-medium mb-1 sm:mb-2">
                        {collection.productCount} Products
                      </p>
                      <h2 className="font-serif text-sm sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-2 line-clamp-2">
                        {collection.name}
                      </h2>
                      <p className="text-white/80 text-[10px] sm:text-sm mb-2 sm:mb-4 line-clamp-2 hidden sm:block">
                        {collection.description}
                      </p>
                      <div className="inline-flex items-center gap-1 sm:gap-2 text-primary font-medium group-hover:gap-2 sm:group-hover:gap-3 transition-all text-xs sm:text-base">
                        Explore
                        <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Border glow on hover */}
                  <div className="absolute inset-0 rounded-xl sm:rounded-2xl border-2 border-transparent group-hover:border-primary/30 transition-colors duration-500" />
                </Link>
              </motion.div>
            ))}
          </div>
          
          {/* All Products Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <Link
              to="/collections/all"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors text-sm sm:text-base"
            >
              View All Products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
        
        {/* Instagram Gallery Section */}
        <InstagramGallery />
      </main>
      
      <Footer />
    </div>
  );
};

export default Collections;
