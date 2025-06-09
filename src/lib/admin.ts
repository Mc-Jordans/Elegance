import { supabase } from './supabaseClient';
import { toast } from 'react-hot-toast';

// Admin authentication and authorization
export const checkAdminAccess = async (userId: string) => {
  try {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('user_id', userId)
      .single();
    
    if (error) throw error;
    return profile?.role === 'admin';
  } catch (error) {
    console.error('Error checking admin access:', error);
    return false;
  }
};

// Dashboard stats
export const fetchDashboardStats = async () => {
  try {
    // Fetch counts from all relevant tables
    const [usersResult, productsResult, ordersResult, pendingOrdersResult] = await Promise.all([
      supabase.from('profiles').select('*', { count: 'exact', head: true }),
      supabase.from('menu_items').select('*', { count: 'exact', head: true }),
      supabase.from('orders').select('*', { count: 'exact', head: true }),
      supabase.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'pending')
    ]);

    return {
      totalOrders: ordersResult.count || 0,
      totalUsers: usersResult.count || 0,
      totalProducts: productsResult.count || 0,
      pendingIssues: pendingOrdersResult.count || 0 // Using pending orders as "issues"
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    toast.error('Failed to load dashboard statistics');
    return { totalOrders: 0, totalUsers: 0, totalProducts: 0, pendingIssues: 0 };
  }
};

// Product management
export const fetchProducts = async (
  page = 1, 
  pageSize = 10, 
  searchTerm = '', 
  category = 'all'
) => {
  try {
    let query = supabase
      .from('menu_items')
      .select('*', { count: 'exact' });
    
    // Apply filters
    if (searchTerm) {
      query = query.ilike('name', `%${searchTerm}%`);
    }
    
    if (category && category !== 'all') {
      query = query.eq('category', category);
    }
    
    // Pagination
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    
    const { data, count, error } = await query
      .order('created_at', { ascending: false })
      .range(from, to);
    
    if (error) throw error;
    
    return {
      products: data || [],
      totalCount: count || 0,
      currentPage: page,
      totalPages: Math.ceil((count || 0) / pageSize)
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    toast.error('Failed to load products');
    return { products: [], totalCount: 0, currentPage: 1, totalPages: 1 };
  }
};

export const createProduct = async (productData: any) => {
  try {
    const { data, error } = await supabase
      .from('menu_items')
      .insert(productData)
      .select()
      .single();
    
    if (error) throw error;
    toast.success('Product created successfully');
    return data;
  } catch (error) {
    console.error('Error creating product:', error);
    toast.error('Failed to create product');
    throw error;
  }
};

export const updateProduct = async (id: string, productData: any) => {
  try {
    const { data, error } = await supabase
      .from('menu_items')
      .update(productData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    toast.success('Product updated successfully');
    return data;
  } catch (error) {
    console.error('Error updating product:', error);
    toast.error('Failed to update product');
    throw error;
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const { error } = await supabase
      .from('menu_items')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    toast.success('Product deleted successfully');
    return true;
  } catch (error) {
    console.error('Error deleting product:', error);
    toast.error('Failed to delete product');
    throw error;
  }
};

// Order management
export const fetchOrders = async (
  page = 1, 
  pageSize = 10, 
  status?: string
) => {
  try {
    let query = supabase
      .from('orders')
      .select('*', { count: 'exact' }); // Removed profiles join
    
    if (status) {
      query = query.eq('status', status);
    }
    
    // Pagination
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    
    const { data, count, error } = await query
      .order('created_at', { ascending: false })
      .range(from, to);
    
    if (error) throw error;
    
    // Format orders for display
    const formattedOrders = data?.map(order => {
      // Parse JSON fields if they're stored as strings
      const items = typeof order.items === 'string' ? JSON.parse(order.items) : order.items;
      const deliveryAddress = typeof order.delivery_address === 'string' 
        ? JSON.parse(order.delivery_address) 
        : order.delivery_address;
      
      return {
        ...order,
        items,
        delivery_address: deliveryAddress,
        // Add placeholder profile data since we can't join with profiles
        profiles: {
          first_name: 'Guest',
          last_name: ''
        }
      };
    }) || [];
    
    return {
      orders: formattedOrders,
      totalCount: count || 0,
      currentPage: page,
      totalPages: Math.ceil((count || 0) / pageSize)
    };
  } catch (error) {
    console.error('Error fetching orders:', error);
    toast.error('Failed to load orders');
    return { orders: [], totalCount: 0, currentPage: 1, totalPages: 1 };
  }
};

export const updateOrderStatus = async (id: string, status: string) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    toast.success(`Order status updated to ${status}`);
    return data;
  } catch (error) {
    console.error('Error updating order status:', error);
    toast.error('Failed to update order status');
    throw error;
  }
};