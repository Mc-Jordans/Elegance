import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { toast } from 'react-hot-toast';

type Reservation = {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  special_requests: string | null;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
  last_updated: string;
};

const ReservationsList = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all');

  useEffect(() => {
    fetchReservations();
  }, [filter]);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      
      // Mock data instead of fetching from database
      const mockReservations: Reservation[] = [
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
        }
      ];
      
      // Filter mock data if needed
      const filteredReservations = filter === 'all' 
        ? mockReservations 
        : mockReservations.filter(r => r.status === filter);
      
      setReservations(filteredReservations);
      setError(null);
    } catch (error: any) {
      console.error('Error fetching reservations:', error);
      setError('Failed to load reservations');
      toast.error('Failed to load reservations');
    } finally {
      setLoading(false);
    }
  };

  const updateReservationStatus = async (id: string, status: 'confirmed' | 'cancelled') => {
    try {
      // Update local state only (mock)
      setReservations(prev => 
        prev.map(res => res.id === id ? { ...res, status } : res)
      );
      
      toast.success(`Reservation ${status} successfully`);
    } catch (error: any) {
      console.error('Error updating reservation:', error);
      toast.error('Failed to update reservation status');
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeStr: string) => {
    // Convert 24-hour format to 12-hour format
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Reservations</h3>
            <p className="mt-1 text-sm text-gray-500">Manage customer table reservations</p>
          </div>
          <div className="flex gap-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <button
              onClick={() => fetchReservations()}
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="text-center py-8">Loading reservations...</div>
      ) : error ? (
        <div className="text-center py-8 text-red-500">{error}</div>
      ) : reservations.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No reservations found</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Party Size
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reservations.map((reservation) => (
                <tr key={reservation.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{reservation.name}</div>
                    <div className="text-sm text-gray-500">{reservation.email}</div>
                    <div className="text-sm text-gray-500">{reservation.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatDate(reservation.date)}</div>
                    <div className="text-sm text-gray-500">{formatTime(reservation.time)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {reservation.guests} {reservation.guests === 1 ? 'person' : 'people'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(reservation.status)}`}>
                      {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {reservation.status === 'pending' && (
                      <>
                        <button
                          onClick={() => updateReservationStatus(reservation.id, 'confirmed')}
                          className="text-green-600 hover:text-green-900 mr-3"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => updateReservationStatus(reservation.id, 'cancelled')}
                          className="text-red-600 hover:text-red-900"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {reservation.status === 'confirmed' && (
                      <button
                        onClick={() => updateReservationStatus(reservation.id, 'cancelled')}
                        className="text-red-600 hover:text-red-900"
                      >
                        Cancel
                      </button>
                    )}
                    {reservation.status === 'cancelled' && (
                      <button
                        onClick={() => updateReservationStatus(reservation.id, 'confirmed')}
                        className="text-green-600 hover:text-green-900"
                      >
                        Restore
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReservationsList;