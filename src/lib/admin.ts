import { supabase } from './supabase';

export async function checkAdminAccess(userId: string) {
  const { data, error } = await supabase
    .from('admin_users')
    .select('id, role')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error('Error checking admin access:', error);
    return null;
  }

  return data;
}

export async function updateAdminLastLogin(adminId: string) {
  const { error } = await supabase
    .from('admin_users')
    .update({ last_login: new Date().toISOString() })
    .eq('id', adminId);

  if (error) {
    console.error('Error updating last login:', error);
  }
}