import React, { useState } from 'react';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { MenuItem, OrderItem as OrderItemType } from '../../types';

interface OrderItemProps {
  item: MenuItem;
  onAddToCart: (item: OrderItemType) => void;
}

const OrderItem: React.FC<OrderItemProps> = ({ item, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  
  const incrementQuantity = () => {
    setQuantity(prev => Math.min(prev + 1, 10));
  };
  
  const decrementQuantity = () => {
    setQuantity(prev => Math.max(prev - 1, 1));
  };
  
  const handleAddToCart = () => {
    const orderItem: OrderItemType = {
      ...item,
      quantity,
      specialInstructions: specialInstructions.trim() || undefined
    };
    onAddToCart(orderItem);
    setQuantity(1);
    setSpecialInstructions('');
    setShowOptions(false);
  };
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-start gap-4">
        <div className="w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-cover" 
          />
        </div>
        
        <div className="flex-grow">
          <div className="flex justify-between mb-1">
            <h3 className="font-display text-lg text-dark">{item.name}</h3>
            <span className="font-medium text-secondary-600">${item.price.toFixed(2)}</span>
          </div>
          
          <p className="text-gray-600 text-sm mb-2">{item.description}</p>
          
          {item.dietary && item.dietary.length > 0 && (
            <div className="flex gap-2 mb-3">
              {item.dietary.map((diet) => (
                <span 
                  key={diet} 
                  className="inline-block px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded"
                >
                  {diet}
                </span>
              ))}
            </div>
          )}
          
          <button
            onClick={() => setShowOptions(!showOptions)}
            className="text-sm text-primary-600 hover:text-primary-800 transition-colors mb-2"
          >
            {showOptions ? 'Hide options' : 'Customize'}
          </button>
          
          {showOptions && (
            <div className="mt-3 mb-4">
              <label htmlFor={`instructions-${item.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                Special Instructions
              </label>
              <textarea
                id={`instructions-${item.id}`}
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="Any specific requests or allergies?"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
                rows={2}
              />
            </div>
          )}
          
          <div className="flex justify-between items-center mt-3">
            <div className="flex items-center border border-gray-300 rounded-md">
              <button
                onClick={decrementQuantity}
                className="px-2 py-1 text-gray-500 hover:text-gray-700"
                aria-label="Decrease quantity"
              >
                <Minus size={16} />
              </button>
              <span className="px-4 py-1 text-dark font-medium">{quantity}</span>
              <button
                onClick={incrementQuantity}
                className="px-2 py-1 text-gray-500 hover:text-gray-700"
                aria-label="Increase quantity"
              >
                <Plus size={16} />
              </button>
            </div>
            
            <button
              onClick={handleAddToCart}
              className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;