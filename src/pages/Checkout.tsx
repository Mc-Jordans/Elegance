import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../stores/cartStore';
import { supabase } from '../lib/supabaseClient';
import { toast } from 'react-hot-toast';
import { formatCurrency } from '../utils/format';
import { useAuthContext } from '../contexts/AuthContext';
import AuthModal from '../components/auth/AuthModal';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, clearCart } = useCartStore();
  const { user } = useAuthContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    specialInstructions: ''
  });

  // Prefill form with user data if available
  useEffect(() => {
    if (user) {
      // Get user profile data
      const getUserProfile = async () => {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();
          
        if (data) {
          setFormData(prev => ({
            ...prev,
            firstName: data.first_name || '',
            lastName: data.last_name || '',
            email: user.email || '',
            phone: data.phone || '',
            address: data.address || '',
            city: data.city || '',
            state: data.state || '',
            zipCode: data.zip_code || ''
          }));
        }
      };
      
      getUserProfile();
    }
  }, [user]);

  // Calculate order totals
  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const taxRate = 0.0825; // 8.25%
  const tax = subtotal * taxRate;
  const deliveryFee = deliveryMethod === 'delivery' ? 5.99 : 0;
  const total = subtotal + tax + deliveryFee;

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    
    // Check if user is logged in
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Format order items for database
      const orderItems = items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        specialInstructions: item.specialInstructions
      }));
      
      // Create delivery address object
      const deliveryAddress = deliveryMethod === 'delivery' ? {
        street: formData.address,
        city: formData.city,
        state: formData.state,
        zip: formData.zipCode
      } : null;
      
      // Create order in database
      const { data, error } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          status: 'pending',
          total: total,
          items: orderItems,
          delivery_address: deliveryAddress,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select();
      
      if (error) {
        console.error('Database error:', error);
        throw error;
      }
      
      if (!data || data.length === 0) {
        throw new Error('No data returned from order creation');
      }
      
      // Clear cart and redirect to confirmation page
      clearCart();
      navigate(`/order-confirmation/${data[0].id}`);
      toast.success('Order placed successfully!');
      
    } catch (error: any) {
      console.error('Error placing order:', error);
      toast.error(error.message || 'Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // If cart is empty, redirect to menu
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-display mb-4">Your cart is empty</h1>
        <p className="mb-8">Add some items to your cart before checking out.</p>
        <button 
          onClick={() => navigate('/menu')}
          className="px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
        >
          Browse Menu
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        mode={authMode}
        onSuccess={() => handleSubmit({ preventDefault: () => {} } as React.FormEvent)}
      />
      
      {/* Hero Banner */}
      <div className="relative h-60 bg-cover bg-center" style={{ backgroundImage: "url('https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Checkout</h1>
            <p className="text-xl text-gray-200">Complete your order</p>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        {!user && (
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  Please <button onClick={() => {setShowAuthModal(true); setAuthMode('login');}} className="font-medium underline">sign in</button> or <button onClick={() => {setShowAuthModal(true); setAuthMode('register');}} className="font-medium underline">create an account</button> to complete your order.
                </p>
              </div>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-2xl font-display mb-6">Delivery Method</h2>
              <div className="flex border border-gray-300 rounded-md overflow-hidden mb-8">
                <button 
                  className={`flex-1 py-3 font-medium transition-colors ${
                    deliveryMethod === 'delivery' 
                      ? 'bg-primary-600 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setDeliveryMethod('delivery')}
                  type="button"
                >
                  Delivery
                </button>
                <button 
                  className={`flex-1 py-3 font-medium transition-colors ${
                    deliveryMethod === 'pickup' 
                      ? 'bg-primary-600 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setDeliveryMethod('pickup')}
                  type="button"
                >
                  Pickup
                </button>
              </div>
              
              <form onSubmit={handleSubmit}>
                <h2 className="text-2xl font-display mb-6">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label htmlFor="firstName" className="block text-gray-700 font-medium mb-2">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-gray-700 font-medium mb-2">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
                    />
                  </div>
                </div>
                
                {deliveryMethod === 'delivery' && (
                  <>
                    <h2 className="text-2xl font-display mb-6">Delivery Address</h2>
                    <div className="mb-6">
                      <label htmlFor="address" className="block text-gray-700 font-medium mb-2">Street Address</label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        required={deliveryMethod === 'delivery'}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div>
                        <label htmlFor="city" className="block text-gray-700 font-medium mb-2">City</label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                          required={deliveryMethod === 'delivery'}
                        />
                      </div>
                      <div>
                        <label htmlFor="state" className="block text-gray-700 font-medium mb-2">State</label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                          required={deliveryMethod === 'delivery'}
                        />
                      </div>
                      <div>
                        <label htmlFor="zipCode" className="block text-gray-700 font-medium mb-2">ZIP Code</label>
                        <input
                          type="text"
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                          required={deliveryMethod === 'delivery'}
                        />
                      </div>
                    </div>
                  </>
                )}
                
                <div className="mb-8">
                  <label htmlFor="specialInstructions" className="block text-gray-700 font-medium mb-2">Special Instructions</label>
                  <textarea
                    id="specialInstructions"
                    name="specialInstructions"
                    value={formData.specialInstructions}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Any special instructions for your order or delivery"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md transition duration-300 disabled:bg-gray-400"
                >
                  {isSubmitting ? 'Processing...' : 'Place Order'}
                </button>
              </form>
            </div>
          </div>
          
          {/* Order Summary */}
          <div>
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
              <h2 className="text-2xl font-display mb-6">Order Summary</h2>
              
              <div className="divide-y divide-gray-200">
                {items.map((item) => (
                  <div key={item.id} className="py-4 first:pt-0">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">
                        {item.quantity} × {item.name}
                      </span>
                      <span className="font-medium">{formatCurrency(item.price * item.quantity)}</span>
                    </div>
                    {item.specialInstructions && (
                      <p className="text-sm text-gray-600 italic">"{item.specialInstructions}"</p>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Tax ({(taxRate * 100).toFixed(2)}%)</span>
                  <span className="font-medium">{formatCurrency(tax)}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">
                    {deliveryMethod === 'delivery' ? 'Delivery Fee' : 'Pickup Fee'}
                  </span>
                  <span className="font-medium">
                    {deliveryFee === 0 ? 'Free' : formatCurrency(deliveryFee)}
                  </span>
                </div>
                <div className="flex justify-between py-2 font-bold border-t border-gray-200 mt-2 pt-2">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>
              
              {deliveryMethod === 'delivery' && (
                <div className="mt-6 p-4 bg-gray-50 rounded-md">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Estimated Delivery Time:</span> 35-45 minutes
                  </p>
                </div>
              )}
              
              {deliveryMethod === 'pickup' && (
                <div className="mt-6 p-4 bg-gray-50 rounded-md">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Estimated Pickup Time:</span> 20-30 minutes
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    <span className="font-medium">Pickup Location:</span> 123 Main Street, New York, NY 10001
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;