import { RestaurantLocation } from '../types';

export const locations: RestaurantLocation[] = [
  {
    id: 'loc-1',
    name: 'Elegance Manhattan',
    address: '123 Gourmet Avenue',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    phone: '(212) 555-1234',
    email: 'manhattan@elegance.com',
    hours: {
      monday: '11:30 AM - 10:00 PM',
      tuesday: '11:30 AM - 10:00 PM',
      wednesday: '11:30 AM - 10:00 PM',
      thursday: '11:30 AM - 10:00 PM',
      friday: '11:30 AM - 11:00 PM',
      saturday: '11:30 AM - 11:00 PM',
      sunday: '10:30 AM - 9:00 PM'
    },
    coordinates: {
      lat: 40.7128,
      lng: -74.0060
    },
    hasPrivateDining: true,
    parkingInfo: 'Valet parking available for $20. Public parking garage located one block away.',
    image: 'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 'loc-2',
    name: 'Elegance San Francisco',
    address: '456 Culinary Boulevard',
    city: 'San Francisco',
    state: 'CA',
    zip: '94103',
    phone: '(415) 555-6789',
    email: 'sanfrancisco@elegance.com',
    hours: {
      monday: '11:30 AM - 10:00 PM',
      tuesday: '11:30 AM - 10:00 PM',
      wednesday: '11:30 AM - 10:00 PM',
      thursday: '11:30 AM - 10:00 PM',
      friday: '11:30 AM - 11:00 PM',
      saturday: '11:30 AM - 11:00 PM',
      sunday: '10:30 AM - 9:00 PM'
    },
    coordinates: {
      lat: 37.7749,
      lng: -122.4194
    },
    hasPrivateDining: true,
    parkingInfo: 'Validated parking available at the Union Square Garage.',
    image: 'https://images.pexels.com/photos/2290753/pexels-photo-2290753.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 'loc-3',
    name: 'Elegance Chicago',
    address: '789 Flavor Street',
    city: 'Chicago',
    state: 'IL',
    zip: '60611',
    phone: '(312) 555-9012',
    email: 'chicago@elegance.com',
    hours: {
      monday: '11:30 AM - 10:00 PM',
      tuesday: '11:30 AM - 10:00 PM',
      wednesday: '11:30 AM - 10:00 PM',
      thursday: '11:30 AM - 10:00 PM',
      friday: '11:30 AM - 11:00 PM',
      saturday: '11:30 AM - 11:00 PM',
      sunday: '10:30 AM - 9:00 PM'
    },
    coordinates: {
      lat: 41.8781,
      lng: -87.6298
    },
    hasPrivateDining: true,
    parkingInfo: 'Valet parking available. Several public parking options within walking distance.',
    image: 'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];