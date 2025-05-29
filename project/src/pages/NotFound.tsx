import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        <ChefHat className="h-20 w-20 text-secondary-500 mx-auto mb-6" />
        <h1 className="text-5xl font-display text-dark mb-4">404</h1>
        <h2 className="text-2xl font-display text-dark mb-6">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          We couldn't find the page you're looking for. The table you requested might have been moved or doesn't exist.
        </p>
        <Link 
          to="/"
          className="inline-block px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md transition-colors"
        >
          Return to Home Page
        </Link>
      </div>
    </div>
  );
};

export default NotFound;