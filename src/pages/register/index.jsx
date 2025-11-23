import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';
import RegistrationForm from './components/RegistrationForm';
import SocialRegistration from './components/SocialRegistration';
import RegistrationSuccess from './components/RegistrationSuccess';

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [registrationStep, setRegistrationStep] = useState('form'); // 'form', 'success'
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [isResending, setIsResending] = useState(false);

  // Mock registration data for testing
  const mockCredentials = {
    testUser: {
      email: 'user@terrabook.com',
      password: 'password123',
      fullName: 'أحمد محمد',
      phone: '+971501234567'
    }
  };

  const handleRegister = async (formData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful registration
      console.log('Registration data:', formData);
      
      setRegisteredEmail(formData?.email);
      setRegistrationStep('success');
      
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle registration error
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialRegister = async (provider) => {
    setIsLoading(true);
    
    try {
      // Simulate social registration
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log(`Social registration with ${provider}`);
      
      // Mock successful social registration
      const mockEmail = `user@${provider?.toLowerCase()}.com`;
      setRegisteredEmail(mockEmail);
      setRegistrationStep('success');
      
    } catch (error) {
      console.error(`${provider} registration failed:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendVerification = async () => {
    setIsResending(true);
    
    try {
      // Simulate resend verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Verification email resent to:', registeredEmail);
    } catch (error) {
      console.error('Failed to resend verification:', error);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>إنشاء حساب جديد - TerraBook | حجز ملاعب كرة القدم</title>
        <meta name="description" content="أنشئ حسابك الجديد في TerraBook لحجز ملاعب كرة القدم بسهولة. تسجيل سريع وآمن مع خيارات متعددة للدفع." />
        <meta name="keywords" content="تسجيل, حساب جديد, حجز ملاعب, كرة القدم, TerraBook" />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-card border-b border-border shadow-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <Link to="/homepage" className="flex items-center space-x-2 rtl:space-x-reverse">
                <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                  <Icon name="Zap" size={20} color="white" />
                </div>
                <span className="text-xl font-bold text-foreground">TerraBook</span>
              </Link>

              {/* Language Toggle */}
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <button className="text-sm text-muted-foreground hover:text-foreground transition-micro">
                  العربية
                </button>
                <span className="text-muted-foreground">|</span>
                <button className="text-sm text-muted-foreground hover:text-foreground transition-micro">
                  Français
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[calc(100vh-8rem)]">
              
              {/* Left Side - Hero Content */}
              <div className="hidden lg:block">
                <div className="relative">
                  {/* Background Image */}
                  <div className="relative h-96 rounded-2xl overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                      alt="Football field registration"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  </div>

                  {/* Overlay Content */}
                  <div className="absolute bottom-8 left-8 right-8 text-white">
                    <h1 className="text-3xl font-bold mb-4" dir="rtl">
                      انضم إلى مجتمع TerraBook
                    </h1>
                    <p className="text-lg opacity-90 mb-6" dir="rtl">
                      احجز ملاعب كرة القدم المفضلة لديك بسهولة وسرعة
                    </p>
                    
                    {/* Features */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center flex-shrink-0">
                          <Icon name="Check" size={14} color="white" />
                        </div>
                        <span className="text-sm" dir="rtl">حجز فوري للملاعب المتاحة</span>
                      </div>
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center flex-shrink-0">
                          <Icon name="Check" size={14} color="white" />
                        </div>
                        <span className="text-sm" dir="rtl">أسعار شفافة بدون رسوم خفية</span>
                      </div>
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center flex-shrink-0">
                          <Icon name="Check" size={14} color="white" />
                        </div>
                        <span className="text-sm" dir="rtl">دعم فني على مدار الساعة</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Registration Forms */}
              <div className="w-full">
                <div className="bg-card rounded-2xl border border-border shadow-modal p-8">
                  
                  {registrationStep === 'form' && (
                    <>
                      {/* Header */}
                      <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-foreground mb-2" dir="rtl">
                          إنشاء حساب جديد
                        </h2>
                        <p className="text-muted-foreground" dir="rtl">
                          ابدأ رحلتك في حجز ملاعب كرة القدم
                        </p>
                      </div>

                      {/* Social Registration */}
                      <SocialRegistration
                        onSocialRegister={handleSocialRegister}
                        isLoading={isLoading}
                      />

                      {/* Registration Form */}
                      <div className="mt-8">
                        <RegistrationForm
                          onRegister={handleRegister}
                          isLoading={isLoading}
                        />
                      </div>
                    </>
                  )}

                  {registrationStep === 'success' && (
                    <RegistrationSuccess
                      userEmail={registeredEmail}
                      onResendVerification={handleResendVerification}
                      isResending={isResending}
                    />
                  )}
                </div>

                {/* Mobile Hero Content */}
                <div className="lg:hidden mt-8">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-foreground mb-4" dir="rtl">
                      لماذا TerraBook؟
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="bg-card border border-border rounded-lg p-4">
                        <Icon name="Clock" size={24} className="text-primary mx-auto mb-2" />
                        <p className="text-sm font-medium text-foreground" dir="rtl">حجز سريع</p>
                      </div>
                      <div className="bg-card border border-border rounded-lg p-4">
                        <Icon name="Shield" size={24} className="text-success mx-auto mb-2" />
                        <p className="text-sm font-medium text-foreground" dir="rtl">دفع آمن</p>
                      </div>
                      <div className="bg-card border border-border rounded-lg p-4">
                        <Icon name="Headphones" size={24} className="text-accent mx-auto mb-2" />
                        <p className="text-sm font-medium text-foreground" dir="rtl">دعم 24/7</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-card border-t border-border mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <p className="text-sm text-muted-foreground" dir="rtl">
                © {new Date()?.getFullYear()} TerraBook. جميع الحقوق محفوظة.
              </p>
              <div className="flex items-center justify-center space-x-6 rtl:space-x-reverse mt-4">
                <Link to="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-micro">
                  الشروط والأحكام
                </Link>
                <Link to="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-micro">
                  سياسة الخصوصية
                </Link>
                <Link to="/contact" className="text-xs text-muted-foreground hover:text-foreground transition-micro">
                  اتصل بنا
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Register;