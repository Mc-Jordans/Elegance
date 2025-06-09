import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  is_available: boolean;
  dietary_info: string[];
  featured: boolean;
}

export default function Menu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  const fetchMenuItems = async () => {
    try {
      setIsLoading(true);
      
      let query = supabase
        .from('menu_items')
        .select('*')
        .eq('is_available', true);
      
      if (selectedCategory !== 'all') {
        query = query.eq('category', selectedCategory);
      }
      
      const { data, error } = await query.order('name');
      
      if (error) throw error;
      setMenuItems(data || []);
      
      // Get unique categories
      if (selectedCategory === 'all') {
        const uniqueCategories = [...new Set(data?.map(item => item.category) || [])];
        setCategories(uniqueCategories);
      }
    } catch (error) {
      console.error('Error fetching menu items:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, [selectedCategory]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };
  
  const handleAddToOrder = (item: MenuItem) => {
    // Add item to cart and navigate to order-online page
    import('../utils/menuUtils').then(({ addMenuItemToCart }) => {
      addMenuItemToCart(item);
      window.location.href = `/order-online`;
    });
  };

  return (
    <>
      {/* Hero Section */}
      <div className="relative py-16 mb-8">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg" 
            alt="Menu background" 
            className="w-full h-full object-cover "
          />
          <div className="absolute inset-0 bg-slate-900 opacity-40"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-10 mb-4">Our Menu</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Discover our carefully crafted dishes made with the freshest ingredients. 
            From appetizers to desserts, there's something for everyone.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 pb-12">
      
      {/* Category Filter */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-md shadow-sm">
          <button
            onClick={() => handleCategoryChange('all')}
            className={`px-4 py-2 text-sm font-medium ${
              selectedCategory === 'all' 
                ? 'bg-primary-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            } border border-gray-300 rounded-l-md`}
          >
            All
          </button>
          
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 text-sm font-medium ${
                selectedCategory === category 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } border-t border-b border-r border-gray-300 ${
                category === categories[categories.length - 1] ? 'rounded-r-md' : ''
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <div className="mb-16">
          {categories.length > 0 && selectedCategory === 'all' ? (
            // Group by category when showing all items
            categories.map((category) => {
              const categoryItems = menuItems.filter(item => item.category === category);
              if (categoryItems.length === 0) return null;
              
              return (
                <div key={category} className="mb-16">
                  <div className="relative mb-8">
                    <h2 className="text-3xl font-bold text-center">
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </h2>
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-24 h-1 bg-primary-600"></div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {categoryItems.map((item) => (
                      <div key={item.id} className="flex group">
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden flex-shrink-0 border-4 border-white shadow-lg transform group-hover:scale-105 transition-transform">
                          <img 
                            src={item.image_url || "https://placehold.co/300x300?text=Food"} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = "https://placehold.co/300x300?text=Food";
                            }}
                          />
                        </div>
                        <div className="ml-4 flex-grow">
                          <div className="flex justify-between items-center border-b border-dashed border-gray-300 pb-2 mb-2">
                            <h3 className="text-xl font-bold">{item.name}</h3>
                            <span className="text-lg font-bold text-primary-600">${item.price.toFixed(2)}</span>
                          </div>
                          <p className="text-gray-600 text-sm">{item.description}</p>
                          
                          {item.dietary_info && item.dietary_info.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1">
                              {item.dietary_info.map((info: string, index: number) => (
                                <span 
                                  key={index}
                                  className="px-2 py-0.5 bg-primary-50 text-primary-700 text-xs rounded-full"
                                >
                                  {info}
                                </span>
                              ))}
                            </div>
                          )}
                          
                          <button 
                            onClick={() => handleAddToOrder(item)}
                            className="mt-3 px-4 py-1 bg-primary-600 text-white text-sm rounded-full hover:bg-primary-700 transition-colors"
                          >
                            Add to Order
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            // Show selected category items in a grid
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
              {menuItems.map((item) => (
                <div key={item.id} className="group relative bg-white rounded-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-xl">
                  <div className="absolute top-0 right-0 bg-primary-600 text-white px-4 py-1 rounded-bl-lg z-10">
                    ${item.price.toFixed(2)}
                  </div>
                  <div className="h-56 overflow-hidden">
                    <img 
                      src={item.image_url || "https://placehold.co/600x400?text=Food"} 
                      alt={item.name} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src = "https://placehold.co/600x400?text=Food";
                      }}
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
                    
                    {item.dietary_info && item.dietary_info.length > 0 && (
                      <div className="mb-4 flex flex-wrap gap-1">
                        {item.dietary_info.map((info: string, index: number) => (
                          <span 
                            key={index}
                            className="px-2 py-0.5 bg-primary-50 text-primary-700 text-xs rounded-full"
                          >
                            {info}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <button 
                      onClick={() => handleAddToOrder(item)}
                      className="w-full bg-primary-600 text-white py-2 rounded-md hover:bg-primary-700 transition-colors flex items-center justify-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                      Add to Order
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      {!isLoading && menuItems.length === 0 && (
        <div className="text-center text-gray-500 py-12">
          No menu items found in this category.
        </div>
      )}
    </div>
    
    {/* Chef's Recommendation Section */}
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Chef's Recommendations</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Our executive chef has carefully selected these signature dishes that represent the best of our cuisine.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {menuItems.filter(item => item.featured).slice(0, 3).map((item) => (
            <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-lg transform hover:-translate-y-2 transition-all duration-300">
              <div className="relative">
                <img 
                  src={item.image_url || "https://placehold.co/600x400?text=Featured"} 
                  alt={item.name} 
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://placehold.co/600x400?text=Featured";
                  }}
                />
                <div className="absolute top-0 right-0 bg-primary-600 text-white px-4 py-2 rounded-bl-lg">
                  Featured
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-primary-600">${item.price.toFixed(2)}</span>
                  <button 
                    onClick={() => handleAddToOrder(item)}
                    className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                  >
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}