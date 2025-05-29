import { RestaurantLocation } from '../types';

export const locations: RestaurantLocation[] = [
  {
    id: 'loc-1',
    name: 'Aduanipa Accra',
    address: '15 Independence Avenue',
    city: 'Accra',
    state: 'Greater Accra',
    zip: '00233',
    phone: '+233 20 123 4567',
    email: 'accra@aduanipa.com',
    hours: {
      monday: '11:00 - 22:00',
      tuesday: '11:00 - 22:00',
      wednesday: '11:00 - 22:00',
      thursday: '11:00 - 22:00',
      friday: '11:00 - 23:00',
      saturday: '11:00 - 23:00',
      sunday: '12:00 - 21:00'
    },
    coordinates: {
      lat: 5.6037,
      lng: -0.1870
    },
    hasPrivateDining: true,
    parkingInfo: 'Secure parking available on premises. Valet service available.',
    image: 'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg'
  },
  {
    id: 'loc-2',
    name: 'Aduanipa Kumasi',
    address: '10 Harper Road, Ahodwo',
    city: 'Kumasi',
    state: 'Ashanti Region',
    zip: '00233',
    phone: '+233 20 234 5678',
    email: 'kumasi@aduanipa.com',
    hours: {
      monday: '11:00 - 22:00',
      tuesday: '11:00 - 22:00',
      wednesday: '11:00 - 22:00',
      thursday: '11:00 - 22:00',
      friday: '11:00 - 23:00',
      saturday: '11:00 - 23:00',
      sunday: '12:00 - 21:00'
    },
    coordinates: {
      lat: 6.6885,
      lng: -1.6244
    },
    hasPrivateDining: true,
    parkingInfo: 'Free parking available in front of restaurant.',
    image: 'https://images.pexels.com/photos/2290753/pexels-photo-2290753.jpeg'
  },
  {
    id: 'loc-3',
    name: 'Aduanipa Tamale',
    address: '5 Dagomba Road',
    city: 'Tamale',
    state: 'Northern Region',
    zip: '00233',
    phone: '+233 20 345 6789',
    email: 'tamale@aduanipa.com',
    hours: {
      monday: '11:00 - 22:00',
      tuesday: '11:00 - 22:00',
      wednesday: '11:00 - 22:00',
      thursday: '11:00 - 22:00',
      friday: '11:00 - 23:00',
      saturday: '11:00 - 23:00',
      sunday: '12:00 - 21:00'
    },
    coordinates: {
      lat: 9.4067,
      lng: -0.8393
    },
    hasPrivateDining: true,
    parkingInfo: 'Ample parking space available.',
    image: 'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg'
  }
];