import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { CompareProvider } from "@/contexts/CompareContext";
import { RecentlyViewedProvider } from "@/contexts/RecentlyViewedContext";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CompareBar } from "@/components/product/CompareBar";
import { BackToTop } from "@/components/ui/back-to-top";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { AnimatedRoutes } from "@/components/layout/AnimatedRoutes";
import { ScrollToTop } from "@/components/layout/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <BrowserRouter>
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
                  <MobileBottomNav />
                  <ScrollToTop />
                  <AnimatedRoutes />
                </RecentlyViewedProvider>
              </CompareProvider>
            </WishlistProvider>
          </CartProvider>
        </TooltipProvider>
      </BrowserRouter>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
