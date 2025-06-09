import { useCartStore } from '../stores/cartStore';
import { toast } from 'react-hot-toast';
import { MenuItem, OrderItem } from '../types';

// Add item to cart with toast notification
export const addItemToCart = (item: MenuItem, quantity: number, specialInstructions?: string) => {
  const { addItem } = useCartStore.getState();
  
  const product = {
    id: item.id,
    name: item.name,
    description: item.description,
    price: item.price,
    image: item.image || item.image_url,
    category: item.category,
    quantity: quantity
  };
  
  addItem(product, quantity);
  
  // Show toast notification
  toast.success(`Added ${item.name} to cart`, {
    id: `cart-${item.id}`, // Use ID to prevent duplicate toasts
    duration: 2000
  });
};

// Convert menu item to order item
export const convertToOrderItem = (item: MenuItem, quantity: number, specialInstructions?: string): OrderItem => {
  return {
    id: item.id,
    name: item.name,
    description: item.description,
    price: item.price,
    image: item.image || item.image_url,
    category: item.category,
    quantity: quantity,
    specialInstructions: specialInstructions
  };
};