import React from 'react';
import { RestaurantLocation } from '../../types';
import { MapPin, Phone, Mail, Clock, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LocationCardProps {
  location: RestaurantLocation;
  onViewDetails: (location: RestaurantLocation) => void;
}

const LocationCard: React.FC<LocationCardProps> = ({ location, onViewDetails }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-48 overflow-hidden">
        <img 
          src={location.image} 
          alt={location.name} 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
      
      <div className="p-6">
        <h3 className="font-display text-xl text-dark mb-4">{location.name}</h3>
        
        <ul className="space-y-3 mb-6">
          <li className="flex items-start text-gray-600">
            <MapPin className="h-5 w-5 text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
            <span>{location.address}, {location.city}, {location.state} {location.zip}</span>
          </li>
          <li className="flex items-center text-gray-600">
            <Phone className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0" />
            <span>{location.phone}</span>
          </li>
          <li className="flex items-center text-gray-600">
            <Clock className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0" />
            <div>
              <p className="font-medium">Today's Hours:</p>
              <p>{location.hours.monday}</p>
            </div>
          </li>
          {location.hasPrivateDining && (
            <li className="flex items-center text-gray-600">
              <Users className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0" />
              <span>Private dining available</span>
            </li>
          )}
        </ul>
        
        <div className="flex gap-4">
          <button
            onClick={() => onViewDetails(location)}
            className="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md transition-colors"
          >
            View Details
          </button>
          <Link
            to="#reservations"
            className="flex-1 px-4 py-2 bg-secondary-500 hover:bg-secondary-600 text-dark font-medium rounded-md transition-colors text-center"
          >
            Reserve
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;