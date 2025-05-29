import React from 'react';

const Story = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Image */}
          <div className="w-full md:w-1/2">
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/2253643/pexels-photo-2253643.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Chef preparing gourmet dish"
                className="rounded-lg shadow-lg w-full h-auto object-cover"
                style={{ height: '500px' }}
              />
              <div className="absolute -bottom-6 -right-6 bg-secondary-500 p-6 rounded-lg shadow-lg">
                <p className="text-dark font-display text-lg italic">
                  "Cuisine is an art form that combines technique, tradition, and innovation."
                </p>
                <p className="text-dark font-medium mt-2">- Chef Michel Laurent</p>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="w-full md:w-1/2 mt-12 md:mt-0">
            <h2 className="text-3xl md:text-4xl font-display text-dark mb-6 after:content-[''] after:block after:w-20 after:h-1 after:bg-secondary-500 after:mt-4">
              Our Story
            </h2>
            <p className="text-gray-700 mb-6">
              Founded in 2010 by renowned Chef Michel Laurent, Elegance was born from a passion for creating extraordinary culinary experiences that delight all the senses. What began as a small bistro has evolved into one of the most celebrated dining destinations across the country.
            </p>
            <p className="text-gray-700 mb-6">
              At Elegance, we believe that exceptional cuisine starts with the finest ingredients. We partner with local farmers and sustainable seafood suppliers to ensure that every dish showcases the best seasonal produce and ethically sourced proteins.
            </p>
            <p className="text-gray-700">
              Our philosophy is simple: respect for ingredients, masterful technique, and artistic presentation. Each dish tells a story and provides a unique sensory journey for our guests. We invite you to experience the perfect harmony of flavors, textures, and aromas that define the Elegance dining experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;