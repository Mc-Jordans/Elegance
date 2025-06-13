import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ReservationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 2,
    special_requests: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errors = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[\d\s-]{10,}$/;

    if (!emailRegex.test(formData.email)) {
      errors.push('Please enter a valid email address');
    }
    if (!phoneRegex.test(formData.phone)) {
      errors.push('Please enter a valid phone number');
    }
    if (new Date(formData.date) < new Date()) {
      errors.push('Please select a future date');
    }
    if (!formData.time) {
      errors.push('Please select a time');
    }
    if (formData.guests < 1) {
      errors.push('Number of guests must be at least 1');
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const errors = validateForm();
      if (errors.length > 0) {
        throw new Error(errors.join('\n'));
      }

      const { error } = await supabase
        .from('reservations')
        .insert([
          { 
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            date: formData.date,
            time: formData.time,
            guests: parseInt(formData.guests.toString()),
            special_requests: formData.special_requests || null,
            status: 'pending',
            created_at: new Date().toISOString()
          }
        ]);

      if (error) {
        throw error;
      }
      
      // Show toast notification
      toast.success('Reservation submitted successfully! We will contact you to confirm your booking.', {
        duration: 5000,
        position: 'top-center'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: 2,
        special_requests: ''
      });
      
      // Stay on the same page but scroll to top
      window.scrollTo(0, 0);
    } catch (error: any) {
      console.error('Error submitting reservation:', error);
      toast.error(error.message || 'Failed to submit reservation', {
        duration: 5000,
        position: 'top-center'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get tomorrow's date in YYYY-MM-DD format for min date attribute
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div id="reservations" className="py-16 bg-dark text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-display text-center mb-12">Reserve Your Table</h2>
        

        
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-500"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-500"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-medium">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-500"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="guests" className="block text-sm font-medium">Number of Guests</label>
            <select
              id="guests"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-500"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                <option key={num} value={num}>{num} {num === 1 ? 'person' : 'people'}</option>
              ))}
              <option value="9">9+ people (large party)</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="date" className="block text-sm font-medium">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              min={minDate}
              required
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-500"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="time" className="block text-sm font-medium">Time</label>
            <select
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-500"
            >
              <option value="">Select a time</option>
              <option value="11:00">11:00 AM</option>
              <option value="11:30">11:30 AM</option>
              <option value="12:00">12:00 PM</option>
              <option value="12:30">12:30 PM</option>
              <option value="13:00">1:00 PM</option>
              <option value="13:30">1:30 PM</option>
              <option value="14:00">2:00 PM</option>
              <option value="18:00">6:00 PM</option>
              <option value="18:30">6:30 PM</option>
              <option value="19:00">7:00 PM</option>
              <option value="19:30">7:30 PM</option>
              <option value="20:00">8:00 PM</option>
              <option value="20:30">8:30 PM</option>
              <option value="21:00">9:00 PM</option>
            </select>
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <label htmlFor="special_requests" className="block text-sm font-medium">Special Requests (Optional)</label>
            <textarea
              id="special_requests"
              name="special_requests"
              value={formData.special_requests}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-500"
            ></textarea>
          </div>
          
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-6 bg-secondary-500 hover:bg-secondary-600 text-dark font-medium rounded-md transition duration-300 disabled:opacity-70"
            >
              {isSubmitting ? 'Submitting...' : 'Reserve Now'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReservationForm;