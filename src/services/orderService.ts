import { supabase } from '../lib/supabaseClient';
import { OrderItem } from '../types';
import { toast } from 'react-hot-toast';

interface OrderData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  specialInstructions?: string;
  deliveryMethod: 'delivery' | 'pickup';
  items: OrderItem[];
  total: number;
}

// Valid order statuses
export const VALID_ORDER_STATUSES = ['pending', 'processing', 'delivered', 'cancelled'];

export const createOrder = async (orderData: OrderData) => {
  try {
    // Get current user (if logged in)
    const { data: { user } } = await supabase.auth.getUser();
    
    // Format order items for database
    const orderItems = orderData.items.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      specialInstructions: item.specialInstructions
    }));
    
    // Create delivery address object if delivery method is selected
    const deliveryAddress = orderData.deliveryMethod === 'delivery' ? {
      street: orderData.address,
      city: orderData.city,
      state: orderData.state,
      zip: orderData.zipCode
    } : null;
    
    // Create order in database
    const { data: order, error } = await supabase
      .from('orders')
      .insert({
        user_id: user?.id || null,
        status: 'pending',
        total: orderData.total,
        items: orderItems,
        delivery_address: deliveryAddress,
        contact_phone: orderData.phone,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();
    
    if (error) throw error;
    
    return order;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const getOrderById = async (orderId: string) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching order:', error);
    throw error;
  }
};

export const getUserOrders = async () => {
  try {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching user orders:', error);
    throw error;
  }
};

export const updateOrderStatus = async (orderId: string, status: string) => {
  try {
    // Validate status
    if (!VALID_ORDER_STATUSES.includes(status)) {
      throw new Error(`Invalid status: ${status}`);
    }
    
    const { data, error } = await supabase
      .from('orders')
      .update({ 
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', orderId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};

export const cancelOrder = async (orderId: string) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .update({ 
        status: 'cancelled',
        updated_at: new Date().toISOString()
      })
      .eq('id', orderId)
      .select()
      .single();
    
    if (error) throw error;
    toast.success('Order cancelled successfully');
    return data;
  } catch (error) {
    console.error('Error cancelling order:', error);
    toast.error('Failed to cancel order');
    throw error;
  }
};