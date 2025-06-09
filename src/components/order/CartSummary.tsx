import React from 'react';
import { Trash2 } from 'lucide-react';
import { OrderItem } from '../../types';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../stores/cartStore';

interface CartSummaryProps {
  items: OrderItem[];
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({ items, onRemoveItem, onUpdateQuantity }) => {
  const navigate = useNavigate();
  const { addItem } = useCartStore();
  
  // Calculate subtotal
  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const taxRate = 0.0825; // 8.25%
  const tax = subtotal * taxRate;
  const deliveryFee = items.length > 0 ? 5.99 : 0;
  const total = subtotal + tax + deliveryFee;
  
  const handleCheckout = () => {
    // Save cart items to global cart store before navigating
    items.forEach(item => {
      addItem({
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        image: item.image,
        category: item.category,
        stock: 999, // Default value
        rating: 5, // Default value
        reviews: 0 // Default value
      }, item.quantity);
    });
    
    navigate('/checkout');
  };
  
  if (items.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="font-display text-xl text-dark mb-4">Your Cart</h3>
        <div className="text-center py-10">
          <p className="text-gray-500">Your cart is empty</p>
          <p className="text-sm text-gray-400 mt-2">Add some delicious items from our menu</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="font-display text-xl text-dark mb-4">Your Cart</h3>
      
      <div className="divide-y divide-gray-200">
        {items.map((item) => (
          <div key={item.id} className="py-4 first:pt-0">
            <div className="flex justify-between">
              <div className="flex-grow pr-4">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">
                    {item.quantity} × {item.name}
                  </span>
                  <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
                
                {item.specialInstructions && (
                  <p className="text-sm text-gray-600 italic mb-2">"{item.specialInstructions}"</p>
                )}
                
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => onUpdateQuantity(item.id, Math.max(item.quantity - 1, 1))}
                    className="p-1 text-gray-500 hover:text-gray-700" 
                    aria-label="Decrease quantity"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                    </svg>
                  </button>
                  <span className="text-sm">{item.quantity}</span>
                  <button 
                    onClick={() => onUpdateQuantity(item.id, Math.min(item.quantity + 1, 10))}
                    className="p-1 text-gray-500 hover:text-gray-700"
                    aria-label="Increase quantity"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12M6 12h12" />
                    </svg>
                  </button>
                  <button 
                    onClick={() => onRemoveItem(item.id)}
                    className="p-1 text-red-500 hover:text-red-700 ml-2"
                    aria-label="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Order Summary */}
      <div className="border-t border-gray-200 pt-4 mt-4">
        <div className="flex justify-between py-2">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between py-2">
          <span className="text-gray-600">Tax ({(taxRate * 100).toFixed(2)}%)</span>
          <span className="font-medium">${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between py-2">
          <span className="text-gray-600">Delivery Fee</span>
          <span className="font-medium">${deliveryFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between py-2 font-bold border-t border-gray-200 mt-2 pt-2">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      
      {/* Checkout Button */}
      <button
        onClick={handleCheckout}
        className="w-full py-3 mt-6 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md transition-colors"
      >
        Proceed to Checkout
      </button>
      
      {/* Pickup/Delivery Options */}
      <div className="mt-6">
        <div className="flex border border-gray-300 rounded-md overflow-hidden">
          <button className="flex-1 py-3 bg-primary-600 text-white font-medium">Delivery</button>
          <button className="flex-1 py-3 bg-white text-gray-700 font-medium hover:bg-gray-50 transition-colors">Pickup</button>
        </div>
      </div>
      
      {/* Estimated Delivery Time */}
      <div className="mt-6 p-4 bg-green-50 text-green-800 rounded-md">
        <p className="text-sm font-medium">Estimated delivery time: 35-45 minutes</p>
      </div>
    </div>
  );
};

export default CartSummary;