import React, { useState, useEffect } from 'react';
import { getUserOrders } from '../../services/orderService';
import { Package, ExternalLink, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

interface Order {
  id: string;
  created_at: string;
  status: string;
  total: number;
  items: any[];
}

const OrderHistory: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const userOrders = await getUserOrders();
        setOrders(userOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast.error('Failed to load your orders');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Package size={48} className="mx-auto mb-4 text-gray-400" />
        <p>You haven't placed any orders yet.</p>
        <Link to="/order-online" className="mt-4 inline-block px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
          Start Ordering
        </Link>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <div key={order.id} className="border rounded-lg overflow-hidden">
          <div className="bg-gray-50 p-4 flex justify-between items-center">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Order ID:</span>
                <span className="font-medium">{order.id.substring(0, 8)}...</span>
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <Clock size={14} className="text-gray-500" />
                <span className="text-sm text-gray-500">{formatDate(order.created_at)}</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
              <Link 
                to={`/order-confirmation/${order.id}`}
                className="text-primary-600 hover:text-primary-700 flex items-center"
              >
                <span className="mr-1">Details</span>
                <ExternalLink size={14} />
              </Link>
            </div>
          </div>
          
          <div className="p-4">
            <div className="mb-4">
              <h4 className="font-medium mb-2">Items</h4>
              <ul className="space-y-2">
                {order.items.map((item, index) => (
                  <li key={index} className="flex justify-between text-sm">
                    <span>{item.quantity}x {item.name}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="border-t pt-3 flex justify-between items-center">
              <span className="font-medium">Total</span>
              <span className="font-bold text-lg">${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;