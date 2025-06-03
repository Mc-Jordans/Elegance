import { supabase } from './supabase';

const HARDCODED_ADMIN = {
  username: "admin@elegance.com",
  password: "password123", // Change this to something less obvious in real use!
  role: "superadmin",
  id: "local-admin"
};

export function checkHardcodedAdmin(username: string, password: string) {
  if (
    username === HARDCODED_ADMIN.username &&
    password === HARDCODED_ADMIN.password
  ) {
    return { id: HARDCODED_ADMIN.id, role: HARDCODED_ADMIN.role };
  }
  return null;
}

export async function checkAdminAccess(userId: string) {
 const { data, error } = await supabase
  .from('admin_users')
  .select('id, role')
  .eq('user_id', userId)
  .maybeSingle();

  console.log('Checking admin access for:', userId);

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