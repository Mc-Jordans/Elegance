import React from 'react';
import { newsItems } from '../../data/news';
import { Calendar } from 'lucide-react';

const News = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display text-dark mb-4">
            Latest News & Special Offers
          </h2>
          <div className="w-20 h-1 bg-secondary-500 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest happenings at Elegance, from seasonal menu launches to special events and exclusive promotions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item) => (
            <div 
              key={item.id}
              className="bg-gray-50 rounded-lg overflow-hidden shadow-md transition-transform hover:shadow-lg hover:-translate-y-1 duration-300"
            >
              <div className="h-60 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-3 text-gray-500">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="text-sm">{item.date}</span>
                </div>
                <h3 className="font-display text-xl text-dark mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.summary}</p>
                <a 
                  href={item.url}
                  className="inline-block text-primary-600 font-medium hover:text-primary-800 transition-colors"
                >
                  Read more →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;