export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  rating: number;
  reviews: number;
  featured?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  total: number;
  shippingAddress: Address;
  createdAt: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

// Menu types
export type MenuCategory = 'appetizers' | 'mains' | 'desserts' | 'beverages';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: MenuCategory;
  dietary?: string[];
  featured?: boolean;
  is_available?: boolean;
}

export interface OrderItem extends MenuItem {
  quantity: number;
  specialInstructions?: string;
}

// Location types
export interface RestaurantLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  hours: {
    [key: string]: string;
  };
  image: string;
  mapUrl: string;
  description: string;
}