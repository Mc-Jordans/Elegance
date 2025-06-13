import { useState, useEffect } from 'react';
import { useCartStore } from '../stores/cartStore';
import { toast } from 'react-hot-toast';
import { Product } from '../types';

export const useCart = () => {
  const { items, addItem, removeItem, updateQuantity, clearCart } = useCartStore();
  const [cartTotal, setCartTotal] = useState(0);
  
  // Calculate cart total whenever items change
  useEffect(() => {
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setCartTotal(total);
  }, [items]);
  
  // Add item to cart with toast notification
  const addToCart = (product: Product, quantity: number = 1) => {
    addItem(product, quantity);
    
    // Show toast with setTimeout to prevent render phase updates
    setTimeout(() => {
      toast.success(`Added ${product.name} to cart`, {
        id: `cart-${product.id}`,
        duration: 2000
      });
    }, 0);
  };
  
  // Remove item from cart with toast notification
  const removeFromCart = (productId: string, productName: string) => {
    removeItem(productId);
    
    // Show toast with setTimeout to prevent render phase updates
    setTimeout(() => {
      toast.success(`Removed ${productName} from cart`, {
        id: `remove-${productId}`,
        duration: 2000
      });
    }, 0);
  };
  
  // Update item quantity
  const updateItemQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      const product = items.find(item => item.id === productId);
      if (product) {
        removeFromCart(productId, product.name);
      }
    } else {
      updateQuantity(productId, quantity);
    }
  };
  
  return {
    items,
    cartTotal,
    addToCart,
    removeFromCart,
    updateItemQuantity,
    clearCart,
    itemCount: items.length,
    totalItems: items.reduce((count, item) => count + item.quantity, 0)
  };
};