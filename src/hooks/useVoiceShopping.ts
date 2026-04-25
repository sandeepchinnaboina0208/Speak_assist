import { useState, useCallback } from 'react';
import { Product, searchProducts, formatPrice } from '@/data/products';
import { useToast } from '@/hooks/use-toast';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface VoiceShoppingState {
  isListening: boolean;
  searchResults: Product[];
  cart: CartItem[];
  lastCommand: string;
}

// Parse price from voice command
const parsePriceFromCommand = (command: string): { maxPrice?: number; minPrice?: number; cleanedTerm: string } => {
  let maxPrice: number | undefined;
  let minPrice: number | undefined;
  let cleanedTerm = command;

  // Match patterns like "under 5000", "below 10000 rupees", "less than 50000"
  const underMatch = command.match(/(?:under|below|less than|upto|up to|within)\s*(?:rs\.?|₹|rupees?)?\s*(\d+(?:,\d+)*(?:\.\d+)?)\s*(?:rs\.?|₹|rupees?)?/i);
  if (underMatch) {
    maxPrice = parseFloat(underMatch[1].replace(/,/g, ''));
    cleanedTerm = command.replace(underMatch[0], '').trim();
  }

  // Match patterns like "above 1000", "over 5000 rupees", "more than 2000"
  const overMatch = command.match(/(?:above|over|more than|starting from|from)\s*(?:rs\.?|₹|rupees?)?\s*(\d+(?:,\d+)*(?:\.\d+)?)\s*(?:rs\.?|₹|rupees?)?/i);
  if (overMatch) {
    minPrice = parseFloat(overMatch[1].replace(/,/g, ''));
    cleanedTerm = cleanedTerm.replace(overMatch[0], '').trim();
  }

  // Match patterns like "between 1000 and 5000"
  const betweenMatch = command.match(/between\s*(?:rs\.?|₹|rupees?)?\s*(\d+(?:,\d+)*)\s*(?:rs\.?|₹|rupees?)?\s*(?:and|to|-)\s*(?:rs\.?|₹|rupees?)?\s*(\d+(?:,\d+)*)\s*(?:rs\.?|₹|rupees?)?/i);
  if (betweenMatch) {
    minPrice = parseFloat(betweenMatch[1].replace(/,/g, ''));
    maxPrice = parseFloat(betweenMatch[2].replace(/,/g, ''));
    cleanedTerm = command.replace(betweenMatch[0], '').trim();
  }

  // Clean up extra spaces and common words
  cleanedTerm = cleanedTerm
    .replace(/\s+/g, ' ')
    .replace(/^\s*(me|some|a|an|the)\s+/i, '')
    .trim();

  return { maxPrice, minPrice, cleanedTerm };
};

