import React from 'react';
import { BarChart, LineChart, PieChart, TrendingUp } from 'lucide-react';

export default function Analytics() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Analytics Dashboard</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
              <p className="text-2xl font-semibold text-gray-900">$24,567</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                +12.5% from last month
              </p>
            </div>
            <div className="p-3 bg-primary-100 rounded-full">
              <BarChart className="h-6 w-6 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Orders</p>
              <p className="text-2xl font-semibold text-gray-900">1,234</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                +8.2% from last month
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <LineChart className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Average Order Value</p>
              <p className="text-2xl font-semibold text-gray-900">$85.32</p>
              <p className="text-sm text-red-600 flex items-center mt-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                -2.4% from last month
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <PieChart className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Customer Satisfaction</p>
              <p className="text-2xl font-semibold text-gray-900">4.8/5.0</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                +0.3 from last month
              </p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <BarChart className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trends</h2>
          <div className="h-80 flex items-center justify-center bg-gray-50 rounded">
            <p className="text-gray-500">Revenue chart will be displayed here</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Statistics</h2>
          <div className="h-80 flex items-center justify-center bg-gray-50 rounded">
            <p className="text-gray-500">Order statistics chart will be displayed here</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Event
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  New order placed
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  John Doe
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  5 minutes ago
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Completed
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  Product updated
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Jane Smith
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  10 minutes ago
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    Updated
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  Customer feedback
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Mike Johnson
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  15 minutes ago
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    Pending
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}