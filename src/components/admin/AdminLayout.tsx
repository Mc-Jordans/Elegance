import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuthContext } from '../../contexts/AuthContext';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

export default function AdminLayout() {
  const { user, loading } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminAccess = async () => {
      if (!loading && !user) {
        navigate('/admin/login');
        return;
      }

      if (user) {
        try {
          // Check if user has admin role in profiles table instead of admin_users
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('role')
            .eq('user_id', user.id)
            .single();

          if (error || !profile || profile.role !== 'admin') {
            console.log('Not an admin user:', error || 'No admin role');
            navigate('/admin/login');
          }
        } catch (err) {
          console.error('Error checking admin status:', err);
          navigate('/admin/login');
        }
      }
    };

    checkAdminAccess();
  }, [user, loading, navigate]);

  if (loading) {
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
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}