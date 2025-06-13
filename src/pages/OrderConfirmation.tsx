import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOrderById } from '../services/orderService';
import { toast } from 'react-hot-toast';
import { Package, Check, Clock, MapPin, Phone } from 'lucide-react';

interface OrderDetails {
  id: string;
  status: string;
  total: number;
  items: any[];
  created_at: string;
  delivery_address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  } | null;
  contact_phone: string;
}

const OrderConfirmation = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) return;
      
      try {
        setIsLoading(true);
        const orderData = await getOrderById(orderId);
        setOrder(orderData);
      } catch (error) {
        console.error('Error fetching order:', error);
        toast.error('Failed to load order details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Order Not Found</h1>
        <p className="text-gray-600 mb-8">We couldn't find the order you're looking for.</p>
        <Link to="/order-online" className="px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700">
          Return to Menu
        </Link>
      </div>
    );
  }

  const getStatusStep = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 1;
      case 'processing':
        return 2;
      case 'shipped':
      case 'out for delivery':
        return 3;
      case 'delivered':
        return 4;
      default:
        return 1;
    }
  };

  const statusStep = getStatusStep(order.status);
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">
            Your order #{order.id.substring(0, 8)} has been received and is being processed.
          </p>
        </div>

        {/* Order Status */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">Order Status</h2>
          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm ${statusStep >= 1 ? 'bg-primary-600' : 'bg-gray-300'}`}>
                  1
                </div>
                <span className={`text-xs mt-1 ${statusStep >= 1 ? 'text-primary-600 font-medium' : 'text-gray-500'}`}>Confirmed</span>
              </div>
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm ${statusStep >= 2 ? 'bg-primary-600' : 'bg-gray-300'}`}>
                  2
                </div>
                <span className={`text-xs mt-1 ${statusStep >= 2 ? 'text-primary-600 font-medium' : 'text-gray-500'}`}>Preparing</span>
              </div>
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm ${statusStep >= 3 ? 'bg-primary-600' : 'bg-gray-300'}`}>
                  3
                </div>
                <span className={`text-xs mt-1 ${statusStep >= 3 ? 'text-primary-600 font-medium' : 'text-gray-500'}`}>On the way</span>
              </div>
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm ${statusStep >= 4 ? 'bg-primary-600' : 'bg-gray-300'}`}>
                  4
                </div>
                <span className={`text-xs mt-1 ${statusStep >= 4 ? 'text-primary-600 font-medium' : 'text-gray-500'}`}>Delivered</span>
              </div>
            </div>
            <div className="absolute top-5 left-10 right-10 h-1 bg-gray-200 -z-10"></div>
            <div 
              className="absolute top-5 left-10 h-1 bg-primary-600 -z-10" 
              style={{ width: `${(statusStep - 1) * 33.33}%` }}
            ></div>
          </div>
          
          <div className="mt-6 flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            <span>Order placed on {formatDate(order.created_at)}</span>
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">Order Details</h2>
          
          <div className="divide-y divide-gray-200">
            {order.items.map((item, index) => (
              <div key={index} className="py-4 flex justify-between">
                <div>
                  <span className="font-medium">{item.quantity}x {item.name}</span>
                  {item.specialInstructions && (
                    <p className="text-sm text-gray-500 mt-1">"{item.specialInstructions}"</p>
                  )}
                </div>
                <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-200 mt-4 pt-4">
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">${(order.total * 0.9).toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Tax</span>
              <span className="font-medium">${(order.total * 0.1).toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 font-bold">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Delivery Information */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">Delivery Information</h2>
          
          {order.delivery_address ? (
            <div className="flex items-start mb-4">
              <MapPin className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
              <div>
                <p className="font-medium">Delivery Address</p>
                <p className="text-gray-600">
                  {order.delivery_address.street}, {order.delivery_address.city}, {order.delivery_address.state} {order.delivery_address.zip}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-start mb-4">
              <Package className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
              <div>
                <p className="font-medium">Pickup Order</p>
                <p className="text-gray-600">
                  Ready for pickup at our main location
                </p>
              </div>
            </div>
          )}
          
          <div className="flex items-start">
            <Phone className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
            <div>
              <p className="font-medium">Contact Phone</p>
              <p className="text-gray-600">{order.contact_phone}</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link to="/profile" className="inline-block px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700">
            View All Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;