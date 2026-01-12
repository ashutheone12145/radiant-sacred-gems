import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { CompareProvider } from "@/contexts/CompareContext";
import { RecentlyViewedProvider } from "@/contexts/RecentlyViewedContext";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CompareBar } from "@/components/product/CompareBar";
import { BackToTop } from "@/components/ui/back-to-top";
import Index from "./pages/Index";
import ProductDetail from "./pages/ProductDetail";
import Collection from "./pages/Collection";
import Collections from "./pages/Collections";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Checkout from "./pages/Checkout";
import Search from "./pages/Search";
import Wishlist from "./pages/Wishlist";
import Compare from "./pages/Compare";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <WishlistProvider>
          <CompareProvider>
            <RecentlyViewedProvider>
              <Toaster />
              <Sonner />
              <CartDrawer />
              <CompareBar />
              <BackToTop />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/product/:slug" element={<ProductDetail />} />
                  <Route path="/collections" element={<Collections />} />
                  <Route path="/collections/:slug" element={<Collection />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/compare" element={<Compare />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </RecentlyViewedProvider>
          </CompareProvider>
        </WishlistProvider>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
