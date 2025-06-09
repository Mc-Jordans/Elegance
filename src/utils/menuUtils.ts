import { MenuItem } from '../types';
import { useCartStore } from '../stores/cartStore';
import { toast } from 'react-hot-toast';

// Add menu item to cart
export const addMenuItemToCart = (item: any, quantity: number = 1) => {
  const { addItem } = useCartStore.getState();
  
  // Convert menu item to cart item format
  const cartItem = {
    id: item.id,
    name: item.name,
    description: item.description,
    price: item.price,
    image: item.image_url || item.image,
    category: item.category,
    stock: 999, // Default high stock
    rating: 5, // Default rating
    reviews: 0, // Default reviews
  };
  
  // Add to cart
  addItem(cartItem, quantity);
  
  // Show toast notification with unique ID to prevent duplicates
  toast.success(`Added ${item.name} to cart`, {
    id: `cart-${item.id}`,
    duration: 2000
  });
};

// Format menu item from database to MenuItem type
export const formatMenuItem = (item: any): MenuItem => {
  return {
    id: item.id,
    name: item.name,
    description: item.description,
    price: item.price,
    image: item.image_url,
    category: item.category,
    dietary: item.dietary_info || [],
    featured: item.featured || false,
    is_available: item.is_available
  };
};