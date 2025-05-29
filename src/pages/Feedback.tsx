import React, { useState } from 'react';
import { reviews } from '../data/reviews';
import ReviewCard from '../components/feedback/ReviewCard';
import { Star, Image, MapPin, Send } from 'lucide-react';

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
    rating: 5,
    comment: '',
    fileUpload: null,
    consent: false,
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };
  
  const handleStarClick = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would connect to an API
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
    
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      location: '',
      rating: 5,
      comment: '',
      fileUpload: null,
      consent: false,
    });
  };
  
  return (
    <>
      {/* Hero Banner */}
      <div className="relative h-80 bg-cover bg-center" style={{ backgroundImage: "url('https://images.pexels.com/photos/1484516/pexels-photo-1484516.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')" }}>
        <div className="absolute inset-0 bg-dark bg-opacity-60"></div>
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-display text-white mb-4">Customer Feedback</h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              We value your opinion. Share your experience with us.
            </p>
          </div>
        </div>
      </div>
      
      {/* Feedback Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display text-dark mb-4">Share Your Experience</h2>
              <div className="w-16 h-1 bg-secondary-500 mx-auto mb-6"></div>
              <p className="text-gray-600">
                Your feedback helps us improve our services and create better dining experiences for everyone.
              </p>
            </div>
            
            {formSubmitted ? (
              <div className="bg-green-50 text-green-800 p-8 rounded-lg text-center">
                <h3 className="font-display text-2xl mb-4">Thank You for Your Feedback!</h3>
                <p className="mb-6">We greatly appreciate you taking the time to share your experience with us.</p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                >
                  Submit Another Review
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="location" className="block text-gray-700 font-medium mb-2">Restaurant Location</label>
                  <select
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  >
                    <option value="">Select Location</option>
                    <option value="Manhattan">Manhattan</option>
                    <option value="San Francisco">San Francisco</option>
                    <option value="Chicago">Chicago</option>
                  </select>
                </div>
                
                <div className="mb-6">
                  <span className="block text-gray-700 font-medium mb-2">Your Rating</span>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onMouseEnter={() => setHoveredStar(star)}
                        onMouseLeave={() => setHoveredStar(null)}
                        onClick={() => handleStarClick(star)}
                        className="p-1"
                      >
                        <Star
                          className={`h-8 w-8 ${
                            (hoveredStar !== null ? star <= hoveredStar : star <= formData.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="comment" className="block text-gray-700 font-medium mb-2">Your Review</label>
                  <textarea
                    id="comment"
                    name="comment"
                    rows={5}
                    value={formData.comment}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Share your experience with us..."
                    required
                  ></textarea>
                </div>
                
                <div className="mb-8">
                  <span className="block text-gray-700 font-medium mb-2">Upload Photos (Optional)</span>
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="fileUpload"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Image className="w-8 h-8 mb-3 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-medium">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">JPG, PNG or HEIC (MAX. 5MB)</p>
                      </div>
                      <input 
                        id="fileUpload" 
                        name="fileUpload" 
                        type="file" 
                        className="hidden" 
                        accept="image/png, image/jpeg, image/heic"
                      />
                    </label>
                  </div>
                </div>
                
                <div className="mb-8">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleChange}
                      required
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-gray-600 text-sm">
                      I agree that my review may be published on the website and social media.
                    </span>
                  </label>
                </div>
                
                <button
                  type="submit"
                  className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  <span>Submit Your Review</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display text-dark mb-4">What Our Customers Say</h2>
            <div className="w-16 h-1 bg-secondary-500 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Read reviews from our valued guests about their dining experiences at Elegance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">We respond to all feedback within 24-48 hours.</p>
            <p className="text-gray-600">
              Have a specific concern? Contact our customer care team at{' '}
              <a href="mailto:care@elegance.com" className="text-primary-600 hover:text-primary-800 transition-colors">
                care@elegance.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Feedback;