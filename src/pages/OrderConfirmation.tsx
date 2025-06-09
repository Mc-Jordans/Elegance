import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { formatCurrency } from '../utils/format';
import { CheckCircle, Clock, MapPin, Phone } from 'lucide-react';

const OrderConfirmation = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setIsLoading(true);
        
        if (!orderId) {
          setError('Order ID is missing');
          return;
        }
        
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('id', orderId)
          .single();
        
        if (error) throw error;
        if (!data) throw new Error('Order not found');
        
        setOrder(data);
      } catch (err: any) {
        console.error('Error fetching order:', err);
        setError(err.message || 'Failed to load order details');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchOrder();
  }, [orderId]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-700 mb-6">{error || 'Order not found'}</p>
          <Link 
            to="/order-online" 
            className="inline-block px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
          >
            Return to Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-primary-600 p-6 text-white text-center">
            <CheckCircle className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
            <p className="text-lg">Thank you for your order</p>
          </div>
          
          {/* Order Details */}
          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-6 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-semibold mb-1">Order #{orderId?.substring(0, 8)}</h2>
                <p className="text-gray-600">{formatDate(order.created_at)}</p>
              </div>
              <div className="mt-4 md:mt-0">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
            </div>
            
            {/* Order Items */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Order Items</h3>
              <div className="divide-y divide-gray-200">
                {order.items.map((item: any, index: number) => (
                  <div key={index} className="py-4 flex justify-between">
                    <div>
                      <p className="font-medium">{item.quantity} × {item.name}</p>
                      {item.specialInstructions && (
                        <p className="text-sm text-gray-600 italic mt-1">"{item.specialInstructions}"</p>
                      )}
                    </div>
                    <p className="font-medium">{formatCurrency(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{formatCurrency(order.total * 0.9)}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">{formatCurrency(order.total * 0.1)}</span>
                </div>
                <div className="flex justify-between py-2 font-bold text-lg">
                  <span>Total</span>
                  <span>{formatCurrency(order.total)}</span>
                </div>
              </div>
            </div>
            
            {/* Delivery/Pickup Info */}
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="text-lg font-semibold mb-4">
                {order.delivery_address ? 'Delivery Information' : 'Pickup Information'}
              </h3>
              
              {order.delivery_address ? (
                <div className="space-y-3">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                    <div>
                      <p className="font-medium">Delivery Address</p>
                      <p className="text-gray-600">{order.delivery_address.street}</p>
                      <p className="text-gray-600">
                        {order.delivery_address.city}, {order.delivery_address.state} {order.delivery_address.zip}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-500 mr-2" />
                    <div>
                      <p className="font-medium">Estimated Delivery Time</p>
                      <p className="text-gray-600">35-45 minutes</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-500 mr-2" />
                    <div>
                      <p className="font-medium">Contact Phone</p>
                      <p className="text-gray-600">{order.contact_phone}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                    <div>
                      <p className="font-medium">Pickup Location</p>
                      <p className="text-gray-600">123 Main Street, New York, NY 10001</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-500 mr-2" />
                    <div>
                      <p className="font-medium">Estimated Pickup Time</p>
                      <p className="text-gray-600">20-30 minutes</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-500 mr-2" />
                    <div>
                      <p className="font-medium">Contact Phone</p>
                      <p className="text-gray-600">{order.contact_phone}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Order Tracking */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Order Status</h3>
              <div className="relative">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white text-sm">1</div>
                    <span className="text-xs mt-1 text-primary-600 font-medium">Confirmed</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full ${order.status === 'processing' || order.status === 'completed' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'} flex items-center justify-center text-sm`}>2</div>
                    <span className={`text-xs mt-1 ${order.status === 'processing' || order.status === 'completed' ? 'text-primary-600 font-medium' : 'text-gray-500'}`}>Processing</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full ${order.status === 'completed' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'} flex items-center justify-center text-sm`}>3</div>
                    <span className={`text-xs mt-1 ${order.status === 'completed' ? 'text-primary-600 font-medium' : 'text-gray-500'}`}>Completed</span>
                  </div>
                </div>
                <div className="absolute top-4 left-8 right-8 h-1 bg-gray-200 -z-10"></div>
                <div 
                  className="absolute top-4 left-8 h-1 bg-primary-600 -z-10" 
                  style={{ 
                    width: order.status === 'pending' ? '0%' : 
                           order.status === 'processing' ? '50%' : 
                           order.status === 'completed' ? '100%' : '0%' 
                  }}
                ></div>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/order-online" 
                className="px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors text-center"
              >
                Order More
              </Link>
              <Link 
                to="/" 
                className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-center"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;