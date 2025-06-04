import { useState } from 'react';
import ReservationsList from '../../components/admin/ReservationsList';

const Reservations = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    console.log('Manually refreshing reservations...');
    setRefreshKey(prevKey => prevKey + 1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Reservation Management</h1>
        <button 
          onClick={handleRefresh}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Refresh Reservations
        </button>
      </div>
      <ReservationsList key={refreshKey} />
    </div>
  );
};

export default Reservations;