import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import BookingStepIndicator from './components/BookingStepIndicator';
import DateTimeSelection from './components/DateTimeSelection';
import BookingSummary from './components/BookingSummary';
import PaymentOptions from './components/PaymentOptions';
import UserInformation from './components/UserInformation';
import BookingConfirmation from './components/BookingConfirmation';

const BookingWorkflow = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get field data from navigation state or mock data
  const fieldData = location?.state?.fieldData || {
    id: '1',
    name: 'ملعب الأندلس الرياضي',
    location: 'الدار البيضاء، المغرب',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop',
    size: '11x11',
    rating: 4.8,
    pricePerHour: 150,
  };

  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState(null);
  const [paymentData, setPaymentData] = useState({ method: 'card', isValid: false });
  const [userData, setUserData] = useState({ data: null, isValid: false });
  const [isLoading, setIsLoading] = useState(false);
  const [showMobileSummary, setShowMobileSummary] = useState(false);

  // Auto-scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const handleDateTimeSelection = (data) => {
    setBookingData(data);
  };

  const handlePaymentMethodChange = (data) => {
    setPaymentData(data);
  };

  const handleUserDataChange = (data) => {
    setUserData(data);
  };

  const canProceedToNextStep = () => {
    switch (currentStep) {
      case 1:
        return bookingData && bookingData?.date && bookingData?.timeSlot && bookingData?.duration;
      case 2:
        return userData?.isValid;
      case 3:
        return paymentData?.isValid;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const handleNextStep = () => {
    if (canProceedToNextStep() && currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleConfirmBooking = async () => {
    setIsLoading(true);
    
    try {
      // Simulate booking confirmation API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Navigate to success page or show success message
      navigate('/booking-success', {
        state: {
          bookingReference: `TB${Date.now()?.toString()?.slice(-8)}`,
          fieldData,
          bookingData,
          userData: userData?.data,
          paymentData,
        }
      });
    } catch (error) {
      console.error('Booking confirmation failed:', error);
      // Handle error - show error message
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <DateTimeSelection
            onSelectionChange={handleDateTimeSelection}
            selectedBooking={bookingData}
          />
        );
      case 2:
        return (
          <UserInformation
            onDataChange={handleUserDataChange}
            initialData={userData?.data}
          />
        );
      case 3:
        return (
          <PaymentOptions
            onPaymentMethodChange={handlePaymentMethodChange}
            totalAmount={bookingData ? bookingData?.totalPrice + Math.round(bookingData?.totalPrice * 0.05) : 0}
          />
        );
      case 4:
        return (
          <BookingConfirmation
            fieldData={fieldData}
            bookingData={bookingData}
            userData={userData?.data}
            paymentData={paymentData}
            onConfirm={handleConfirmBooking}
            isLoading={isLoading}
          />
        );
      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'اختر التاريخ والوقت';
      case 2: return 'المعلومات الشخصية';
      case 3: return 'طريقة الدفع';
      case 4: return 'تأكيد الحجز';
      default: return 'حجز الملعب';
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case 1: return 'اختر التاريخ والوقت المناسب لحجز الملعب';
      case 2: return 'أدخل معلوماتك الشخصية لإتمام الحجز';
      case 3: return 'اختر طريقة الدفع المناسبة لك';
      case 4: return 'راجع تفاصيل حجزك وأكد الطلب';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Progress Indicator */}
      <BookingStepIndicator currentStep={currentStep} totalSteps={4} />
      <div className="max-w-7xl mx-auto px-4 py-6 lg:py-8">
        {/* Mobile Summary Toggle */}
        <div className="lg:hidden mb-6">
          <Button
            variant="outline"
            fullWidth
            onClick={() => setShowMobileSummary(!showMobileSummary)}
            iconName={showMobileSummary ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            {showMobileSummary ? 'إخفاء' : 'عرض'} ملخص الحجز
          </Button>
          
          {showMobileSummary && (
            <div className="mt-4">
              <BookingSummary
                fieldData={fieldData}
                bookingData={bookingData}
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step Header */}
            <div className="bg-card rounded-lg border border-border p-6 mb-6">
              <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground font-bold">{currentStep}</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">{getStepTitle()}</h1>
                  <p className="text-sm text-muted-foreground">{getStepDescription()}</p>
                </div>
              </div>

              {/* Breadcrumb */}
              <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-muted-foreground">
                <span>الرئيسية</span>
                <Icon name="ChevronLeft" size={14} className="rtl:rotate-180" />
                <span>الملاعب</span>
                <Icon name="ChevronLeft" size={14} className="rtl:rotate-180" />
                <span>{fieldData?.name}</span>
                <Icon name="ChevronLeft" size={14} className="rtl:rotate-180" />
                <span className="text-primary">حجز الملعب</span>
              </div>
            </div>

            {/* Step Content */}
            <div className="space-y-6">
              {renderStepContent()}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 p-6 bg-card rounded-lg border border-border">
              <Button
                variant="outline"
                onClick={handlePreviousStep}
                disabled={currentStep === 1}
                iconName="ChevronLeft"
                iconPosition="left"
              >
                السابق
              </Button>

              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <span className="text-sm text-muted-foreground">
                  الخطوة {currentStep} من 4
                </span>
              </div>

              {currentStep < 4 ? (
                <Button
                  variant="default"
                  onClick={handleNextStep}
                  disabled={!canProceedToNextStep()}
                  iconName="ChevronRight"
                  iconPosition="right"
                >
                  التالي
                </Button>
              ) : (
                <Button
                  variant="default"
                  onClick={handleConfirmBooking}
                  loading={isLoading}
                  iconName="CheckCircle"
                  iconPosition="left"
                >
                  {isLoading ? 'جاري التأكيد...' : 'تأكيد الحجز'}
                </Button>
              )}
            </div>
          </div>

          {/* Sidebar - Booking Summary */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <BookingSummary
                fieldData={fieldData}
                bookingData={bookingData}
              />

              {/* Help Section */}
              <div className="mt-6 bg-card rounded-lg border border-border p-6">
                <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
                  <Icon name="HelpCircle" size={20} className="text-primary" />
                  <h3 className="font-semibold text-foreground">تحتاج مساعدة؟</h3>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Icon name="Phone" size={16} className="text-muted-foreground" />
                    <span className="text-foreground font-mono">+212 5 22 12 34 56</span>
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Icon name="Mail" size={16} className="text-muted-foreground" />
                    <span className="text-foreground">support@terrabook.ma</span>
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Icon name="MessageCircle" size={16} className="text-muted-foreground" />
                    <span className="text-foreground">الدردشة المباشرة</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  className="mt-4"
                  iconName="MessageCircle"
                  iconPosition="left"
                >
                  بدء المحادثة
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 z-50">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handlePreviousStep}
            disabled={currentStep === 1}
            iconName="ChevronLeft"
            iconPosition="left"
            size="sm"
          >
            السابق
          </Button>

          <div className="text-center">
            <div className="text-sm font-medium text-foreground">
              الخطوة {currentStep} من 4
            </div>
            {bookingData && (
              <div className="text-xs text-primary font-mono">
                المجموع: {bookingData?.totalPrice + Math.round(bookingData?.totalPrice * 0.05)} د.م
              </div>
            )}
          </div>

          {currentStep < 4 ? (
            <Button
              variant="default"
              onClick={handleNextStep}
              disabled={!canProceedToNextStep()}
              iconName="ChevronRight"
              iconPosition="right"
              size="sm"
            >
              التالي
            </Button>
          ) : (
            <Button
              variant="default"
              onClick={handleConfirmBooking}
              loading={isLoading}
              iconName="CheckCircle"
              iconPosition="left"
              size="sm"
            >
              تأكيد
            </Button>
          )}
        </div>
      </div>
      {/* Bottom Padding for Mobile Navigation */}
      <div className="lg:hidden h-20" />
    </div>
  );
};

export default BookingWorkflow;