import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  FileText, 
  BarChart, 
  Settings,
  LogOut,
  ShoppingBag,
  Users
} from 'lucide-react';
import { useAuthContext } from '../../contexts/AuthContext';

export default function AdminSidebar() {
  const location = useLocation();
  const { signOut } = useAuthContext();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const menuItems = [
    {
      title: 'Dashboard',
      path: '/admin/dashboard',
      icon: LayoutDashboard
    },
    {
      title: 'Reservations',
      path: '/admin/reservations',
      icon: Users
    },
    {
      title: 'Products',
      path: '/admin/products',
      icon: Package
    },
    {
      title: 'Orders',
      path: '/admin/orders',
      icon: ShoppingBag
    },
    {
      title: 'Content',
      path: '/admin/content',
      icon: FileText
    },
    {
      title: 'Customers',
      path: '/admin/customers',
      icon: Users
    },
    {
      title: 'Analytics',
      path: '/admin/analytics',
      icon: BarChart
    },
    {
      title: 'Settings',
      path: '/admin/settings',
      icon: Settings
    }
  ];

  return (
    <div className="w-64 bg-white h-screen border-r border-gray-200 overflow-y-auto fixed">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800">Admin Panel</h2>
      </div>
      
      <nav className="mt-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 ${
                isActive(item.path) ? 'bg-gray-100 border-r-4 border-primary-600' : ''
              }`}
            >
              <Icon className="h-5 w-5 mr-3" />
              <span>{item.title}</span>
            </Link>
          );
        })}
        
        <button
          onClick={() => signOut()}
          className="w-full flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100"
        >
          <LogOut className="h-5 w-5 mr-3" />
          <span>Sign Out</span>
        </button>
      </nav>
    </div>
  );
}