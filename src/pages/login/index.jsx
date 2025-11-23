import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import SocialLoginButtons from './components/SocialLoginButtons';
import LoginFooter from './components/LoginFooter';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Mock credentials for testing
  const mockCredentials = {
    email: 'user@terrabook.com',
    password: 'password123'
  };

  useEffect(() => {
    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem('terrabook_user');
    if (isLoggedIn) {
      const from = location?.state?.from?.pathname || '/homepage';
      navigate(from, { replace: true });
    }
  }, [navigate, location]);

  const validateForm = (formData) => {
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'يرجى إدخال بريد إلكتروني صحيح';
    }

    if (!formData?.password) {
      newErrors.password = 'كلمة المرور مطلوبة';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
    }

    return newErrors;
  };

  const handleLogin = async (formData) => {
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors)?.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Check mock credentials
      if (formData?.email === mockCredentials?.email && formData?.password === mockCredentials?.password) {
        // Mock successful login
        const userData = {
          id: '1',
          email: formData?.email,
          fullName: 'أحمد محمد',
          phone: '+971501234567',
          loginTime: new Date()?.toISOString(),
          rememberMe: formData?.rememberMe
        };

        // Store user data
        localStorage.setItem('terrabook_user', JSON.stringify(userData));
        
        if (formData?.rememberMe) {
          localStorage.setItem('terrabook_remember', 'true');
        }

        // Redirect to intended page or homepage
        const from = location?.state?.from?.pathname || '/homepage';
        navigate(from, { replace: true });
      } else {
        setErrors({
          submit: 'بيانات الدخول غير صحيحة. يرجى المحاولة مرة أخرى.\nاستخدم: user@terrabook.com / password123'
        });
      }
    } catch (error) {
      setErrors({
        submit: 'حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setIsLoading(true);
    setErrors({});

    try {
      // Simulate social login API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock successful social login
      const userData = {
        id: '2',
        email: `user@${provider}.com`,
        fullName: `مستخدم ${provider}`,
        provider: provider,
        loginTime: new Date()?.toISOString()
      };

      localStorage.setItem('terrabook_user', JSON.stringify(userData));

      const from = location?.state?.from?.pathname || '/homepage';
      navigate(from, { replace: true });
    } catch (error) {
      setErrors({
        submit: `فشل تسجيل الدخول عبر ${provider}. يرجى المحاولة مرة أخرى.`
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-md">
        {/* Background Card */}
        <div className="bg-card rounded-2xl shadow-modal border border-border p-8">
          <LoginHeader />
          
          {/* Social Login Buttons */}
          <SocialLoginButtons 
            onSocialLogin={handleSocialLogin}
            isLoading={isLoading}
          />

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-card px-4 text-muted-foreground font-medium">
                أو تسجيل الدخول بالبريد الإلكتروني
              </span>
            </div>
          </div>

          {/* Login Form */}
          <LoginForm 
            onSubmit={handleLogin}
            isLoading={isLoading}
            errors={errors}
          />

          <LoginFooter />
        </div>

        {/* Additional Help */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            تحتاج مساعدة؟{' '}
            <a 
              href="/contact" 
              className="text-primary hover:text-primary/80 transition-micro font-medium"
            >
              تواصل معنا
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;