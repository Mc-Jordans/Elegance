import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg')"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-dark/80 to-dark/40"></div>
      </div>
      
      <div className="relative h-full flex flex-col justify-center container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display text-white mb-6 leading-tight">
            Akwaaba! Experience Authentic Ghanaian Cuisine
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl">
            Savor the rich flavors of Ghana with our traditional dishes, prepared with love and served with pride.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/menu"
              className="px-8 py-4 bg-white text-dark font-medium rounded-md hover:bg-gray-100 transition duration-300"
            >
              View Our Menu
            </Link>
            <Link
              to="#reservations"
              className="px-8 py-4 bg-secondary-500 hover:bg-secondary-600 text-dark font-medium rounded-md transition duration-300"
            >
              Make a Reservation
            </Link>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <span className="text-white text-sm mb-2">Scroll to discover more</span>
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1">
          <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce mt-1"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;