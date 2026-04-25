import { useState, useEffect, useCallback } from 'react';
import { CartItem } from '@/hooks/useVoiceShopping';

export interface OrderAddress {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  address: OrderAddress;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  createdAt: string;
}

const ORDERS_STORAGE_KEY = 'voiceshop_orders';

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (stored) {
      setOrders(JSON.parse(stored));
    }
  }, []);

  const saveOrders = useCallback((newOrders: Order[]) => {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(newOrders));
    setOrders(newOrders);
  }, []);

  const createOrder = useCallback((items: CartItem[], address: OrderAddress): Order => {
    const totalAmount = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    
    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      items,
      address,
      totalAmount,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    const updatedOrders = [newOrder, ...orders];
    saveOrders(updatedOrders);
    
    return newOrder;
  }, [orders, saveOrders]);

  return {
    orders,
    createOrder
  };
};
