import { MenuItem } from '../types';

export const menuItems: MenuItem[] = [
  // Appetizers
  {
    id: 'app-1',
    name: 'Fried rice with shrimps',
    description: 'Spiced ripe plantains seasoned with ginger, garlic, and chili peppers, diced and fried to golden perfection',
    price: 15,
    image: 'https://images.pexels.com/photos/8969237/pexels-photo-8969237.jpeg',
    category: 'appetizers',
    dietary: ['V', 'GF'],
    featured: true
  },
  {
    id: 'app-2',
    name: 'Meat Pie',
    description: 'Flaky pastry filled with seasoned minced meat, onions, and aromatic spices',
    price: 12,
    image: 'https://images.pexels.com/photos/7426864/pexels-photo-7426864.jpeg',
    category: 'appetizers'
  },
  {
    id: 'app-3',
    name: 'Koose (Bean Fritters)',
    description: 'Black-eyed pea fritters seasoned with ginger, onions, and peppers',
    price: 18,
    image: 'https://images.pexels.com/photos/7426864/pexels-photo-7426864.jpeg',
    category: 'appetizers',
    dietary: ['V', 'GF']
  },
  {
    id: 'app-4',
    name: 'Yam Chips',
    description: 'Crispy fried yam chips served with spicy shito sauce',
    price: 20,
    image: 'https://images.pexels.com/photos/7426864/pexels-photo-7426864.jpeg',
    category: 'appetizers',
    dietary: ['V', 'GF'],
    seasonal: true
  },
  
  // Main Courses
  {
    id: 'main-1',
    name: 'Jollof Rice with Grilled Chicken',
    description: 'Aromatic rice cooked in rich tomato sauce with herbs and spices, served with grilled chicken and fried plantains',
    price: 65,
    image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.stUMS3ITpC70ykP0nceEgAHaHa%26pid%3DApi&f=1&ipt=e37bd07bd6ff1b6784f6e7369ad194c12c4dd1c60d55b402d0f27034b39b21f1&ipo=images',
    category: 'mains',
    featured: true
  },
  {
    id: 'main-2',
    name: 'Waakye Special',
    description: 'Rice and beans cooked with dried millet stalks, served with shito, fish, gari, and boiled egg',
    price: 55,
    image: 'https://images.pexels.com/photos/7426864/pexels-photo-7426864.jpeg',
    category: 'mains'
  },
  {
    id: 'main-3',
    name: 'Banku with Grilled Tilapia',
    description: 'Fermented corn and cassava dough served with grilled tilapia, pepper sauce, and fresh tomato gravy',
    price: 75,
    image: 'https://images.pexels.com/photos/7426864/pexels-photo-7426864.jpeg',
    category: 'mains',
    dietary: ['GF']
  },
  {
    id: 'main-4',
    name: 'Fufu with Goat Light Soup',
    description: 'Pounded cassava and plantain served with spicy goat light soup and garden eggs',
    price: 60,
    image: 'https://images.pexels.com/photos/7426864/pexels-photo-7426864.jpeg',
    category: 'mains',
    dietary: ['GF']
  },
  {
    id: 'main-5',
    name: 'Red Red',
    description: 'Bean stew served with fried plantains and gari',
    price: 45,
    image: 'https://images.pexels.com/photos/7426864/pexels-photo-7426864.jpeg',
    category: 'mains',
    dietary: ['V', 'GF'],
    featured: true
  },
  
  // Desserts
  {
    id: 'dessert-1',
    name: 'Bofrot (Puff Puff)',
    description: 'Sweet fried dough balls sprinkled with sugar',
    price: 15,
    image: 'https://images.pexels.com/photos/7426864/pexels-photo-7426864.jpeg',
    category: 'desserts',
    dietary: ['V'],
    featured: true
  },
  {
    id: 'dessert-2',
    name: 'Hausa Koko with Koose',
    description: 'Spiced millet porridge served with bean fritters',
    price: 20,
    image: 'https://images.pexels.com/photos/7426864/pexels-photo-7426864.jpeg',
    category: 'desserts',
    dietary: ['V', 'GF']
  },
  {
    id: 'dessert-3',
    name: 'Tatale',
    description: 'Sweet plantain pancakes spiced with ginger and anise',
    price: 18,
    image: 'https://images.pexels.com/photos/7426864/pexels-photo-7426864.jpeg',
    category: 'desserts',
    dietary: ['V', 'GF']
  },
  {
    id: 'dessert-4',
    name: 'Sobolo Ice Cream',
    description: 'Homemade hibiscus ice cream served with toasted coconut',
    price: 22,
    image: 'https://images.pexels.com/photos/7426864/pexels-photo-7426864.jpeg',
    category: 'desserts',
    dietary: ['V'],
    seasonal: true
  },
  
  // Beverages
  {
    id: 'bev-1',
    name: 'Sobolo',
    description: 'Chilled hibiscus drink infused with pineapple and spices',
    price: 12,
    image: 'https://images.pexels.com/photos/7426864/pexels-photo-7426864.jpeg',
    category: 'beverages',
    dietary: ['V', 'GF'],
    featured: true
  },
  {
    id: 'bev-2',
    name: 'Palm Wine',
    description: 'Traditional palm sap wine, freshly tapped',
    price: 15,
    image: 'https://images.pexels.com/photos/7426864/pexels-photo-7426864.jpeg',
    category: 'beverages',
    dietary: ['V', 'GF']
  },
  {
    id: 'bev-3',
    name: 'Fresh Coconut Water',
    description: 'Chilled coconut water served in the shell',
    price: 10,
    image: 'https://images.pexels.com/photos/7426864/pexels-photo-7426864.jpeg',
    category: 'beverages',
    dietary: ['V', 'GF']
  },
  {
    id: 'bev-4',
    name: 'Asaana',
    description: 'Fermented corn drink with a hint of sweetness',
    price: 8,
    image: 'https://images.pexels.com/photos/7426864/pexels-photo-7426864.jpeg',
    category: 'beverages',
    dietary: ['V', 'GF']
  }
];

// Utility function to get menu items by category
export const getMenuItemsByCategory = (category: string) => {
  return menuItems.filter(item => item.category === category);
};

// Utility function to get featured menu items
export const getFeaturedItems = () => {
  return menuItems.filter(item => item.featured);
};

// Utility function to get seasonal menu items
export const getSeasonalItems = () => {
  return menuItems.filter(item => item.seasonal);
};