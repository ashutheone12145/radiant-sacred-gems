import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { PageTransition } from "./PageTransition";
import Index from "@/pages/Index";
import ProductDetail from "@/pages/ProductDetail";
import Collection from "@/pages/Collection";
import Collections from "@/pages/Collections";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import FAQ from "@/pages/FAQ";
import Checkout from "@/pages/Checkout";
import Search from "@/pages/Search";
import Wishlist from "@/pages/Wishlist";
import Compare from "@/pages/Compare";
import Shipping from "@/pages/Shipping";
import Returns from "@/pages/Returns";
import TrackOrder from "@/pages/TrackOrder";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import Story from "@/pages/Story";
import GiftCards from "@/pages/GiftCards";
import Blog from "@/pages/Blog";
import Reviews from "@/pages/Reviews";
import Wholesale from "@/pages/Wholesale";
import NotFound from "@/pages/NotFound";

export const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Index />
            </PageTransition>
          }
        />
        <Route
          path="/product/:slug"
          element={
            <PageTransition>
              <ProductDetail />
            </PageTransition>
          }
        />
        <Route
          path="/collections"
          element={
            <PageTransition>
              <Collections />
            </PageTransition>
          }
        />
        <Route
          path="/collections/:slug"
          element={
            <PageTransition>
              <Collection />
            </PageTransition>
          }
        />
        <Route
          path="/about"
          element={
            <PageTransition>
              <About />
            </PageTransition>
          }
        />
        <Route
          path="/contact"
          element={
            <PageTransition>
              <Contact />
            </PageTransition>
          }
        />
        <Route
          path="/faq"
          element={
            <PageTransition>
              <FAQ />
            </PageTransition>
          }
        />
        <Route
          path="/checkout"
          element={
            <PageTransition>
              <Checkout />
            </PageTransition>
          }
        />
        <Route
          path="/search"
          element={
            <PageTransition>
              <Search />
            </PageTransition>
          }
        />
        <Route
          path="/wishlist"
          element={
            <PageTransition>
              <Wishlist />
            </PageTransition>
          }
        />
        <Route
          path="/compare"
          element={
            <PageTransition>
              <Compare />
            </PageTransition>
          }
        />
        <Route path="/shipping" element={<PageTransition><Shipping /></PageTransition>} />
        <Route path="/returns" element={<PageTransition><Returns /></PageTransition>} />
        <Route path="/track-order" element={<PageTransition><TrackOrder /></PageTransition>} />
        <Route path="/privacy" element={<PageTransition><Privacy /></PageTransition>} />
        <Route path="/terms" element={<PageTransition><Terms /></PageTransition>} />
        <Route path="/story" element={<PageTransition><Story /></PageTransition>} />
        <Route path="/gift-cards" element={<PageTransition><GiftCards /></PageTransition>} />
        <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
        <Route path="/reviews" element={<PageTransition><Reviews /></PageTransition>} />
        <Route path="/wholesale" element={<PageTransition><Wholesale /></PageTransition>} />
        <Route
          path="*"
          element={
            <PageTransition>
              <NotFound />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};
