import { Home, ShoppingBag, Heart, ShoppingCart } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/collections', icon: ShoppingBag, label: 'Shop' },
  { to: '/wishlist', icon: Heart, label: 'Wishlist' },
];

export function MobileBottomNav() {
  const { itemCount, openCart } = useCart();
  const { itemCount: wishlistCount } = useWishlist();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border md:hidden safe-area-pb">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className="flex flex-col items-center justify-center flex-1 h-full text-muted-foreground transition-colors"
            activeClassName="text-primary"
          >
            {({ isActive }: { isActive: boolean }) => (
              <div className="flex flex-col items-center justify-center gap-1 relative">
                <div className={cn(
                  "p-1.5 rounded-full transition-colors",
                  isActive && "bg-primary/10"
                )}>
                  <item.icon className="h-5 w-5" />
                  {item.label === 'Wishlist' && wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-primary-foreground text-[10px] font-medium flex items-center justify-center">
                      {wishlistCount > 9 ? '9+' : wishlistCount}
                    </span>
                  )}
                </div>
                <span className={cn(
                  "text-[10px] font-medium",
                  isActive && "text-primary"
                )}>
                  {item.label}
                </span>
              </div>
            )}
          </NavLink>
        ))}
        
        {/* Cart Button */}
        <button
          onClick={openCart}
          className="flex flex-col items-center justify-center flex-1 h-full text-muted-foreground transition-colors"
        >
          <div className="flex flex-col items-center justify-center gap-1 relative">
            <div className="p-1.5 rounded-full transition-colors">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-primary-foreground text-[10px] font-medium flex items-center justify-center">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </div>
            <span className="text-[10px] font-medium">Cart</span>
          </div>
        </button>
      </div>
    </nav>
  );
}
