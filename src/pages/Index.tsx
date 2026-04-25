import { useState, useMemo } from 'react';
import { Product } from '@/data/products';
import { Navbar } from '@/components/Navbar';
import { ProductCard } from '@/components/ProductCard';
import { ShoppingCart } from '@/components/ShoppingCart';
import { VoiceInput } from '@/components/VoiceInput';
import { CheckoutModal } from '@/components/CheckoutModal';
import { useVoiceShopping } from '@/hooks/useVoiceShopping';
import { useOrders, OrderAddress } from '@/hooks/useOrders';
import { products, getProductsByCategory, searchProducts } from '@/data/products';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartSheetOpen, setCartSheetOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [buyNowItem, setBuyNowItem] = useState<{ product: typeof products[0]; quantity: number }[] | null>(null);
  
  const { createOrder } = useOrders();
  
  const {
    searchResults,
    cart,
    lastCommand,
    processVoiceCommand,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    setListening,
    setSearchResults
  } = useVoiceShopping();

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const displayProducts = useMemo(() => {
    if (searchResults.length > 0) {
      return searchResults;
    }
    return getProductsByCategory(selectedCategory);
  }, [searchResults, selectedCategory]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSearchResults([]);
  };

  const handleSearch = (query: string) => {
    if (query.trim()) {
      const results = searchProducts(query);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleCheckout = () => {
    setCartSheetOpen(false);
    setBuyNowItem(null);
    setCheckoutOpen(true);
  };

  const handleBuyNow = (product: Product) => {
    setBuyNowItem([{ product, quantity: 1 }]);
    setCheckoutOpen(true);
  };

  const handlePlaceOrder = (address: OrderAddress) => {
    const itemsToOrder = buyNowItem || cart;
    createOrder(itemsToOrder, address);
    if (!buyNowItem) {
      clearCart();
    }
    setBuyNowItem(null);
    setCheckoutOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        cartItemsCount={cartItemsCount}
        onCategorySelect={handleCategorySelect}
        onSearch={handleSearch}
        onCartClick={() => setCartSheetOpen(true)}
        selectedCategory={selectedCategory}
      />

      <main className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-[1fr_320px] gap-6">
          {/* Main Content */}
          <div className="space-y-6">
            {/* Voice Input Section */}
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <VoiceInput
                  onTranscript={processVoiceCommand}
                  onListeningChange={setListening}
                />
                
                {lastCommand && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-muted-foreground">Last command:</p>
                    <p className="font-medium text-foreground">"{lastCommand}"</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Products Section */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">
                  {searchResults.length > 0 ? 'Search Results' : 'All Products'}
                </h2>
                <Badge variant="outline" className="font-normal">
                  {displayProducts.length} products
                </Badge>
              </div>

              {displayProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {displayProducts.map((product, index) => (
                    <div 
                      key={product.id} 
                      className="slide-up"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <ProductCard
                        product={product}
                        onAddToCart={addToCart}
                        onBuyNow={handleBuyNow}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <Card className="p-12 text-center">
                  <p className="text-muted-foreground">
                    No products found. Try a different search or browse categories.
                  </p>
                </Card>
              )}
            </section>
          </div>

          {/* Desktop Cart Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <ShoppingCart
                items={cart}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={removeFromCart}
                onClearCart={clearCart}
                onCheckout={handleCheckout}
              />
            </div>
          </aside>
        </div>
      </main>

      {/* Mobile Cart Sheet */}
      <Sheet open={cartSheetOpen} onOpenChange={setCartSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md p-0">
          <SheetHeader className="p-4 border-b">
            <SheetTitle>Shopping Cart</SheetTitle>
          </SheetHeader>
          <div className="p-4">
            <ShoppingCart
              items={cart}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeFromCart}
              onClearCart={clearCart}
              onCheckout={handleCheckout}
            />
          </div>
        </SheetContent>
      </Sheet>

      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => {
          setCheckoutOpen(false);
          setBuyNowItem(null);
        }}
        items={buyNowItem || cart}
        onPlaceOrder={handlePlaceOrder}
      />
    </div>
  );
};

export default Index;
