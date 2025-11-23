import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const AuthenticationModal = ({ 
  isOpen = false, 
  onClose, 
  onAuthenticated, 
  defaultMode = 'login',
  bookingContext = null 
}) => {
  const [mode, setMode] = useState(defaultMode);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (mode === 'register') {
      if (!formData?.fullName) {
        newErrors.fullName = 'Full name is required';
      }

      if (!formData?.phone) {
        newErrors.phone = 'Phone number is required';
      }

      if (formData?.password !== formData?.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful authentication
      const userData = {
        id: '1',
        email: formData?.email,
        fullName: formData?.fullName || 'User',
        phone: formData?.phone || '',
      };

      if (onAuthenticated) {
        onAuthenticated(userData);
      }

      onClose();
    } catch (error) {
      setErrors({ submit: 'Authentication failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setIsLoading(true);
    
    try {
      // Simulate social login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userData = {
        id: '1',
        email: `user@${provider}.com`,
        fullName: 'Social User',
        provider,
      };

      if (onAuthenticated) {
        onAuthenticated(userData);
      }

      onClose();
    } catch (error) {
      setErrors({ submit: `${provider} login failed. Please try again.` });
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setErrors({});
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      fullName: '',
      phone: '',
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-200 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
        
        {/* Modal */}
        <div className="relative w-full max-w-md transform overflow-hidden rounded-lg bg-card shadow-modal transition-all animate-spring">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                {mode === 'login' ? 'Sign In' : 'Create Account'}
              </h2>
              {bookingContext && (
                <p className="text-sm text-muted-foreground mt-1">
                  Continue your booking for {bookingContext?.fieldName}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-micro"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Social Login */}
            <div className="space-y-3 mb-6">
              <Button
                variant="outline"
                fullWidth
                onClick={() => handleSocialLogin('Google')}
                disabled={isLoading}
                iconName="Chrome"
                iconPosition="left"
              >
                Continue with Google
              </Button>
              <Button
                variant="outline"
                fullWidth
                onClick={() => handleSocialLogin('Facebook')}
                disabled={isLoading}
                iconName="Facebook"
                iconPosition="left"
              >
                Continue with Facebook
              </Button>
            </div>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-card px-2 text-muted-foreground">Or continue with email</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'register' && (
                <Input
                  label="Full Name"
                  type="text"
                  name="fullName"
                  value={formData?.fullName}
                  onChange={handleInputChange}
                  error={errors?.fullName}
                  placeholder="Enter your full name"
                  required
                />
              )}

              <Input
                label="Email Address"
                type="email"
                name="email"
                value={formData?.email}
                onChange={handleInputChange}
                error={errors?.email}
                placeholder="Enter your email"
                required
              />

              {mode === 'register' && (
                <Input
                  label="Phone Number"
                  type="tel"
                  name="phone"
                  value={formData?.phone}
                  onChange={handleInputChange}
                  error={errors?.phone}
                  placeholder="Enter your phone number"
                  required
                />
              )}

              <Input
                label="Password"
                type="password"
                name="password"
                value={formData?.password}
                onChange={handleInputChange}
                error={errors?.password}
                placeholder="Enter your password"
                required
              />

              {mode === 'register' && (
                <Input
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  value={formData?.confirmPassword}
                  onChange={handleInputChange}
                  error={errors?.confirmPassword}
                  placeholder="Confirm your password"
                  required
                />
              )}

              {errors?.submit && (
                <div className="p-3 rounded-md bg-error/10 border border-error/20">
                  <p className="text-sm text-error">{errors?.submit}</p>
                </div>
              )}

              <Button
                type="submit"
                variant="default"
                fullWidth
                loading={isLoading}
                className="mt-6"
              >
                {mode === 'login' ? 'Sign In' : 'Create Account'}
              </Button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
                <button
                  onClick={switchMode}
                  className="ml-1 text-primary hover:text-primary/80 font-medium transition-micro"
                >
                  {mode === 'login' ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>

            {mode === 'login' && (
              <div className="mt-4 text-center">
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary hover:text-primary/80 transition-micro"
                  onClick={onClose}
                >
                  Forgot your password?
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationModal;