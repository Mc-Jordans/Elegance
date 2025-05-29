import React from 'react';

const Story = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2">
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/5560767/pexels-photo-5560767.jpeg"
                alt="Chef preparing traditional Ghanaian dish"
                className="rounded-lg shadow-lg w-full h-auto object-cover"
                style={{ height: '500px' }}
              />
              <div className="absolute -bottom-6 -right-6 bg-secondary-500 p-6 rounded-lg shadow-lg">
                <p className="text-dark font-display text-lg italic">
                  "Our cuisine tells the story of Ghana's rich cultural heritage through every carefully prepared dish."
                </p>
                <p className="text-dark font-medium mt-2">- Chef Kwame Mensah</p>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 mt-12 md:mt-0">
            <h2 className="text-3xl md:text-4xl font-display text-dark mb-6 after:content-[''] after:block after:w-20 after:h-1 after:bg-secondary-500 after:mt-4">
              Our Story
            </h2>
            <p className="text-gray-700 mb-6">
              Founded in 2010 by renowned Chef Kwame Mensah, Aduanipa was born from a passion for preserving and celebrating Ghana's rich culinary traditions. What began as a small chop bar in Osu has evolved into one of the most celebrated dining destinations across Ghana.
            </p>
            <p className="text-gray-700 mb-6">
              At Aduanipa, we believe that exceptional Ghanaian cuisine starts with the finest local ingredients. We partner with farmers from Aburi and fishermen from Jamestown to ensure that every dish showcases the best seasonal produce and freshly caught seafood.
            </p>
            <p className="text-gray-700">
              Our philosophy is simple: honor traditional recipes while embracing modern techniques. Each dish tells a story of our heritage and provides a unique sensory journey for our guests. From our signature Jollof rice to our perfectly spiced Kelewele, we invite you to experience the authentic flavors that define Ghanaian cuisine.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;