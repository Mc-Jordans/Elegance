import React, { useState } from 'react';
import { Download } from 'lucide-react';
import MenuSection from '../components/menu/MenuSection';
import { getMenuItemsByCategory, getSeasonalItems } from '../data/menuItems';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  const appetizers = getMenuItemsByCategory('appetizers');
  const mains = getMenuItemsByCategory('mains');
  const desserts = getMenuItemsByCategory('desserts');
  const beverages = getMenuItemsByCategory('beverages');
  const seasonal = getSeasonalItems();
  
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'seasonal', name: 'Seasonal Specials' },
    { id: 'appetizers', name: 'Appetizers' },
    { id: 'mains', name: 'Main Courses' },
    { id: 'desserts', name: 'Desserts' },
    { id: 'beverages', name: 'Beverages' }
  ];
  
  return (
    <>
      {/* Hero Banner */}
      <div className="relative h-80 md:h-96 bg-menu-pattern bg-cover bg-center">
        <div className="absolute inset-0 bg-dark bg-opacity-50"></div>
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-display text-white mb-4">Our Menu</h1>
            <div className="w-16 h-1 bg-secondary-500 mx-auto"></div>
          </div>
        </div>
      </div>
      
      {/* Menu Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Menu Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-5 py-2 rounded-full transition-colors ${
                activeCategory === category.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        {/* Download PDF Button */}
        <div className="flex justify-end mb-8">
          <a 
            href="#"
            className="flex items-center gap-2 px-4 py-2 bg-dark text-white rounded-md hover:bg-opacity-90 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Download PDF Menu</span>
          </a>
        </div>
        
        {/* Menu Legend */}
        <div className="bg-gray-50 p-4 rounded-lg mb-12">
          <div className="text-center text-sm text-gray-600">
            <span className="inline-block mx-2">
              <span className="inline-block px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded mr-1">V</span>
              Vegetarian
            </span>
            <span className="inline-block mx-2">
              <span className="inline-block px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded mr-1">GF</span>
              Gluten Free
            </span>
            <span className="inline-block mx-2">
              <span className="inline-block px-2 py-1 text-xs font-medium bg-secondary-100 text-secondary-800 rounded mr-1">Seasonal</span>
              Limited Time Offering
            </span>
          </div>
        </div>
        
        {/* Menu Sections */}
        {(activeCategory === 'all' || activeCategory === 'seasonal') && seasonal.length > 0 && (
          <MenuSection 
            title="Seasonal Specials" 
            items={seasonal} 
            description="Limited time offerings featuring the finest seasonal ingredients"
          />
        )}
        
        {(activeCategory === 'all' || activeCategory === 'appetizers') && (
          <MenuSection 
            title="Appetizers" 
            items={appetizers} 
          />
        )}
        
        {(activeCategory === 'all' || activeCategory === 'mains') && (
          <MenuSection 
            title="Main Courses" 
            items={mains} 
          />
        )}
        
        {(activeCategory === 'all' || activeCategory === 'desserts') && (
          <MenuSection 
            title="Desserts" 
            items={desserts} 
          />
        )}
        
        {(activeCategory === 'all' || activeCategory === 'beverages') && (
          <MenuSection 
            title="Beverages" 
            items={beverages} 
          />
        )}
      </div>
    </>
  );
};

export default Menu;