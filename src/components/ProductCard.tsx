import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ShoppingCart, Star, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Product, formatPrice } from '@/data/products';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onBuyNow?: (product: Product) => void;
  className?: string;
}

export const ProductCard = ({ product, onAddToCart, onBuyNow, className }: ProductCardProps) => {
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 group",
      !product.inStock && "opacity-60",
      className
    )}>
      <div className="aspect-square relative overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {discount > 0 && (
          <div className="absolute top-3 left-3 bg-secondary text-secondary-foreground px-2.5 py-1 rounded-md text-xs font-semibold shadow-sm">
            -{discount}%
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-foreground/20 flex items-center justify-center backdrop-blur-sm">
            <span className="bg-destructive text-destructive-foreground px-4 py-2 rounded-lg text-sm font-medium">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      
      <CardContent className="p-4 space-y-3">
        <div className="space-y-1.5">
          <h3 className="font-semibold text-base line-clamp-2 leading-tight group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium ml-1">{product.rating}</span>
          </div>
          <span className="text-sm text-muted-foreground">
            ({product.reviews.toLocaleString()} reviews)
          </span>
        </div>
        
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold text-foreground">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button
          variant="outline"
          className="flex-1 gap-2"
          onClick={() => onAddToCart(product)}
          disabled={!product.inStock}
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
        <Button
          className="flex-1 gap-2"
          disabled={!product.inStock}
          onClick={() => onBuyNow?.(product)}
        >
          <Zap className="h-4 w-4" />
          Buy Now
        </Button>
      </CardFooter>
    </Card>
  );
};
