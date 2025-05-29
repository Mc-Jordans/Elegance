import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Facebook, Instagram, Twitter, MapPin, Phone, Mail, Clock } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark text-white pt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Restaurant Info */}
          <div>
            <Link to="/" className="flex items-center space-x-2 font-display text-2xl mb-4">
              <ChefHat className="h-8 w-8 text-secondary-500" />
              <span>Elegance</span>
            </Link>
            <p className="text-gray-400 mb-6">
              Exceptional cuisine, elegant ambiance, and impeccable service for a truly memorable dining experience.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-display text-xl mb-6 after:content-[''] after:block after:w-10 after:h-1 after:bg-secondary-500 after:mt-2">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/menu" className="text-gray-400 hover:text-white transition-colors">Our Menu</Link></li>
              <li><Link to="/order" className="text-gray-400 hover:text-white transition-colors">Order Online</Link></li>
              <li><Link to="/locations" className="text-gray-400 hover:text-white transition-colors">Locations</Link></li>
              <li><Link to="/feedback" className="text-gray-400 hover:text-white transition-colors">Feedback</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Private Events</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Gift Cards</a></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="font-display text-xl mb-6 after:content-[''] after:block after:w-10 after:h-1 after:bg-secondary-500 after:mt-2">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-secondary-500 mr-3 mt-0.5" />
                <span className="text-gray-400">123 Gourmet Avenue<br />New York, NY 10001</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-secondary-500 mr-3" />
                <a href="tel:+12125551234" className="text-gray-400 hover:text-white transition-colors">(212) 555-1234</a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-secondary-500 mr-3" />
                <a href="mailto:info@elegance.com" className="text-gray-400 hover:text-white transition-colors">info@elegance.com</a>
              </li>
            </ul>
          </div>
          
          {/* Opening Hours */}
          <div>
            <h3 className="font-display text-xl mb-6 after:content-[''] after:block after:w-10 after:h-1 after:bg-secondary-500 after:mt-2">Opening Hours</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Clock className="h-5 w-5 text-secondary-500 mr-3 mt-0.5" />
                <div>
                  <p className="text-white">Monday - Thursday</p>
                  <p className="text-gray-400">11:30 AM - 10:00 PM</p>
                </div>
              </li>
              <li className="flex items-start">
                <Clock className="h-5 w-5 text-secondary-500 mr-3 mt-0.5" />
                <div>
                  <p className="text-white">Friday - Saturday</p>
                  <p className="text-gray-400">11:30 AM - 11:00 PM</p>
                </div>
              </li>
              <li className="flex items-start">
                <Clock className="h-5 w-5 text-secondary-500 mr-3 mt-0.5" />
                <div>
                  <p className="text-white">Sunday</p>
                  <p className="text-gray-400">10:30 AM - 9:00 PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Newsletter */}
        <div className="border-t border-gray-800 pt-8 pb-6">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="font-display text-xl mb-4">Subscribe to Our Newsletter</h3>
            <p className="text-gray-400 mb-6">Stay updated with our latest menu offerings, special events, and exclusive promotions.</p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-500"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-secondary-500 hover:bg-secondary-600 text-dark font-medium rounded-md transition duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-800 py-6 text-center text-sm text-gray-500">
          <p>&copy; {currentYear} Elegance Restaurant. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;