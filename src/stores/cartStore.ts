import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from '../types';

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  saveForLater: (productId: string) => void;
  moveToCart: (productId: string) => void;
  savedItems: CartItem[];
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      savedItems: [],
      
      addItem: (product, quantity) => set((state) => {
        const existingItem = state.items.find(item => item.id === product.id);
        
        if (existingItem) {
          return {
            items: state.items.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          };
        }
        
        return {
          items: [...state.items, { ...product, quantity }]
        };
      }),
      
      removeItem: (productId) => set((state) => ({
        items: state.items.filter(item => item.id !== productId)
      })),
      
      updateQuantity: (productId, quantity) => set((state) => ({
        items: state.items.map(item =>
          item.id === productId
            ? { ...item, quantity }
            : item
        )
      })),
      
      clearCart: () => set({ items: [] }),
      
      saveForLater: (productId) => set((state) => {
        const item = state.items.find(item => item.id === productId);
        if (!item) return state;
        
        return {
          items: state.items.filter(item => item.id !== productId),
          savedItems: [...state.savedItems, item]
        };
      }),
      
      moveToCart: (productId) => set((state) => {
        const item = state.savedItems.find(item => item.id === productId);
        if (!item) return state;
        
        return {
          savedItems: state.savedItems.filter(item => item.id !== productId),
          items: [...state.items, item]
        };
      })
    }),
    {
      name: 'cart-storage'
    }
  )
);