import React, { useState, useEffect } from 'react';
import OrderItem from '../components/order/OrderItem';
import CartSummary from '../components/order/CartSummary';
import { MenuItem, MenuCategory, OrderItem as OrderItemType } from '../types';
import { supabase } from '../lib/supabaseClient';
import { toast } from 'react-hot-toast';

const OrderOnline = () => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory | 'all'>('all');
  const [cart, setCart] = useState<OrderItemType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch menu items from Supabase
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setIsLoading(true);
        
        let query = supabase
          .from('menu_items')
          .select('*')
          .eq('is_available', true);
        
        const { data, error } = await query.order('name');
        
        if (error) throw error;
        
        // Transform data to match MenuItem interface
        const transformedData: MenuItem[] = data.map(item => ({
          id: item.id,
          name: item.name,
          description: item.description,
          price: item.price,
          image: item.image_url,
          category: item.category as MenuCategory,
          dietary: item.dietary_info,
          featured: item.featured,
          is_available: item.is_available
        }));
        
        setMenuItems(transformedData);
      } catch (error) {
        console.error('Error fetching menu items:', error);
        toast.error('Failed to load menu items');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMenuItems();
  }, []);
  
  // Filter items based on category and search term
  const filteredItems = menuItems.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  // Categories
  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'appetizers', name: 'Appetizers' },
    { id: 'mains', name: 'Main Courses' },
    { id: 'desserts', name: 'Desserts' },
    { id: 'beverages', name: 'Beverages' }
  ];
  
  // Add to cart handler
  const handleAddToCart = (item: OrderItemType) => {
    setCart(prevCart => {
      // Check if item already exists
      const existingItemIndex = prevCart.findIndex(cartItem => cartItem.id === item.id);
      
      if (existingItemIndex >= 0) {
        // Update existing item
        const updatedCart = [...prevCart];
        const existingItem = updatedCart[existingItemIndex];
        updatedCart[existingItemIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + item.quantity,
          specialInstructions: item.specialInstructions || existingItem.specialInstructions
        };
        
        // Show toast with unique ID to prevent duplicates
        toast.success(`Updated ${item.name} quantity in cart`, {
          id: `cart-${item.id}`,
          duration: 2000
        });
        
        return updatedCart;
      } else {
        // Add new item
        toast.success(`Added ${item.name} to cart`, {
          id: `cart-${item.id}`,
          duration: 2000
        });
        
        return [...prevCart, item];
      }
    });
  };
  
  // Remove from cart
  const handleRemoveFromCart = (id: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
    toast.success('Item removed from cart');
  };
  
  // Update quantity
  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };
  
  return (
    <>
      {/* Hero Banner */}
      <div className="relative h-80 bg-cover bg-center" style={{ backgroundImage: "url('https://images.pexels.com/photos/6941028/pexels-photo-6941028.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Order Online</h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">Enjoy our gourmet cuisine in the comfort of your home</p>
          </div>
        </div>
      </div>
      
      {/* Order Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Menu Column */}
          <div className="lg:col-span-2">
            {/* Search */}
            <div className="mb-8">
              <input
                type="text"
                placeholder="Search menu..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            {/* Category Tabs */}
            <div className="flex overflow-x-auto pb-2 mb-8 hide-scrollbar">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id as MenuCategory | 'all')}
                  className={`whitespace-nowrap px-5 py-2 rounded-full transition-colors mr-3 ${
                    activeCategory === category.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
            
            {/* Menu Items */}
            <div className="space-y-6">
              {isLoading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                </div>
              ) : filteredItems.length > 0 ? (
                filteredItems.map(item => (
                  <OrderItem 
                    key={item.id}
                    item={item}
                    onAddToCart={handleAddToCart}
                  />
                ))
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">No items found matching your criteria</p>
                  <button
                    onClick={() => { setActiveCategory('all'); setSearchTerm(''); }}
                    className="mt-4 text-primary-600 hover:text-primary-700"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Cart Column */}
          <div className="lg:sticky lg:top-24 lg:h-max">
            <CartSummary 
              items={cart} 
              onRemoveItem={handleRemoveFromCart}
              onUpdateQuantity={handleUpdateQuantity}
            />
            
            {/* Order Tracking Info (would be dynamic in a real app) */}
            {cart.length > 0 && (
              <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Order Tracking</h3>
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white text-sm">1</div>
                      <span className="text-xs mt-1 text-primary-600 font-medium">Preparing</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">2</div>
                      <span className="text-xs mt-1 text-gray-500">Cooking</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">3</div>
                      <span className="text-xs mt-1 text-gray-500">Delivery</span>
                    </div>
                  </div>
                  <div className="absolute top-4 left-8 right-8 h-1 bg-gray-200 -z-10"></div>
                  <div className="absolute top-4 left-8 w-12 h-1 bg-primary-600 -z-10"></div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-center">
                    Your order will be prepared for delivery soon!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Info Sections */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Delivery Information</h3>
              <p className="text-gray-600 mb-4">We deliver within a 5-mile radius of each restaurant location. Delivery times are typically 30-45 minutes, depending on order volume and distance.</p>
              <p className="text-gray-600">Delivery fee is $5.99. Free delivery on orders over $75.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Pickup Information</h3>
              <p className="text-gray-600 mb-4">Pickup orders are typically ready within 20-30 minutes. Please check in at the designated pickup area when you arrive.</p>
              <p className="text-gray-600">No additional fees for pickup orders.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Special Requests</h3>
              <p className="text-gray-600 mb-4">Have dietary restrictions or allergies? Please note them in the special instructions field when ordering.</p>
              <p className="text-gray-600">For large catering orders, please call us directly at (212) 555-1234.</p>
            </div>
          </div>
        </div>
      </section>
      
      <style jsx="true">{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
};

export default OrderOnline;