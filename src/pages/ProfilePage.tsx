// src/pages/ProfilePage.tsx
import { useState, useEffect } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import { supabase } from '../lib/supabaseClient';
import { toast } from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import { ShoppingCart, Heart, User, Package, LogOut, Edit2, Save, X, Phone, MapPin, Mail } from 'lucide-react';

const ProfilePage = () => {
  const { user, signOut } = useAuthContext();
  const navigate = useNavigate();
  const { items: cartItems, cartTotal, removeFromCart } = useCart();
  const { wishlistItems, removeFromWishlist } = useWishlist();
  
  const [profile, setProfile] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: ''
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      navigate('/');
      return;
    }

    // Fetch user profile
    const fetchProfile = async () => {
      try {
        // First check if profile exists
        const { data, error } = await supabase
          .from('profiles')
          .select('id, first_name, last_name, user_id')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error && error.code !== 'PGRST116') {
          // PGRST116 is the error code for no rows returned
          throw error;
        }

        if (data) {
          // Profile exists, use it
          const profileData = {
            id: data.id,
            firstName: data.first_name || '',
            lastName: data.last_name || '',
            email: user.email || '',
            phone: '', // These fields don't exist in the database schema
            address: ''
          };
          
          setProfile(profileData);
          setEditedProfile({
            firstName: profileData.firstName,
            lastName: profileData.lastName,
            phone: '',
            address: ''
          });
        } else {
          // Skip profile creation if it doesn't exist
          // Just use the user data we have from auth
          const profileData = {
            id: '',
            firstName: '',
            lastName: '',
            email: user.email || '',
            phone: '',
            address: ''
          };
          
          setProfile(profileData);
          setEditedProfile({
            firstName: '',
            lastName: '',
            phone: '',
            address: ''
          });
          setIsLoading(false);
          return;
          

        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        // Still set basic profile data from auth
        setProfile({
          id: '',
          firstName: '',
          lastName: '',
          email: user.email || '',
          phone: '',
          address: ''
        });
        setEditedProfile({
          firstName: '',
          lastName: '',
          phone: '',
          address: ''
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user, navigate]);

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };
  
  const handleEditProfile = () => {
    setIsEditing(true);
  };
  
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedProfile({
      firstName: profile.firstName,
      lastName: profile.lastName,
      phone: profile.phone,
      address: profile.address
    });
  };
  
  const handleSaveProfile = async () => {
    try {
      // Skip database update if we don't have a profile ID
      // Just update the local state
      if (!user || !profile.id) {
        setProfile({
          ...profile,
          firstName: editedProfile.firstName,
          lastName: editedProfile.lastName,
          phone: editedProfile.phone,
          address: editedProfile.address
        });
        
        setIsEditing(false);
        toast.success('Profile updated locally');
        return;
      }
      
      // Only update fields that exist in the database schema
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: editedProfile.firstName,
          last_name: editedProfile.lastName
        })
        .eq('id', profile.id);
      
      if (error) throw error;
      
      setProfile({
        ...profile,
        firstName: editedProfile.firstName,
        lastName: editedProfile.lastName,
        phone: editedProfile.phone,
        address: editedProfile.address
      });
      
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (isLoading) {
    return <div className="container mx-auto px-4 py-16 text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">My Account</h1>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-72 bg-white shadow-md rounded-lg p-6 h-fit">
            <div className="flex items-center space-x-4 mb-8 pb-6 border-b">
              <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center">
                <User size={32} className="text-primary-600" />
              </div>
              <div>
                <p className="font-medium text-lg">{profile.firstName || 'Welcome'} {profile.lastName}</p>
                <p className="text-sm text-gray-500">{profile.email}</p>
              </div>
            </div>
            
            <nav>
              <button 
                onClick={() => setActiveTab('profile')}
                className={`flex items-center space-x-2 w-full text-left px-3 py-2 rounded-md mb-1 ${activeTab === 'profile' ? 'bg-primary-50 text-primary-600' : 'hover:bg-gray-100'}`}
              >
                <User size={18} />
                <span>Profile</span>
              </button>
              <button 
                onClick={() => setActiveTab('orders')}
                className={`flex items-center space-x-2 w-full text-left px-3 py-2 rounded-md mb-1 ${activeTab === 'orders' ? 'bg-primary-50 text-primary-600' : 'hover:bg-gray-100'}`}
              >
                <Package size={18} />
                <span>Orders</span>
              </button>
              <button 
                onClick={() => setActiveTab('cart')}
                className={`flex items-center space-x-2 w-full text-left px-3 py-2 rounded-md mb-1 ${activeTab === 'cart' ? 'bg-primary-50 text-primary-600' : 'hover:bg-gray-100'}`}
              >
                <ShoppingCart size={18} />
                <span>Cart</span>
                {cartItems.length > 0 && (
                  <span className="ml-auto bg-primary-100 text-primary-600 text-xs px-2 py-1 rounded-full">
                    {cartItems.length}
                  </span>
                )}
              </button>
              <button 
                onClick={() => setActiveTab('wishlist')}
                className={`flex items-center space-x-2 w-full text-left px-3 py-2 rounded-md mb-1 ${activeTab === 'wishlist' ? 'bg-primary-50 text-primary-600' : 'hover:bg-gray-100'}`}
              >
                <Heart size={18} />
                <span>Wishlist</span>
                {wishlistItems.length > 0 && (
                  <span className="ml-auto bg-primary-100 text-primary-600 text-xs px-2 py-1 rounded-full">
                    {wishlistItems.length}
                  </span>
                )}
              </button>
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-2 w-full text-left px-3 py-2 rounded-md text-red-600 hover:bg-red-50 mt-6"
              >
                <LogOut size={18} />
                <span>Sign Out</span>
              </button>
            </nav>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'profile' && (
              <div className="bg-white shadow-md rounded-lg p-8">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-semibold">Personal Information</h2>
                  {!isEditing ? (
                    <button 
                      onClick={handleEditProfile}
                      className="flex items-center space-x-1 text-sm text-primary-600 hover:text-primary-700"
                    >
                      <Edit2 size={16} />
                      <span>Edit</span>
                    </button>
                  ) : (
                    <div className="flex space-x-2">
                      <button 
                        onClick={handleCancelEdit}
                        className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-700"
                      >
                        <X size={16} />
                        <span>Cancel</span>
                      </button>
                      <button 
                        onClick={handleSaveProfile}
                        className="flex items-center space-x-1 text-sm text-primary-600 hover:text-primary-700"
                      >
                        <Save size={16} />
                        <span>Save</span>
                      </button>
                    </div>
                  )}
                </div>
                
                {!isEditing ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-gray-50 p-4 rounded-lg flex items-start">
                      <User className="text-primary-600 mr-3 mt-1" size={20} />
                      <div>
                        <p className="text-sm text-gray-500 mb-1">First Name</p>
                        <p className="font-medium text-lg">{profile.firstName || 'Not provided'}</p>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg flex items-start">
                      <User className="text-primary-600 mr-3 mt-1" size={20} />
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Last Name</p>
                        <p className="font-medium text-lg">{profile.lastName || 'Not provided'}</p>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg flex items-start">
                      <Mail className="text-primary-600 mr-3 mt-1" size={20} />
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Email</p>
                        <p className="font-medium text-lg">{profile.email}</p>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg flex items-start">
                      <Phone className="text-primary-600 mr-3 mt-1" size={20} />
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Phone</p>
                        <p className="font-medium text-lg">{profile.phone || 'Not provided'}</p>
                      </div>
                    </div>
                    <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg flex items-start">
                      <MapPin className="text-primary-600 mr-3 mt-1" size={20} />
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Address</p>
                        <p className="font-medium text-lg">{profile.address || 'Not provided'}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <User className="text-primary-600 mr-2" size={18} />
                        <label className="block text-sm font-medium text-gray-700">First Name</label>
                      </div>
                      <input
                        type="text"
                        name="firstName"
                        value={editedProfile.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <User className="text-primary-600 mr-2" size={18} />
                        <label className="block text-sm font-medium text-gray-700">Last Name</label>
                      </div>
                      <input
                        type="text"
                        name="lastName"
                        value={editedProfile.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Mail className="text-primary-600 mr-2" size={18} />
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                      </div>
                      <input
                        type="email"
                        id="profile-email"
                        value={profile.email}
                        disabled
                        className="w-full px-4 py-3 border rounded-md bg-gray-100 text-gray-500"
                      />
                      <p className="text-xs text-gray-500 mt-2">Contact support to change email</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Phone className="text-primary-600 mr-2" size={18} />
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        value={editedProfile.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <MapPin className="text-primary-600 mr-2" size={18} />
                        <label className="block text-sm font-medium text-gray-700">Address</label>
                      </div>
                      <input
                        type="text"
                        name="address"
                        value={editedProfile.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'orders' && (
              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-6">My Orders</h2>
                <div className="text-center py-8 text-gray-500">
                  <Package size={48} className="mx-auto mb-4 text-gray-400" />
                  <p>You haven't placed any orders yet.</p>
                  <Link to="/order-online" className="mt-4 inline-block px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
                    Start Ordering
                  </Link>
                </div>
              </div>
            )}
            
            {activeTab === 'cart' && (
              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-6">My Cart</h2>
                {cartItems.length > 0 ? (
                  <div>
                    <div className="divide-y">
                      {cartItems.map(item => (
                        <div key={item.id} className="py-4 flex items-center">
                          <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden mr-4">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                            <p className="text-primary-600">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id, item.name)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 pt-4 border-t">
                      <div className="flex justify-between mb-4">
                        <span className="font-medium">Total:</span>
                        <span className="font-bold text-lg">${cartTotal.toFixed(2)}</span>
                      </div>
                      <Link 
                        to="/checkout" 
                        className="w-full block text-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                      >
                        Proceed to Checkout
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <ShoppingCart size={48} className="mx-auto mb-4 text-gray-400" />
                    <p>Your cart is empty.</p>
                    <Link to="/order-online" className="mt-4 inline-block px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
                      Browse Menu
                    </Link>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'wishlist' && (
              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-6">My Wishlist</h2>
                {wishlistItems.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {wishlistItems.map(item => (
                      <div key={item.id} className="border rounded-md p-4 flex">
                        <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden mr-4">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-primary-600">${item.price.toFixed(2)}</p>
                          <div className="mt-2 flex space-x-2">
                            <Link 
                              to={`/order-online?product=${item.id}`}
                              className="text-xs px-2 py-1 bg-primary-600 text-white rounded hover:bg-primary-700"
                            >
                              View Item
                            </Link>
                            <button 
                              onClick={() => removeFromWishlist(item.id, item.name)}
                              className="text-xs px-2 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Heart size={48} className="mx-auto mb-4 text-gray-400" />
                    <p>Your wishlist is empty.</p>
                    <Link to="/order-online" className="mt-4 inline-block px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
                      Browse Menu
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
