import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, ShoppingBag, AlertCircle, Package, TrendingUp, DollarSign, Calendar } from 'lucide-react';
import { fetchDashboardStats, fetchOrders } from '../../lib/admin';
import { formatCurrency } from '../../utils/format';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalUsers: 0,
    totalProducts: 0,
    pendingIssues: 0
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setIsLoading(true);
        
        // Load dashboard stats
        const dashboardStats = await fetchDashboardStats();
        setStats(dashboardStats);
        
        // Load recent orders
        const ordersResult = await fetchOrders(1, 5);
        setRecentOrders(ordersResult.orders);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadDashboardData();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-primary-100 text-primary-800">
              <ShoppingBag className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Orders</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalOrders}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-800">
              <Users className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Users</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalUsers}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-800">
              <Package className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Products</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalProducts}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-800">
              <AlertCircle className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Pending Orders</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.pendingIssues}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-sm mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Recent Orders</h2>
            <Link to="/admin/orders" className="text-sm font-medium text-primary-600 hover:text-primary-800">
              View All
            </Link>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
          ) : recentOrders.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{order.id.substring(0, 8)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.profiles?.first_name} {order.profiles?.last_name || 'Guest'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(order.created_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(order.total)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No recent orders</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Revenue Overview</h3>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <p className="text-sm text-gray-500">Today's Revenue</p>
                <p className="text-sm font-medium text-gray-900">{formatCurrency(0)}</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '25%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <p className="text-sm text-gray-500">Weekly Revenue</p>
                <p className="text-sm font-medium text-gray-900">{formatCurrency(0)}</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <p className="text-sm text-gray-500">Monthly Revenue</p>
                <p className="text-sm font-medium text-gray-900">{formatCurrency(0)}</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Popular Items</h3>
            <DollarSign className="h-5 w-5 text-primary-500" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-200 rounded-md mr-3"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Truffle Pasta</p>
                <p className="text-xs text-gray-500">32 orders this month</p>
              </div>
              <p className="text-sm font-medium text-gray-900">{formatCurrency(24.99)}</p>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-200 rounded-md mr-3"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Wagyu Steak</p>
                <p className="text-xs text-gray-500">28 orders this month</p>
              </div>
              <p className="text-sm font-medium text-gray-900">{formatCurrency(49.99)}</p>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-200 rounded-md mr-3"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Chocolate Soufflé</p>
                <p className="text-xs text-gray-500">24 orders this month</p>
              </div>
              <p className="text-sm font-medium text-gray-900">{formatCurrency(12.99)}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Upcoming Reservations</h3>
            <Calendar className="h-5 w-5 text-blue-500" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 mr-3">
                <span className="text-xs font-medium">JD</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">John Doe</p>
                <p className="text-xs text-gray-500">Today, 7:30 PM • 4 guests</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-800 mr-3">
                <span className="text-xs font-medium">AS</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Alice Smith</p>
                <p className="text-xs text-gray-500">Today, 8:00 PM • 2 guests</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-800 mr-3">
                <span className="text-xs font-medium">RJ</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Robert Johnson</p>
                <p className="text-xs text-gray-500">Tomorrow, 6:30 PM • 6 guests</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}