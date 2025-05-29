import React, { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setEmail('');
  };
  
  return (
    <section className="py-20 bg-primary-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{ 
        backgroundImage: "url('https://images.pexels.com/photos/5560780/pexels-photo-5560780.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display mb-6">
            Join Our Aduanipa Family
          </h2>
          <p className="text-primary-200 mb-8">
            Subscribe to receive updates about our special events, new menu items, and cultural celebrations. Be the first to know about our traditional food festivals and seasonal offerings.
          </p>
          
          {isSubmitted ? (
            <div className="bg-primary-800 p-6 rounded-lg">
              <h3 className="text-xl font-display mb-2">Medaase! (Thank You!)</h3>
              <p className="text-primary-200">
                You've been added to our family. Get ready to receive exclusive updates from Aduanipa.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="flex-grow px-4 py-3 rounded-md bg-primary-800 border border-primary-700 focus:outline-none focus:ring-2 focus:ring-secondary-500 text-white placeholder-primary-400"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-secondary-500 hover:bg-secondary-600 text-dark font-medium rounded-md transition duration-300 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          )}
          
          <p className="text-primary-400 text-sm mt-4">
            We value your privacy. You can unsubscribe at any time.
          </p>
          
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-primary-300">
            <a href="#" className="hover:text-white transition-colors">WhatsApp Updates</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">SMS Notifications</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">Mobile App</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;