import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const BookingSummary = ({ fieldData, bookingData, className = "" }) => {
  if (!fieldData || !bookingData) {
    return (
      <div className={`bg-card rounded-lg border border-border p-6 ${className}`}>
        <div className="text-center py-8">
          <Icon name="Calendar" size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">اختر التاريخ والوقت لعرض ملخص الحجز</p>
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

  const serviceFee = Math.round(bookingData?.totalPrice * 0.05); // 5% service fee
  const totalWithFees = bookingData?.totalPrice + serviceFee;

  return (
    <div className={`bg-card rounded-lg border border-border shadow-card ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">ملخص الحجز</h3>
        
        {/* Field Info */}
        <div className="flex items-start space-x-4 rtl:space-x-reverse">
          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={fieldData?.image}
              alt={fieldData?.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-foreground truncate">{fieldData?.name}</h4>
            <p className="text-sm text-muted-foreground flex items-center mt-1">
              <Icon name="MapPin" size={14} className="ml-1 rtl:mr-1 rtl:ml-0" />
              {fieldData?.location}
            </p>
            <div className="flex items-center mt-2 space-x-4 rtl:space-x-reverse">
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                {fieldData?.size}
              </span>
              <div className="flex items-center">
                <Icon name="Star" size={14} className="text-warning fill-current" />
                <span className="text-sm text-foreground mr-1 rtl:ml-1 rtl:mr-0">
                  {fieldData?.rating}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Booking Details */}
      <div className="p-6 space-y-4">
        {/* Date & Time */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <Icon name="Calendar" size={20} className="text-primary" />
            <div>
              <p className="font-medium text-foreground">التاريخ</p>
              <p className="text-sm text-muted-foreground">
                {formatDate(bookingData?.date)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <Icon name="Clock" size={20} className="text-primary" />
            <div>
              <p className="font-medium text-foreground">الوقت</p>
              <p className="text-sm text-muted-foreground font-mono">
                {formatTime(bookingData?.timeSlot)} - {calculateEndTime(bookingData?.timeSlot?.time, bookingData?.duration)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
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

        {/* Divider */}
        <div className="border-t border-border pt-4">
          {/* Price Breakdown */}
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
              <span className="text-muted-foreground">رسوم الخدمة</span>
              <span className="font-mono text-muted-foreground">{serviceFee} د.م</span>
            </div>
            
            <div className="border-t border-border pt-3">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-foreground">المجموع الكلي</span>
                <span className="text-lg font-bold text-primary font-mono">{totalWithFees} د.م</span>
              </div>
            </div>
          </div>
        </div>

        {/* Policies */}
        <div className="bg-muted/30 rounded-lg p-4 mt-6">
          <h5 className="font-medium text-foreground mb-2">سياسة الإلغاء</h5>
          <p className="text-sm text-muted-foreground">
            يمكن إلغاء الحجز مجاناً حتى 24 ساعة قبل موعد الحجز. بعد ذلك سيتم خصم 50% من قيمة الحجز.
          </p>
        </div>

        {/* Contact Info */}
        <div className="bg-primary/5 rounded-lg p-4">
          <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
            <Icon name="Phone" size={16} className="text-primary" />
            <span className="font-medium text-foreground">للاستفسارات</span>
          </div>
          <p className="text-sm text-muted-foreground font-mono">+212 6 12 34 56 78</p>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;