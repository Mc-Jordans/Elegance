import React, { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would connect to an API
    setIsSubmitted(true);
    setEmail('');
  };
  
  return (
    <section className="py-20 bg-primary-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display mb-6">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-primary-200 mb-8">
            Join our mailing list to receive updates on special events, seasonal menus, and exclusive offers. Be the first to know about what's happening at Elegance.
          </p>
          
          {isSubmitted ? (
            <div className="bg-primary-800 p-6 rounded-lg">
              <h3 className="text-xl font-display mb-2">Thank You for Subscribing!</h3>
              <p className="text-primary-200">
                You've been added to our mailing list. Get ready to receive exclusive updates from Elegance.
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
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;