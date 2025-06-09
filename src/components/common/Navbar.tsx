import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, ChefHat, User } from 'lucide-react';
import { useAuthContext } from '../../contexts/AuthContext';
import AuthModal from '../auth/AuthModal';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const handleReservationClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById('reservations');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const handleAuthClick = () => {
    if (user) {
      // Navigate to profile page when user is logged in
      navigate('/profile');
    } else {
      setAuthMode('login');
      setShowAuthModal(true);
    }
  };

  const handleSignUpClick = () => {
    setAuthMode('register');
    setShowAuthModal(true);
  };
  
  const navLinkClasses = ({ isActive }: { isActive: boolean }) => 
    `relative px-3 py-2 transition-colors hover:text-secondary-500 ${
      isActive ? 'text-secondary-500' : 'text-current'
    } after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-secondary-500 after:scale-x-0 after:origin-center after:transition-transform hover:after:scale-x-100 ${
      isActive ? 'after:scale-x-100' : ''
    }`;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-dark bg-opacity-95 text-white shadow-lg' : 'bg-transparent text-white'
    }`}>
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        mode={authMode}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <NavLink to="/" className="flex items-center space-x-2 font-display text-2xl">
            <ChefHat className="h-8 w-8" />
            <span>Elegance</span>
          </NavLink>
          
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/" className={navLinkClasses}>Fie (Home)</NavLink>
            <NavLink to="/menu" className={navLinkClasses}>Aduane (Menu)</NavLink>
            <NavLink to="/order-online" className={navLinkClasses}>Order Online</NavLink>
            <NavLink to="/locations" className={navLinkClasses}>Locations</NavLink>
            <NavLink to="/feedback" className={navLinkClasses}>Feedback</NavLink>
            <button 
              onClick={handleReservationClick}
              className="px-6 py-2 rounded-md bg-secondary-500 hover:bg-secondary-600 text-dark font-medium transition duration-300"
            >
              Reserve Table
            </button>
            <div className="flex items-center space-x-2">
              {/* {!user && (
                <button
                  onClick={handleSignUpClick}
                  className="text-sm text-white hover:text-secondary-500 transition-colors"
                >
                  Sign Up
                </button>
              )} */}
              <button
                onClick={handleAuthClick}
                className="p-2 rounded-full hover:bg-gray-700 transition-colors flex items-center"
                aria-label={user ? "Account" : "Sign In"}
              >
                <User size={20} />
                {/* {user ? (
                  <span className="ml-1 w-2 h-2 bg-green-500 rounded-full"></span>
                ) : (
                  <span className="ml-1 text-sm">Sign In</span>
                )} */}
              </button>
            </div>
          </nav>
          
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={handleAuthClick}
              className="p-2 rounded-full hover:bg-gray-700 transition-colors"
              aria-label={user ? "Account" : "Sign In"}
            >
              <User size={20} />
              {user && <span className="ml-1 w-2 h-2 bg-green-500 rounded-full absolute top-0 right-0"></span>}
            </button>
            
            <button 
              className="text-current"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden bg-dark bg-opacity-95 text-white">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <NavLink 
                to="/" 
                className={({ isActive }) => `block py-2 px-4 ${isActive ? 'text-secondary-500' : 'text-current'} hover:text-secondary-500`}
                onClick={() => setIsMenuOpen(false)}
              >
                Fie (Home)
              </NavLink>
              <NavLink 
                to="/menu" 
                className={({ isActive }) => `block py-2 px-4 ${isActive ? 'text-secondary-500' : 'text-current'} hover:text-secondary-500`}
                onClick={() => setIsMenuOpen(false)}
              >
                Aduane (Menu)
              </NavLink>
              <NavLink 
                to="/order-online" 
                className={({ isActive }) => `block py-2 px-4 ${isActive ? 'text-secondary-500' : 'text-current'} hover:text-secondary-500`}
                onClick={() => setIsMenuOpen(false)}
              >
                Order Online
              </NavLink>
              <NavLink 
                to="/locations" 
                className={({ isActive }) => `block py-2 px-4 ${isActive ? 'text-secondary-500' : 'text-current'} hover:text-secondary-500`}
                onClick={() => setIsMenuOpen(false)}
              >
                Locations
              </NavLink>
              <NavLink 
                to="/feedback" 
                className={({ isActive }) => `block py-2 px-4 ${isActive ? 'text-secondary-500' : 'text-current'} hover:text-secondary-500`}
                onClick={() => setIsMenuOpen(false)}
              >
                Feedback
              </NavLink>
              {!user && (
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleSignUpClick();
                  }}
                  className="block py-2 px-4 text-left hover:text-secondary-500"
                >
                  Sign Up
                </button>
              )}
              <button 
                className="block w-full py-2 px-4 mt-2 rounded-md bg-secondary-500 text-center text-dark font-medium"
                onClick={(e) => {
                  setIsMenuOpen(false);
                  handleReservationClick(e);
                }}
              >
                Reserve Table
              </button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;