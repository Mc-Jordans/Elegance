import React from 'react';
import { Bell, Settings } from 'lucide-react';
import { useAuthContext } from '../../contexts/AuthContext';

export default function AdminHeader() {
  const { user } = useAuthContext();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-semibold text-gray-900">Admin Dashboard</span>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-1 text-gray-400 hover:text-gray-500">
              <Bell className="h-6 w-6" />
            </button>
            <button className="p-1 text-gray-400 hover:text-gray-500">
              <Settings className="h-6 w-6" />
            </button>
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">{user?.email}</span>
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-sm font-medium text-gray-600">
                  {user?.email?.[0].toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}