export const useVoiceShopping = () => {
  const [state, setState] = useState<VoiceShoppingState>({
    isListening: false,
    searchResults: [],
    cart: [],
    lastCommand: ''
  });
  
  const { toast } = useToast();

  const speak = useCallback((text: string) => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      speechSynthesis.speak(utterance);
    }
  }, []);

  const processVoiceCommand = useCallback((transcript: string) => {
    const command = transcript.toLowerCase().trim();
    setState(prev => ({ ...prev, lastCommand: transcript }));

    // Search commands
    if (command.includes('find') || command.includes('search') || command.includes('show')) {
      const searchMatch = command.match(/(?:find|search|show)(?:\s+me)?\s+(.+)/);
      if (searchMatch) {
        const rawSearchTerm = searchMatch[1];
        const { maxPrice, minPrice, cleanedTerm } = parsePriceFromCommand(rawSearchTerm);
        
        const results = searchProducts(cleanedTerm, { maxPrice, minPrice });
        
        setState(prev => ({ ...prev, searchResults: results }));
        
        if (results.length > 0) {
          let priceInfo = '';
          if (maxPrice && minPrice) {
            priceInfo = ` between ${formatPrice(minPrice)} and ${formatPrice(maxPrice)}`;
          } else if (maxPrice) {
            priceInfo = ` under ${formatPrice(maxPrice)}`;
          } else if (minPrice) {
            priceInfo = ` above ${formatPrice(minPrice)}`;
          }
          
          const searchDescription = cleanedTerm ? `"${cleanedTerm}"${priceInfo}` : `products${priceInfo}`;
          speak(`Found ${results.length} products matching ${searchDescription}. Here are your options.`);
          toast({
            title: "Products Found",
            description: `Found ${results.length} products${priceInfo}`
          });
        } else {
          speak(`Sorry, I couldn't find any products matching your criteria. Try a different search or price range.`);
          toast({
            title: "No Results",
            description: "No products found matching your criteria",
            variant: "destructive"
          });
        }
      }
    }
    // Add to cart commands
    else if (command.includes('add') && (command.includes('cart') || command.includes('basket'))) {
      const addMatch = command.match(/add\s+(.+?)\s+to\s+(?:my\s+)?(?:cart|basket)/);
      if (addMatch) {
        const productName = addMatch[1];
        const matchingProducts = searchProducts(productName);
        
        if (matchingProducts.length > 0) {
          const product = matchingProducts[0];
          addToCart(product);
        } else {
          speak(`Sorry, I couldn't find "${productName}" to add to your cart.`);
          toast({
            title: "Product Not Found",
            description: `Couldn't find "${productName}"`,
            variant: "destructive"
          });
        }
      }
    }
    // Cart commands
    else if (command.includes('cart') || command.includes('basket')) {
      if (command.includes('show') || command.includes('view') || command.includes('check') || command.includes('what')) {
        const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = state.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
        
        if (totalItems > 0) {
          speak(`You have ${totalItems} items in your cart totaling ${formatPrice(totalPrice)}.`);
          toast({
            title: "Cart Summary",
            description: `${totalItems} items - ${formatPrice(totalPrice)}`
          });
        } else {
          speak("Your cart is empty.");
          toast({
            title: "Empty Cart",
            description: "Your cart is currently empty"
          });
        }
      } else if (command.includes('clear') || command.includes('empty') || command.includes('remove all')) {
        clearCart();
      }
    }
    // Help commands
    else if (command.includes('help') || command.includes('what can') || command.includes('how to')) {
      const helpText = "You can say: Find phones under 50000 rupees, Add iPhone to cart, Show my cart, or Clear cart.";
      speak(helpText);
      toast({
        title: "Voice Commands",
        description: helpText
      });
    }
    // Greeting
    else if (command.includes('hello') || command.includes('hi') || command.includes('hey')) {
      speak("Hello! I'm your voice shopping assistant. You can ask me to find products with price filters, like 'find headphones under 5000 rupees'. What would you like to search for?");
      toast({
        title: "Welcome!",
        description: "Voice shopping assistant ready to help"
      });
    }
    else {
      speak("I didn't understand that command. Try saying 'find shoes under 10000 rupees' or 'add headphones to cart'.");
      toast({
        title: "Command Not Recognized",
        description: "Try: 'find phones under 50000'",
        variant: "destructive"
      });
    }
  }, [state.cart, speak, toast]);

  const addToCart = useCallback((product: Product) => {
    setState(prev => {
      const existingItem = prev.cart.find(item => item.product.id === product.id);
      
      if (existingItem) {
        const updatedCart = prev.cart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return { ...prev, cart: updatedCart };
      } else {
        return { ...prev, cart: [...prev.cart, { product, quantity: 1 }] };
      }
    });
    
    speak(`Added ${product.name} to your cart.`);
    toast({
      title: "Added to Cart",
      description: product.name
    });
  }, [speak, toast]);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setState(prev => {
      if (quantity === 0) {
        return { ...prev, cart: prev.cart.filter(item => item.product.id !== productId) };
      }
      
      const updatedCart = prev.cart.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      );
      return { ...prev, cart: updatedCart };
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setState(prev => ({
      ...prev,
      cart: prev.cart.filter(item => item.product.id !== productId)
    }));
    
    toast({
      title: "Removed from Cart",
      description: "Item removed successfully"
    });
  }, [toast]);

  const clearCart = useCallback(() => {
    setState(prev => ({ ...prev, cart: [] }));
    speak("Cart cleared successfully.");
    toast({
      title: "Cart Cleared",
      description: "All items removed from cart"
    });
  }, [speak, toast]);

  const setListening = useCallback((listening: boolean) => {
    setState(prev => ({ ...prev, isListening: listening }));
  }, []);

  const setSearchResults = useCallback((results: Product[]) => {
    setState(prev => ({ ...prev, searchResults: results }));
  }, []);

  return {
    ...state,
    processVoiceCommand,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    setListening,
    setSearchResults
  };
};
