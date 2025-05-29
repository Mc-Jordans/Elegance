import React, { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getFeaturedItems } from '../../data/menuItems';

const FeaturedDishes = () => {
  const featuredItems = getFeaturedItems();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    const slider = sliderRef.current;
    if (slider) {
      setCanScrollLeft(slider.scrollLeft > 0);
      setCanScrollRight(
        slider.scrollLeft < slider.scrollWidth - slider.clientWidth - 10
      );
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('scroll', checkScrollability);
      // Initial check
      checkScrollability();
      
      // Check on resize
      window.addEventListener('resize', checkScrollability);
      
      return () => {
        slider.removeEventListener('scroll', checkScrollability);
        window.removeEventListener('resize', checkScrollability);
      };
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const slider = sliderRef.current;
    if (slider) {
      const scrollAmount = slider.clientWidth * 0.8;
      if (direction === 'left') {
        slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display text-dark mb-4">
            Featured Dishes
          </h2>
          <div className="w-20 h-1 bg-secondary-500 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Discover our chef's carefully curated selection of signature dishes that highlight 
            our commitment to exceptional ingredients and innovative techniques.
          </p>
        </div>
        
        {/* Slider Navigation */}
        <div className="flex justify-end mb-6 gap-2">
          <button 
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`p-2 rounded-full ${
              canScrollLeft 
                ? 'bg-dark text-white hover:bg-opacity-90' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            } transition-colors`}
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`p-2 rounded-full ${
              canScrollRight 
                ? 'bg-dark text-white hover:bg-opacity-90' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            } transition-colors`}
            aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </button>
        </div>
        
        {/* Featured Dishes Slider */}
        <div 
          ref={sliderRef}
          className="flex overflow-x-auto gap-6 pb-8 hide-scrollbar"
          style={{ scrollbarWidth: 'none' }}
        >
          {featuredItems.map((item) => (
            <div 
              key={item.id} 
              className="min-w-[300px] md:min-w-[350px] bg-white rounded-lg shadow-md overflow-hidden flex-shrink-0 transition-transform hover:scale-[1.02] duration-300"
            >
              <div className="h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover object-center transform hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-display text-xl text-dark">{item.name}</h3>
                  <span className="text-secondary-600 font-bold">${item.price}</span>
                </div>
                <p className="text-gray-600 mb-4">{item.description}</p>
                {item.dietary && (
                  <div className="flex gap-2">
                    {item.dietary.map((diet) => (
                      <span 
                        key={diet} 
                        className="inline-block px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded"
                      >
                        {diet}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <style jsx="true">{`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </div>
    </section>
  );
};

export default FeaturedDishes;