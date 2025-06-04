import { useState } from 'react';
import { locations } from '../data/locations';
import LocationCard from '../components/locations/LocationCard';
import LocationDetail from '../components/locations/LocationDetail';
import { RestaurantLocation } from '../types';
import { MapPin } from 'lucide-react';

const Locations = () => {
  const [selectedLocation, setSelectedLocation] = useState<RestaurantLocation | null>(null);
  
  const handleViewDetails = (location: RestaurantLocation) => {
    setSelectedLocation(location);
  };
  
  const handleCloseModal = () => {
    setSelectedLocation(null);
  };
  
  return (
    <>
      {/* Hero Banner */}
      <div className="relative h-80 bg-cover bg-center" style={{ backgroundImage: "url('https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Locations</h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Find an Elegance restaurant near you
            </p>
          </div>
        </div>
      </div>
      
      {/* Location Cards */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {locations.map((location) => (
              <LocationCard 
                key={location.id} 
                location={location}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Virtual Tour Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Virtual Tour</h2>
            <div className="w-16 h-1 bg-primary-600 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Experience the ambiance of our restaurants before you visit. Take a virtual tour of our Manhattan flagship location.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto bg-gray-100 rounded-lg aspect-video flex items-center justify-center">
            <div className="text-center p-6">
              <p className="text-gray-500 mb-4">Virtual tour experience would be embedded here.</p>
              <button className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors">
                Launch Virtual Tour
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Private Events Section */}
      <section className="py-16 bg-gray-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2 order-2 lg:order-1">
              <h2 className="text-3xl font-bold mb-6">
                Host Your Private Event with Us
              </h2>
              <div className="w-16 h-1 bg-primary-600 mb-6"></div>
              <p className="text-gray-300 mb-6">
                Whether you're planning a corporate event, wedding reception, or intimate celebration, our private dining rooms provide the perfect setting. Our dedicated events team will work with you to create a customized experience that exceeds your expectations.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 text-primary-500 mr-3 mt-0.5" />
                  <span>Private rooms for 10-100 guests</span>
                </li>
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 text-primary-500 mr-3 mt-0.5" />
                  <span>Customizable menus and beverage packages</span>
                </li>
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 text-primary-500 mr-3 mt-0.5" />
                  <span>Audio-visual equipment available</span>
                </li>
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 text-primary-500 mr-3 mt-0.5" />
                  <span>Dedicated event coordinator</span>
                </li>
              </ul>
              <a 
                href="mailto:events@elegance.com"
                className="inline-block px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-md transition-colors"
              >
                Inquire About Private Events
              </a>
            </div>
            <div className="w-full lg:w-1/2 order-1 lg:order-2">
              <img 
                src="https://images.pexels.com/photos/3887985/pexels-photo-3887985.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Private dining room" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Location Detail Modal */}
      {selectedLocation && (
        <LocationDetail location={selectedLocation} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default Locations;