import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart as ShoppingCartIcon, Plus, Minus, Trash2 } from 'lucide-react';
import { CartItem } from '@/hooks/useVoiceShopping';
import { formatPrice } from '@/data/products';

interface ShoppingCartProps {
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onCheckout?: () => void;
}

export const ShoppingCart = ({ items, onUpdateQuantity, onRemoveItem, onClearCart, onCheckout }: ShoppingCartProps) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  if (items.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-14 h-14 rounded-full bg-muted flex items-center justify-center mb-3">
            <ShoppingCartIcon className="h-7 w-7 text-muted-foreground" />
          </div>
          <CardTitle className="text-lg">Your cart is empty</CardTitle>
        </CardHeader>
        <CardContent className="text-center pb-6">
          <p className="text-muted-foreground text-sm">
            Start shopping by saying "Find me..." or clicking on products!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div className="flex items-center gap-2">
          <ShoppingCartIcon className="h-5 w-5" />
          <CardTitle className="text-lg">Cart</CardTitle>
          <Badge variant="secondary" className="rounded-full">{totalItems}</Badge>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearCart}
          className="text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-3 max-h-72 overflow-y-auto">
          {items.map((item) => (
            <div key={item.product.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-14 h-14 object-cover rounded-md"
              />
              
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm line-clamp-1">{item.product.name}</p>
                <p className="text-sm font-semibold text-primary">
                  {formatPrice(item.product.price)}
                </p>
              </div>
              
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-muted-foreground hover:text-destructive"
                onClick={() => onRemoveItem(item.product.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        
        <div className="pt-4 border-t space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Total</span>
            <span className="text-xl font-bold">{formatPrice(totalPrice)}</span>
          </div>
          
          <Button className="w-full" size="lg" onClick={onCheckout}>
            Checkout
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
