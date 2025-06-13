// Mock data for reservations when database is not available
export const mockReservations = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '555-123-4567',
    date: '2023-06-15',
    time: '19:30',
    guests: 4,
    special_requests: 'Window seat please',
    status: 'confirmed',
    created_at: '2023-06-10T12:00:00Z',
    last_updated: '2023-06-10T12:00:00Z'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '555-987-6543',
    date: '2023-06-16',
    time: '20:00',
    guests: 2,
    special_requests: null,
    status: 'pending',
    created_at: '2023-06-11T14:30:00Z',
    last_updated: '2023-06-11T14:30:00Z'
  },
  {
    id: '3',
    name: 'Robert Johnson',
    email: 'robert@example.com',
    phone: '555-555-5555',
    date: '2023-06-18',
    time: '18:30',
    guests: 6,
    special_requests: 'Birthday celebration',
    status: 'pending',
    created_at: '2023-06-12T09:15:00Z',
    last_updated: '2023-06-12T09:15:00Z'
  }
];