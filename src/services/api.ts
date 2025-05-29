import { supabase } from '../lib/supabase';
import { Product, Order, Review } from '../types';

export const productAPI = {
  async getProducts(category?: string) {
    let query = supabase.from('products').select('*');
    if (category) {
      query = query.eq('category', category);
    }
    const { data, error } = await query;
    if (error) throw error;
    return data as Product[];
  },

  async getProduct(id: string) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data as Product;
  },

  async updateStock(id: string, quantity: number) {
    const { error } = await supabase.rpc('update_product_stock', {
      product_id: id,
      quantity_change: -quantity
    });
    if (error) throw error;
  }
};

export const orderAPI = {
  async createOrder(order: Omit<Order, 'id' | 'createdAt'>) {
    const { data, error } = await supabase
      .from('orders')
      .insert([order])
      .select()
      .single();
    if (error) throw error;
    return data as Order;
  },

  async getOrders(userId: string) {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('userId', userId)
      .order('createdAt', { ascending: false });
    if (error) throw error;
    return data as Order[];
  }
};

export const reviewAPI = {
  async createReview(review: Omit<Review, 'id' | 'createdAt'>) {
    const { data, error } = await supabase
      .from('reviews')
      .insert([review])
      .select()
      .single();
    if (error) throw error;
    return data as Review;
  },

  async getProductReviews(productId: string) {
    const { data, error } = await supabase
      .from('reviews')
      .select('*, users(firstName, lastName)')
      .eq('productId', productId)
      .order('createdAt', { ascending: false });
    if (error) throw error;
    return data as (Review & { users: { firstName: string; lastName: string } })[];
  }
};