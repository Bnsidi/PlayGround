import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const BookingConfirmation = ({ 
  fieldData, 
  bookingData, 
  userData, 
  paymentData, 
  onConfirm,
  isLoading = false 
}) => {
  const [showFullTerms, setShowFullTerms] = useState(false);

  if (!fieldData || !bookingData || !userData) {
    return (
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="text-center py-8">
          <Icon name="AlertCircle" size={48} className="mx-auto text-warning mb-4" />
          <p className="text-muted-foreground">معلومات الحجز غير مكتملة</p>
        </div>
      </div>
    );
  }

  const formatDate = (date) => {
    return date?.toLocaleDateString('ar-SA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (timeSlot) => {
    return timeSlot?.displayTime;
  };

  const calculateEndTime = (startTime, duration) => {
    const [hours, minutes] = startTime?.split(':')?.map(Number);
    const endHours = hours + Math.floor(duration / 60);
    const endMinutes = minutes + (duration % 60);
    
    const finalHours = endHours + Math.floor(endMinutes / 60);
    const finalMinutes = endMinutes % 60;
    
    const displayHours = finalHours > 12 ? finalHours - 12 : finalHours;
    const period = finalHours >= 12 ? 'م' : 'ص';
    
    return `${displayHours?.toString()?.padStart(2, '0')}:${finalMinutes?.toString()?.padStart(2, '0')} ${period}`;
  };

  const serviceFee = Math.round(bookingData?.totalPrice * 0.05);
  const totalWithFees = bookingData?.totalPrice + serviceFee;

  const getPaymentMethodName = (method) => {
    switch (method) {
      case 'card': return 'بطاقة ائتمان';
      case 'paypal': return 'PayPal';
      case 'cash': return 'الدفع في الموقع';
      default: return method;
    }
  };

  const generateBookingReference = () => {
    return `TB${Date.now()?.toString()?.slice(-8)}`;
  };

  const bookingReference = generateBookingReference();

  return (
    <div className="space-y-6">
      {/* Confirmation Header */}
      <div className="bg-card rounded-lg border border-border p-6 text-center">
        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="CheckCircle" size={32} className="text-success" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">تأكيد الحجز</h2>
        <p className="text-muted-foreground">
          يرجى مراجعة تفاصيل حجزك قبل التأكيد النهائي
        </p>
        <div className="bg-primary/10 rounded-lg p-3 mt-4">
          <p className="text-sm text-primary font-medium">
            رقم المرجع: {bookingReference}
          </p>
        </div>
      </div>
      {/* Booking Summary */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">ملخص الحجز</h3>
        
        {/* Field Information */}
        <div className="flex items-start space-x-4 rtl:space-x-reverse mb-6">
          <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={fieldData?.image}
              alt={fieldData?.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-foreground text-lg">{fieldData?.name}</h4>
            <p className="text-muted-foreground flex items-center mt-1">
              <Icon name="MapPin" size={16} className="ml-1 rtl:mr-1 rtl:ml-0" />
              {fieldData?.location}
            </p>
            <div className="flex items-center mt-2 space-x-4 rtl:space-x-reverse">
              <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full">
                {fieldData?.size}
              </span>
              <div className="flex items-center">
                <Icon name="Star" size={16} className="text-warning fill-current" />
                <span className="text-sm text-foreground mr-1 rtl:ml-1 rtl:mr-0">
                  {fieldData?.rating}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <Icon name="Calendar" size={20} className="text-primary" />
              <div>
                <p className="font-medium text-foreground">التاريخ</p>
                <p className="text-sm text-muted-foreground">
                  {formatDate(bookingData?.date)}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <Icon name="Clock" size={20} className="text-primary" />
              <div>
                <p className="font-medium text-foreground">الوقت</p>
                <p className="text-sm text-muted-foreground font-mono">
                  {formatTime(bookingData?.timeSlot)} - {calculateEndTime(bookingData?.timeSlot?.time, bookingData?.duration)}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <Icon name="Timer" size={20} className="text-primary" />
              <div>
                <p className="font-medium text-foreground">المدة</p>
                <p className="text-sm text-muted-foreground">
                  {bookingData?.duration === 60 ? 'ساعة واحدة' : 
                   bookingData?.duration === 90 ? 'ساعة ونصف' :
                   bookingData?.duration === 120 ? 'ساعتان' :
                   bookingData?.duration === 180 ? 'ثلاث ساعات' :
                   `${bookingData?.duration} دقيقة`}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <Icon name="User" size={20} className="text-primary" />
              <div>
                <p className="font-medium text-foreground">اسم المحجوز</p>
                <p className="text-sm text-muted-foreground">{userData?.fullName}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <Icon name="Phone" size={20} className="text-primary" />
              <div>
                <p className="font-medium text-foreground">رقم الهاتف</p>
                <p className="text-sm text-muted-foreground font-mono">{userData?.phone}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <Icon name="CreditCard" size={20} className="text-primary" />
              <div>
                <p className="font-medium text-foreground">طريقة الدفع</p>
                <p className="text-sm text-muted-foreground">
                  {getPaymentMethodName(paymentData?.method)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Price Breakdown */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">تفاصيل التكلفة</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-foreground">سعر الملعب</span>
            <span className="font-mono text-foreground">
              {bookingData?.timeSlot?.price} د.م × {bookingData?.duration / 60} ساعة
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-foreground">المجموع الفرعي</span>
            <span className="font-mono text-foreground">{bookingData?.totalPrice} د.م</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">رسوم الخدمة (5%)</span>
            <span className="font-mono text-muted-foreground">{serviceFee} د.م</span>
          </div>
          
          <div className="border-t border-border pt-3">
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-foreground">المجموع الكلي</span>
              <span className="text-xl font-bold text-primary font-mono">{totalWithFees} د.م</span>
            </div>
          </div>
        </div>
      </div>
      {/* Special Requests */}
      {userData?.specialRequests && (
        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">الطلبات الخاصة</h3>
          <div className="bg-muted/30 rounded-lg p-4">
            <p className="text-foreground">{userData?.specialRequests}</p>
          </div>
        </div>
      )}
      {/* Terms and Policies */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">الشروط والسياسات</h3>
        
        <div className="space-y-4">
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
            <h4 className="font-medium text-warning mb-2">سياسة الإلغاء</h4>
            <p className="text-sm text-muted-foreground">
              يمكن إلغاء الحجز مجاناً حتى 24 ساعة قبل موعد الحجز. بعد ذلك سيتم خصم 50% من قيمة الحجز.
            </p>
          </div>

          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
            <h4 className="font-medium text-primary mb-2">قواعد الملعب</h4>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>الوصول قبل 15 دقيقة من موعد الحجز</li>
              <li>إحضار الهوية الشخصية</li>
              <li>ممنوع التدخين داخل الملعب</li>
              <li>المسؤولية الشخصية عن الإصابات</li>
            </ul>
          </div>

          {showFullTerms && (
            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="font-medium text-foreground mb-2">الشروط والأحكام الكاملة</h4>
              <div className="text-sm text-muted-foreground space-y-2 max-h-40 overflow-y-auto">
                <p>1. يجب على المستخدم الالتزام بجميع قوانين وقواعد الملعب.</p>
                <p>2. الملعب غير مسؤول عن أي إصابات قد تحدث أثناء اللعب.</p>
                <p>3. يحق للملعب إلغاء الحجز في حالة الظروف الجوية السيئة.</p>
                <p>4. يجب دفع كامل المبلغ قبل بداية الحجز في حالة الدفع في الموقع.</p>
                <p>5. لا يُسمح بإدخال المشروبات الكحولية أو المواد المحظورة.</p>
              </div>
            </div>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowFullTerms(!showFullTerms)}
            iconName={showFullTerms ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            {showFullTerms ? 'إخفاء' : 'عرض'} الشروط والأحكام الكاملة
          </Button>
        </div>
      </div>
      {/* Confirmation Button */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="text-center">
          <Button
            variant="default"
            size="lg"
            onClick={onConfirm}
            loading={isLoading}
            iconName="CheckCircle"
            iconPosition="left"
            className="w-full md:w-auto px-8"
          >
            {isLoading ? 'جاري تأكيد الحجز...' : 'تأكيد الحجز والدفع'}
          </Button>
          
          <p className="text-xs text-muted-foreground mt-3">
            بالنقر على "تأكيد الحجز" فإنك توافق على جميع الشروط والأحكام المذكورة أعلاه
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;