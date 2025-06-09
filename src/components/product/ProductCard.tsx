import React from 'react';
import { Product } from '../../types';
import { useCartStore } from '../../stores/cartStore';
import { useWishlistStore } from '../../stores/wishlistStore';
import { formatCurrency } from '../../utils/format';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [quantity, setQuantity] = React.useState(1);
  const addItem = useCartStore((state) => state.addItem);
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlistStore();

  const handleAddToCart = () => {
    if (quantity > product.stock) {
      toast.error('Not enough stock available');
      return;
    }
    
    addItem(product, quantity);
    toast.success('Added to cart');
  };
  
  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48 overflow-hidden group">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <button
          onClick={handleWishlistToggle}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
          aria-label={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`h-5 w-5 ${isInWishlist(product.id) ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
        </button>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500 capitalize">{product.category}</span>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
          </div>
        </div>
        
        <h3 className="font-medium text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between mb-6">
          <span className="text-lg font-semibold text-gray-900">
            {formatCurrency(product.price)}
          </span>
          <div className="flex items-center border border-gray-300 rounded-md">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-1 hover:bg-gray-100 transition-colors"
            >
              -
            </button>
            <span className="px-3 py-1 border-x border-gray-300">{quantity}</span>
            <button
              onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
              className="px-3 py-1 hover:bg-gray-100 transition-colors"
            >
              +
            </button>
          </div>
        </div>
        
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`w-full py-3 rounded-md flex items-center justify-center space-x-2 transition-colors ${
            product.stock === 0
              ? 'bg-gray-200 cursor-not-allowed'
              : 'bg-primary-600 hover:bg-primary-700 text-white'
          }`}
        >
          <ShoppingCart className="h-5 w-5" />
          <span>{product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
        </button>
        
        {product.stock < 5 && product.stock > 0 && (
          <p className="text-sm text-red-600 mt-2">
            Only {product.stock} left in stock
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;