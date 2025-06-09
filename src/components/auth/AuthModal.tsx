import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { toast } from 'react-hot-toast';
import { ChefHat } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'register';
  onSuccess?: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, mode: initialMode, onSuccess }) => {
  const [mode, setMode] = useState(initialMode);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });

  // Update local mode when prop changes
  React.useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const switchMode = (newMode: 'login' | 'register') => {
    setMode(newMode);
    setFormData({
      email: '',
      password: '',
      firstName: '',
      lastName: ''
    });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === 'register') {
        if (!formData.firstName || !formData.lastName) {
          throw new Error('First name and last name are required');
        }

        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              firstName: formData.firstName,
              lastName: formData.lastName
            }
          }
        });
        if (error) throw error;
        toast.success('Registration successful! Please check your email to verify your account.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password
        });
        if (error) throw error;
        toast.success('Successfully logged in!');
        if (onSuccess) onSuccess();
        onClose();
      }
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />
      <div 
        className="relative bg-white rounded-lg p-8 max-w-md w-full mx-4" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center space-x-2 font-display text-2xl text-primary-600">
            <ChefHat className="h-8 w-8" />
            <span>Elegance</span>
          </div>
          <h2 className="text-2xl font-semibold mt-4">
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </h2>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          {mode === 'register' && (
            <>
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-gray-600  border rounded-md focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-gray-600  border rounded-md focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>
            </>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border text-gray-600  rounded-md focus:ring-primary-500 focus:border-primary-500"
              required
            />
          </div>

          <div>
  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
    Password
  </label>
  <input
    id="password"
    name="password"
    type="password"
    value={formData.password}
    onChange={handleChange}
    className="w-full px-4 text-gray-600 py-2 border rounded-md focus:ring-primary-500 focus:border-primary-500"
    required
    minLength={8}
  />
  {mode === 'register' && (
    <p className="text-xs text-gray-500 mt-1">
      Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.
    </p>
  )}
  {formData.password && formData.password.length < 8 && mode === 'register' && (
    <p className="text-red-600 text-sm mt-1">
      Password must be at least 8 characters
    </p>
  )}
</div>


          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors disabled:bg-gray-400"
          >
            {isLoading ? 'Processing...' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-4 text-center">
          {mode === 'login' ? (
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => switchMode('register')}
                className="text-primary-600 hover:text-primary-700"
              >
                Sign up
              </button>
            </p>
          ) : (
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => switchMode('login')}
                className="text-primary-600 hover:text-primary-700"
              >
                Sign in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
