import { MenuItem } from '../types';

export const menuItems: MenuItem[] = [
  // Appetizers
  {
    id: 'app-1',
    name: 'Truffle Arancini',
    description: 'Crispy risotto balls with black truffle and mozzarella served with truffle aioli',
    price: 16,
    image: 'https://images.pexels.com/photos/5175537/pexels-photo-5175537.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'appetizers',
    dietary: ['V'],
    featured: true
  },
  {
    id: 'app-2',
    name: 'Seared Scallops',
    description: 'Pan-seared sea scallops with pea puree, crispy pancetta and micro herbs',
    price: 22,
    image: 'https://images.pexels.com/photos/8470751/pexels-photo-8470751.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'appetizers',
    dietary: ['GF']
  },
  {
    id: 'app-3',
    name: 'Beef Carpaccio',
    description: 'Thinly sliced prime beef with truffle oil, aged parmesan, capers and rocket',
    price: 19,
    image: 'https://images.pexels.com/photos/9797092/pexels-photo-9797092.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'appetizers',
    dietary: ['GF']
  },
  {
    id: 'app-4',
    name: 'Burrata Salad',
    description: 'Creamy burrata with heirloom tomatoes, basil, aged balsamic and extra virgin olive oil',
    price: 18,
    image: 'https://images.pexels.com/photos/15813320/pexels-photo-15813320/free-photo-of-burrata-cheese-with-cherry-tomato.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'appetizers',
    dietary: ['V', 'GF'],
    seasonal: true
  },
  
  // Main Courses
  {
    id: 'main-1',
    name: 'Filet Mignon',
    description: '8oz grass-fed beef tenderloin with truffle mashed potatoes, seasonal vegetables and red wine jus',
    price: 48,
    image: 'https://images.pexels.com/photos/675951/pexels-photo-675951.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'mains',
    dietary: ['GF'],
    featured: true
  },
  {
    id: 'main-2',
    name: 'Herb-Crusted Rack of Lamb',
    description: 'Dijon and herb-crusted lamb rack with pomme puree, glazed carrots and rosemary jus',
    price: 42,
    image: 'https://images.pexels.com/photos/10017/pexels-photo-10017.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'mains'
  },
  {
    id: 'main-3',
    name: 'Pan-Seared Sea Bass',
    description: 'Wild sea bass with saffron risotto, asparagus and lemon beurre blanc',
    price: 38,
    image: 'https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'mains',
    dietary: ['GF']
  },
  {
    id: 'main-4',
    name: 'Wild Mushroom Risotto',
    description: 'Arborio rice with wild mushrooms, truffle oil, parmesan and fresh herbs',
    price: 28,
    image: 'https://images.pexels.com/photos/15076339/pexels-photo-15076339/free-photo-of-risotto-with-mushrooms.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'mains',
    dietary: ['V', 'GF']
  },
  {
    id: 'main-5',
    name: 'Herb-Roasted Chicken',
    description: 'Free-range chicken breast with thyme and garlic, served with potato gratin and seasonal vegetables',
    price: 32,
    image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'mains',
    featured: true
  },
  
  // Desserts
  {
    id: 'dessert-1',
    name: 'Dark Chocolate Fondant',
    description: 'Warm chocolate cake with a molten center, served with vanilla bean ice cream',
    price: 14,
    image: 'https://images.pexels.com/photos/132694/pexels-photo-132694.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'desserts',
    dietary: ['V'],
    featured: true
  },
  {
    id: 'dessert-2',
    name: 'Crème Brûlée',
    description: 'Classic vanilla custard with caramelized sugar crust and seasonal berries',
    price: 12,
    image: 'https://images.pexels.com/photos/8548592/pexels-photo-8548592.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'desserts',
    dietary: ['V', 'GF']
  },
  {
    id: 'dessert-3',
    name: 'Tiramisu',
    description: 'Layers of coffee-soaked ladyfingers and mascarpone cream, dusted with cocoa',
    price: 13,
    image: 'https://images.pexels.com/photos/6933211/pexels-photo-6933211.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'desserts',
    dietary: ['V']
  },
  {
    id: 'dessert-4',
    name: 'Seasonal Fruit Tart',
    description: 'Buttery shortcrust pastry filled with vanilla custard and topped with fresh seasonal fruits',
    price: 14,
    image: 'https://images.pexels.com/photos/1854652/pexels-photo-1854652.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'desserts',
    dietary: ['V'],
    seasonal: true
  },
  
  // Beverages
  {
    id: 'bev-1',
    name: 'Signature House Cocktail',
    description: 'Handcrafted gin cocktail with elderflower, cucumber and fresh lime',
    price: 16,
    image: 'https://images.pexels.com/photos/602750/pexels-photo-602750.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'beverages',
    featured: true
  },
  {
    id: 'bev-2',
    name: 'Artisanal Kombucha',
    description: 'House-fermented kombucha with seasonal fruits and botanicals',
    price: 8,
    image: 'https://images.pexels.com/photos/5945569/pexels-photo-5945569.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'beverages',
    dietary: ['V', 'GF']
  },
  {
    id: 'bev-3',
    name: 'Bordeaux Red Wine',
    description: 'Premium Bordeaux blend with notes of black currant, cedar and tobacco',
    price: 18,
    image: 'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'beverages',
    dietary: ['V', 'GF']
  },
  {
    id: 'bev-4',
    name: 'Espresso Martini',
    description: 'Premium vodka, fresh espresso, coffee liqueur and a hint of vanilla',
    price: 15,
    image: 'https://images.pexels.com/photos/4784916/pexels-photo-4784916.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'beverages'
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