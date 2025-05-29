import React from 'react';
import { MenuItem } from '../../types';

interface MenuSectionProps {
  title: string;
  items: MenuItem[];
  description?: string;
}

const MenuSection: React.FC<MenuSectionProps> = ({ title, items, description }) => {
  return (
    <section className="mb-16">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-display text-dark mb-3">{title}</h2>
        <div className="w-16 h-1 bg-secondary-500 mx-auto mb-4"></div>
        {description && <p className="text-gray-600 max-w-3xl mx-auto">{description}</p>}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {items.map((item) => (
          <div key={item.id} className="flex group">
            <div className="w-28 h-28 flex-shrink-0 rounded-md overflow-hidden">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
              />
            </div>
            <div className="ml-5">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-display text-xl text-dark group-hover:text-primary-600 transition-colors">{item.name}</h3>
                <span className="font-medium text-secondary-600">${item.price}</span>
              </div>
              <p className="text-gray-600 mb-2 text-sm">{item.description}</p>
              {item.dietary && item.dietary.length > 0 && (
                <div className="flex gap-2">
                  {item.dietary.map((diet) => (
                    <span 
                      key={diet} 
                      className="inline-block px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded"
                      title={diet === 'V' ? 'Vegetarian' : diet === 'GF' ? 'Gluten Free' : diet}
                    >
                      {diet}
                    </span>
                  ))}
                </div>
              )}
              {item.seasonal && (
                <span className="inline-block mt-2 px-2 py-1 text-xs font-medium bg-secondary-100 text-secondary-800 rounded">
                  Seasonal
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MenuSection;