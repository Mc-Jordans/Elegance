import { MenuItem } from '../data/menuItems';

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
    image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.8mw08Bsx0dd5WTclMU4wFgHaGL%26pid%3DApi&f=1&ipt=e4a8293f16d0315acb5e877ae50ffd2d60254ffa726460e895105ddeffb52819&ipo=images',
    category: 'appetizers'
  },
  {
    id: 'app-3',
    name: 'Koose (Bean Fritters)',
    description: 'Black-eyed pea fritters seasoned with ginger, onions, and peppers',
    price: 18,
    image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.fdOm5pHcCfnGmPgHQtSPuQHaD0%26pid%3DApi&f=1&ipt=2fec53a0bc78159a799d331aa61cb6298e4d3b2e95a8a97ecccb7452ad16f212&ipo=images',
    category: 'appetizers',
    dietary: ['V', 'GF']
  },
  {
    id: 'app-4',
    name: 'Yam Chips',
    description: 'Crispy fried yam chips served with spicy shito sauce',
    price: 20,
    image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.mD5JMtb8vCNX6f2eGqw6fgHaHa%26pid%3DApi&f=1&ipt=bb6eb68644c4adba7f4dce01bf57b433b2eb3e5ec205eefaddec8b360d96f968&ipo=images',
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
    image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.drlFeWZ9FCywQ7PbkpPj7QHaFh%26pid%3DApi&f=1&ipt=9d7a5c1aebd8cdda02c1916ab6b191e2ae9f9b6bfc253fd6137c96767560fad3&ipo=images',
    category: 'mains'
  },
  {
    id: 'main-3',
    name: 'Banku with Grilled Tilapia',
    description: 'Fermented corn and cassava dough served with grilled tilapia, pepper sauce, and fresh tomato gravy',
    price: 75,
    image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.sKurx-tg6IkaFcfRZbbwuwHaEK%26pid%3DApi&f=1&ipt=428bf6de0cb4ad61df65e95464706033b04dd281afbd783de190838f71822512&ipo=images',
    category: 'mains',
    dietary: ['GF']
  },
  {
    id: 'main-4',
    name: 'Fufu with Goat Light Soup',
    description: 'Pounded cassava and plantain served with spicy goat light soup and garden eggs',
    price: 60,
    image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.pK4RPnWbnX3xWdYLQjGOhgAAAA%26pid%3DApi&f=1&ipt=40b1062a66b10b702c625f251590668ef78d219b196850fe107d35800d0f62bd&ipo=images',
    category: 'mains',
    dietary: ['GF']
  },
  {
    id: 'main-5',
    name: 'Red Red',
    description: 'Bean stew served with fried plantains and gari',
    price: 45,
    image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.kgu-Nsk7w4Rir2wQBCmgUwHaIB%3Fpid%3DApi&f=1&ipt=cd220ce7798c6350d20083a7d8618095a80e60451a3fd5d185ba2b097fbc9640&ipo=images',
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
    image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.mGV3-UuhJersStq8xvHzvwHaKk%26pid%3DApi&f=1&ipt=a9d7b1bedf182198bd70114cdefe95b86dd4e53c519086b521fc624b7f76164e&ipo=images',
    category: 'desserts',
    dietary: ['V'],
    featured: true
  },
  {
    id: 'dessert-2',
    name: 'Hausa Koko with Koose',
    description: 'Spiced millet porridge served with bean fritters',
    price: 20,
    image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.0C5x8saR6Y_ra8XFMwy9xwHaFV%26pid%3DApi&f=1&ipt=7112a1a77dd4bc4038f0a1d1fa031a7d94adef4ed3c3c744a721f2ca5629cc29&ipo=images',
    category: 'desserts',
    dietary: ['V', 'GF']
  },
  {
    id: 'dessert-3',
    name: 'Tatale',
    description: 'Sweet plantain pancakes spiced with ginger and anise',
    price: 18,
    image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.rOgjXCDwRkg1nKVQiILqUwHaD4%26pid%3DApi&f=1&ipt=c56f266196adc4aadc79e87b052971883ef2c428846d98548b4ef20ab0fd2667&ipo=images',
    category: 'desserts',
    dietary: ['V', 'GF']
  },
  {
    id: 'dessert-4',
    name: 'Sobolo Ice Cream',
    description: 'Homemade hibiscus ice cream served with toasted coconut',
    price: 22,
    image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.WAge79C_DYUBKMzmWYt8PQHaEK%26pid%3DApi&f=1&ipt=35752c80d52dfbd5ef038e3b75fed84d4077e8b721f192e8c4b00fa3ec454e7e&ipo=images',
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
    image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.IKgr2pDuy6upQLdC3wGBkwHaEK%26pid%3DApi&f=1&ipt=309aae1b0d6276d2fb7dae1cb4566773eee717e15acc79ced57610910042c4cf&ipo=images',
    category: 'beverages',
    dietary: ['V', 'GF'],
    featured: true
  },
  {
    id: 'bev-2',
    name: 'Palm Wine',
    description: 'Traditional palm sap wine, freshly tapped',
    price: 15,
    image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.CAJOR8FpK5dbwyBSxtioKwHaHa%26pid%3DApi&f=1&ipt=b52d1e9fe4d7314129cec4b9c49de0efd257354582d5fb19c3c3778cd1750ba5&ipo=images',
    category: 'beverages',
    dietary: ['V', 'GF']
  },
  {
    id: 'bev-3',
    name: 'Fresh Coconut Water',
    description: 'Chilled coconut water served in the shell',
    price: 10,
    image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.8DPrqSoH6pTC0yt3x-WaBQHaE8%26pid%3DApi&f=1&ipt=608254a19dfcff1394367d503d006e3eeea3fe0a2ef8837310252300e35d9840&ipo=images',
    category: 'beverages',
    dietary: ['V', 'GF']
  },
  {
    id: 'bev-4',
    name: 'Asaana',
    description: 'Fermented corn drink with a hint of sweetness',
    price: 8,
    image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.Ql3M7FYZsxosSjNhC2L_fgHaEK%26pid%3DApi&f=1&ipt=f564bd3e97a3357d216de55a3f16e575cfc0e37322f2f63c87fec31fe74134e9&ipo=images',
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