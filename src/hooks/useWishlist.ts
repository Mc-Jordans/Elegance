import { useState, useEffect } from 'react';
import { useWishlistStore } from '../stores/wishlistStore';
import { toast } from 'react-hot-toast';
import { Product } from '../types';

export const useWishlist = () => {
  const { items, addItem, removeItem, clearWishlist, isInWishlist } = useWishlistStore();
  
  // Add item to wishlist with toast notification
  const addToWishlist = (product: Product) => {
    addItem(product);
    
    toast.success(`Added ${product.name} to wishlist`, {
      id: `wishlist-${product.id}`,
      duration: 2000
    });
  };
  
  // Remove item from wishlist with toast notification
  const removeFromWishlist = (productId: string, productName: string) => {
    removeItem(productId);
    
    toast.success(`Removed ${productName} from wishlist`, {
      id: `remove-wishlist-${productId}`,
      duration: 2000
    });
  };
  
  return {
    wishlistItems: items,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist,
    wishlistCount: items.length
  };
};