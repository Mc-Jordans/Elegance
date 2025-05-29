export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: MenuCategory;
  dietary?: string[];
  featured?: boolean;
  seasonal?: boolean;
}

export type MenuCategory = 'appetizers' | 'mains' | 'desserts' | 'beverages';

export interface RestaurantLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  hours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  hasPrivateDining: boolean;
  parkingInfo: string;
  image: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  location: string;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  date: string;
  image: string;
  url: string;
}

export interface SocialMediaPost {
  id: string;
  image: string;
  caption: string;
  likes: number;
  url: string;
}

export interface OrderItem extends MenuItem {
  quantity: number;
  specialInstructions?: string;
  options?: {
    [key: string]: string | boolean;
  };
}