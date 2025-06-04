import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuthContext } from '../../contexts/AuthContext';
import { checkAdminAccess } from '../../lib/admin';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

export default function AdminLayout() {
  const { user, loading } = useAuthContext();
  const navigate = useNavigate();
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    const verifyAdminAccess = async () => {
      try {
        if (!loading) {
          if (!user) {
            navigate('/admin/login');
            return;
          }

          const isAdmin = await checkAdminAccess(user.id);
          
          if (!isAdmin) {
            toast.error('You do not have admin privileges');
            navigate('/admin/login');
            return;
          }
          
          setIsVerifying(false);
        }
      } catch (error) {
        console.error('Error verifying admin access:', error);
        toast.error('Authentication error');
        navigate('/admin/login');
      }
    };

    verifyAdminAccess();
  }, [user, loading, navigate]);

  if (loading || isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 ml-64 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}