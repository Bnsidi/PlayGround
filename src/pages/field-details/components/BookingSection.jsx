import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import FieldAvailabilityCalendar from '../../../components/ui/FieldAvailabilityCalendar';
import AuthenticationModal from '../../../components/ui/AuthenticationModal';

const BookingSection = ({ 
  fieldId = "field-1",
  fieldName = "ملعب الأبطال - Terrain des Champions",
  pricePerHour = 120,
  currency = "MAD",
  availability = {}
}) => {
  const navigate = useNavigate();
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [duration, setDuration] = useState(1); // hours
  const [showPricing, setShowPricing] = useState(false);

  // Mock user authentication check
  const checkAuthentication = () => {
    // In real app, check localStorage, context, or API
    return localStorage.getItem('user') !== null;
  };

  const handleTimeSlotSelect = (bookingData) => {
    setSelectedBooking({
      ...bookingData,
      fieldId,
      fieldName,
      duration,
      totalPrice: bookingData?.timeSlot?.price * duration
    });
  };

  const handleDurationChange = (newDuration) => {
    setDuration(newDuration);
    if (selectedBooking) {
      setSelectedBooking(prev => ({
        ...prev,
        duration: newDuration,
        totalPrice: prev?.timeSlot?.price * newDuration
      }));
    }
  };

  const handleBookNow = () => {
    if (!selectedBooking) {
      alert('يرجى اختيار تاريخ ووقت - Veuillez sélectionner une date et une heure');
      return;
    }

    if (!checkAuthentication()) {
      setShowAuthModal(true);
      return;
    }

    // Navigate to booking workflow with selected data
    navigate('/booking-workflow', {
      state: {
        booking: selectedBooking,
        field: {
          id: fieldId,
          name: fieldName,
          pricePerHour,
          currency
        }
      }
    });
  };

  const handleAuthenticated = (userData) => {
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
    setShowAuthModal(false);
    
    // Proceed with booking after authentication
    setTimeout(() => {
      handleBookNow();
    }, 500);
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('ar-MA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (time) => {
    return time;
  };

  const pricingTiers = [
    { hours: 1, discount: 0, label: "ساعة واحدة - 1 heure" },
    { hours: 2, discount: 5, label: "ساعتان - 2 heures" },
    { hours: 3, discount: 10, label: "3 ساعات - 3 heures" },
    { hours: 4, discount: 15, label: "4 ساعات - 4 heures" }
  ];

  const calculateDiscountedPrice = (hours) => {
    const tier = pricingTiers?.find(t => t?.hours === hours);
    const basePrice = pricePerHour * hours;
    const discount = tier ? tier?.discount : 0;
    return basePrice - (basePrice * discount / 100);
  };

  return (
    <div className="space-y-6">
      {/* Booking Calendar */}
      <div className="bg-card rounded-lg border border-border shadow-card">
        <FieldAvailabilityCalendar
          fieldId={fieldId}
          onTimeSlotSelect={handleTimeSlotSelect}
          selectedTimeSlot={selectedBooking?.timeSlot}
          pricePerHour={pricePerHour}
        />
      </div>
      {/* Duration Selection */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          مدة الحجز - Durée de réservation
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {pricingTiers?.map((tier) => (
            <button
              key={tier?.hours}
              onClick={() => handleDurationChange(tier?.hours)}
              className={`p-3 rounded-lg border text-center transition-micro ${
                duration === tier?.hours
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-card text-foreground border-border hover:border-primary hover:bg-primary/5'
              }`}
            >
              <div className="font-medium">{tier?.hours}h</div>
              {tier?.discount > 0 && (
                <div className="text-xs text-success mt-1">
                  -{tier?.discount}%
                </div>
              )}
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowPricing(!showPricing)}
          className="mt-4 text-sm text-primary hover:text-primary/80 transition-micro flex items-center space-x-2 rtl:space-x-reverse"
        >
          <Icon name="Info" size={14} />
          <span>عرض تفاصيل الأسعار - Voir les détails des prix</span>
          <Icon name={showPricing ? "ChevronUp" : "ChevronDown"} size={14} />
        </button>

        {showPricing && (
          <div className="mt-4 p-4 bg-muted/30 rounded-lg animate-slide-up">
            <div className="space-y-2">
              {pricingTiers?.map((tier) => (
                <div key={tier?.hours} className="flex items-center justify-between text-sm">
                  <span className="text-foreground">{tier?.label}</span>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    {tier?.discount > 0 && (
                      <span className="text-muted-foreground line-through font-mono">
                        {pricePerHour * tier?.hours} {currency}
                      </span>
                    )}
                    <span className="font-medium text-foreground font-mono">
                      {calculateDiscountedPrice(tier?.hours)} {currency}
                    </span>
                    {tier?.discount > 0 && (
                      <span className="text-success text-xs">(-{tier?.discount}%)</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Booking Summary */}
      {selectedBooking && (
        <div className="bg-card rounded-lg border border-border p-6 shadow-card">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            ملخص الحجز - Résumé de réservation
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">الملعب - Terrain:</span>
              <span className="font-medium text-foreground">{fieldName}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">التاريخ - Date:</span>
              <span className="font-medium text-foreground">{formatDate(selectedBooking?.date)}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">الوقت - Heure:</span>
              <span className="font-medium text-foreground font-mono">
                {formatTime(selectedBooking?.timeSlot?.displayTime)}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">المدة - Durée:</span>
              <span className="font-medium text-foreground">{duration} ساعة - heures</span>
            </div>
            
            <div className="border-t border-border pt-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">السعر الأساسي - Prix de base:</span>
                <span className="font-mono text-foreground">
                  {pricePerHour} {currency}/ساعة - heure
                </span>
              </div>
              
              {duration > 1 && pricingTiers?.find(t => t?.hours === duration)?.discount > 0 && (
                <div className="flex items-center justify-between text-success">
                  <span>خصم - Remise ({pricingTiers?.find(t => t?.hours === duration)?.discount}%):</span>
                  <span className="font-mono">
                    -{(pricePerHour * duration * pricingTiers?.find(t => t?.hours === duration)?.discount / 100)} {currency}
                  </span>
                </div>
              )}
              
              <div className="flex items-center justify-between text-lg font-semibold text-foreground mt-2">
                <span>المجموع - Total:</span>
                <span className="font-mono">{calculateDiscountedPrice(duration)} {currency}</span>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Booking Actions */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-card">
        <div className="space-y-4">
          <Button
            variant="default"
            size="lg"
            fullWidth
            onClick={handleBookNow}
            disabled={!selectedBooking}
            iconName="Calendar"
            iconPosition="left"
            className="text-lg py-4"
          >
            {selectedBooking 
              ? `احجز الآن - Réserver maintenant (${calculateDiscountedPrice(duration)} ${currency})`
              : 'اختر التاريخ والوقت - Sélectionner date et heure'
            }
          </Button>
          
          <div className="flex space-x-3">
            <Button
              variant="outline"
              fullWidth
              iconName="Heart"
              iconPosition="left"
            >
              إضافة للمفضلة - Ajouter aux favoris
            </Button>
            
            <Button
              variant="outline"
              fullWidth
              iconName="Share"
              iconPosition="left"
            >
              مشاركة - Partager
            </Button>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-6 pt-6 border-t border-border">
          <h4 className="font-medium text-foreground mb-3">
            طرق الدفع المقبولة - Méthodes de paiement acceptées
          </h4>
          
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-muted-foreground">
              <Icon name="CreditCard" size={16} />
              <span>بطاقة ائتمان - Carte de crédit</span>
            </div>
            
            <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-muted-foreground">
              <Icon name="Smartphone" size={16} />
              <span>دفع رقمي - Paiement numérique</span>
            </div>
            
            <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-muted-foreground">
              <Icon name="Banknote" size={16} />
              <span>نقداً - Espèces</span>
            </div>
          </div>
        </div>

        {/* Cancellation Policy */}
        <div className="mt-4 p-3 bg-muted/30 rounded-lg">
          <div className="flex items-start space-x-2 rtl:space-x-reverse">
            <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
            <div className="text-sm text-muted-foreground">
              <p className="font-medium text-foreground mb-1">
                سياسة الإلغاء - Politique d'annulation
              </p>
              <p>
                يمكن إلغاء الحجز مجاناً قبل 24 ساعة من الموعد المحدد
                <br />
                Annulation gratuite jusqu'à 24h avant la réservation
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Authentication Modal */}
      <AuthenticationModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthenticated={handleAuthenticated}
        defaultMode="login"
        bookingContext={{
          fieldName,
          date: selectedBooking?.date,
          timeSlot: selectedBooking?.timeSlot
        }}
      />
    </div>
  );
};

export default BookingSection;