import React from 'react';
import { RestaurantLocation } from '../../types';
import { MapPin, Phone, Mail, Clock, Users, Car, X } from 'lucide-react';

interface LocationDetailProps {
  location: RestaurantLocation;
  onClose: () => void;
}

const LocationDetail: React.FC<LocationDetailProps> = ({ location, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 px-4 py-6">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative h-60 md:h-80 overflow-hidden">
          <img 
            src={location.image} 
            alt={location.name} 
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <X size={20} className="text-dark" />
          </button>
        </div>
        
        <div className="p-6 md:p-8">
          <h2 className="font-display text-2xl md:text-3xl text-dark mb-6">{location.name}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div>
              <h3 className="font-display text-xl text-dark mb-4">Contact Information</h3>
              <ul className="space-y-4">
                <li className="flex items-start text-gray-600">
                  <MapPin className="h-5 w-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p>{location.address}</p>
                    <p>{location.city}, {location.state} {location.zip}</p>
                  </div>
                </li>
                <li className="flex items-center text-gray-600">
                  <Phone className="h-5 w-5 text-primary-500 mr-3 flex-shrink-0" />
                  <a href={`tel:${location.phone}`} className="hover:text-primary-600 transition-colors">
                    {location.phone}
                  </a>
                </li>
                <li className="flex items-center text-gray-600">
                  <Mail className="h-5 w-5 text-primary-500 mr-3 flex-shrink-0" />
                  <a href={`mailto:${location.email}`} className="hover:text-primary-600 transition-colors">
                    {location.email}
                  </a>
                </li>
              </ul>
              
              {/* Parking Information */}
              <h3 className="font-display text-xl text-dark mt-8 mb-4">Parking Information</h3>
              <div className="flex items-start text-gray-600">
                <Car className="h-5 w-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                <p>{location.parkingInfo}</p>
              </div>
              
              {/* Private Dining */}
              {location.hasPrivateDining && (
                <>
                  <h3 className="font-display text-xl text-dark mt-8 mb-4">Private Dining</h3>
                  <div className="flex items-start text-gray-600">
                    <Users className="h-5 w-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p>Private dining rooms available for special events and gatherings.</p>
                      <p className="mt-2">For inquiries and reservations, please contact us at <a href={`mailto:${location.email}`} className="text-primary-600 hover:text-primary-800 transition-colors">{location.email}</a>.</p>
                    </div>
                  </div>
                </>
              )}
            </div>
            
            {/* Hours & Map */}
            <div>
              <h3 className="font-display text-xl text-dark mb-4">Hours of Operation</h3>
              <div className="bg-gray-50 p-4 rounded-md mb-6">
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="font-medium">Monday</span>
                    <span>{location.hours.monday}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-medium">Tuesday</span>
                    <span>{location.hours.tuesday}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-medium">Wednesday</span>
                    <span>{location.hours.wednesday}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-medium">Thursday</span>
                    <span>{location.hours.thursday}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-medium">Friday</span>
                    <span>{location.hours.friday}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-medium">Saturday</span>
                    <span>{location.hours.saturday}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-medium">Sunday</span>
                    <span>{location.hours.sunday}</span>
                  </li>
                </ul>
              </div>
              
              {/* Map (Placeholder - In a real app, this would be an actual map component) */}
              <h3 className="font-display text-xl text-dark mb-4">Map & Directions</h3>
              <div className="bg-gray-100 h-60 rounded-md flex items-center justify-center">
                <div className="text-center">
                  <p className="text-gray-500 mb-2">Interactive map would be here</p>
                  <a 
                    href={`https://maps.google.com/?q=${location.address}, ${location.city}, ${location.state} ${location.zip}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-800 transition-colors"
                  >
                    Get Directions
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-dark rounded-md transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationDetail;