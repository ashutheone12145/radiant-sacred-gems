import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, ExternalLink, Loader2 } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

export function CartDrawer() {
  const items = useCartStore(state => state.items);
  const isOpen = useCartStore(state => state.isOpen);
  const isLoading = useCartStore(state => state.isLoading);
  const isSyncing = useCartStore(state => state.isSyncing);
  const closeCart = useCartStore(state => state.closeCart);
  const removeItem = useCartStore(state => state.removeItem);
  const updateQuantity = useCartStore(state => state.updateQuantity);
  const getCheckoutUrl = useCartStore(state => state.getCheckoutUrl);
  const syncCart = useCartStore(state => state.syncCart);
  const subtotal = useCartStore(state => state.subtotal);
  const itemCount = useCartStore(state => state.itemCount);

  // Sync cart with Shopify when drawer opens
  useEffect(() => { 
    if (isOpen) syncCart(); 
  }, [isOpen, syncCart]);

  const formatPrice = (amount: number, currencyCode = 'INR') => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currencyCode,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleCheckout = () => {
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) {
      window.open(checkoutUrl, '_blank');
      closeCart();
    }
  };

  const total = subtotal();
  const count = itemCount();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/30 backdrop-blur-sm z-50"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-background shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h2 className="text-xl font-serif font-semibold flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-primary" />
                Your Cart {count > 0 && `(${count})`}
              </h2>
              <Button variant="ghost" size="icon" onClick={closeCart}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="h-16 w-16 text-muted-foreground/30 mb-4" />
                  <p className="text-lg font-serif text-muted-foreground">Your cart is empty</p>
                  <p className="text-sm text-muted-foreground/70 mt-1">Add divine lamps to illuminate your space</p>
                  <Button onClick={closeCart} className="mt-6 btn-premium">
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <motion.div
                      key={item.variantId}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="flex gap-4 pb-6 border-b border-border"
                    >
                      {/* Product Image */}
                      <div className="w-24 h-24 bg-secondary rounded-lg overflow-hidden flex-shrink-0">
                        {item.product.node.images?.edges?.[0]?.node && (
                          <img
                            src={item.product.node.images.edges[0].node.url}
                            alt={item.product.node.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif font-medium text-sm line-clamp-2">
                          {item.product.node.title}
                        </h3>
                        {item.variantTitle !== 'Default Title' && (
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {item.selectedOptions.map(o => o.value).join(' • ')}
                          </p>
                        )}
                        <p className="text-primary font-semibold mt-1">
                          {formatPrice(parseFloat(item.price.amount), item.price.currencyCode)}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3 mt-3">
                          <div className="flex items-center border border-border rounded-sm">
                            <button
                              onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                              disabled={isLoading}
                              className="p-1.5 hover:bg-secondary transition-colors disabled:opacity-50"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="px-3 text-sm font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                              disabled={isLoading}
                              className="p-1.5 hover:bg-secondary transition-colors disabled:opacity-50"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.variantId)}
                            disabled={isLoading}
                            className="p-1.5 text-muted-foreground hover:text-destructive transition-colors ml-auto disabled:opacity-50"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border px-6 py-6 bg-secondary/30">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-xl font-serif font-semibold">
                    {formatPrice(total, items[0]?.price.currencyCode)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-4">
                  Shipping and taxes calculated at checkout
                </p>
                <Button 
                  onClick={handleCheckout} 
                  className="w-full btn-premium py-6"
                  disabled={items.length === 0 || isLoading || isSyncing}
                >
                  {isLoading || isSyncing ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Checkout with Shopify
                    </>
                  )}
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
