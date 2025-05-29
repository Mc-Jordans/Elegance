import React from 'react';
import { instagramPosts } from '../../data/news';
import { Instagram, Heart } from 'lucide-react';

const InstagramFeed = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display text-dark mb-4">
            Follow Us on Instagram
          </h2>
          <div className="w-20 h-1 bg-secondary-500 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-3xl mx-auto flex items-center justify-center gap-2">
            <Instagram className="h-5 w-5" />
            <span>@elegance_restaurant</span>
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {instagramPosts.map((post) => (
            <a 
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden aspect-square rounded-md"
            >
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-dark bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="text-white p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center justify-center mb-2">
                    <Heart className="h-5 w-5 text-white mr-1 fill-current" />
                    <span className="text-sm">{post.likes}</span>
                  </div>
                  <p className="text-sm text-center line-clamp-3">{post.caption}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;