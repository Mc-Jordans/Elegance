import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { BarChart, Users, ShoppingBag, AlertCircle } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalUsers: 0,
    totalProducts: 0,
    pendingIssues: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // These would be replaced with actual database queries
        const [orders, users, products] = await Promise.all([
          supabase.from('orders').select('count'),
          supabase.from('profiles').select('count'),
          supabase.from('menu_items').select('count')
        ]);

        setStats({
          totalOrders: orders.count || 0,
          totalUsers: users.count || 0,
          totalProducts: products.count || 0,
          pendingIssues: 0
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Orders</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalOrders}</p>
            </div>
            <div className="p-3 bg-primary-100 rounded-full">
              <ShoppingBag className="h-6 w-6 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Users</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalUsers}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Products</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalProducts}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <BarChart className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Pending Issues</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.pendingIssues}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <AlertCircle className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="text-gray-500 text-center py-8">
          Activity feed will be displayed here
        </div>
      </div>
    </div>
  );
}