import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DateTimeSelection = ({ onSelectionChange, selectedBooking = null }) => {
  const [selectedDate, setSelectedDate] = useState(selectedBooking?.date || null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(selectedBooking?.timeSlot || null);
  const [selectedDuration, setSelectedDuration] = useState(selectedBooking?.duration || 60);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  // Generate time slots for a day (6 AM to 11 PM)
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 6; hour <= 23; hour++) {
      const timeSlot = {
        id: `${hour}:00`,
        time: `${hour?.toString()?.padStart(2, '0')}:00`,
        displayTime: hour < 12 ? `${hour}:00 ص` : hour === 12 ? '12:00 م' : `${hour - 12}:00 م`,
        available: Math.random() > 0.3,
        price: 150,
      };
      slots?.push(timeSlot);
    }
    return slots;
  };

  // Get week dates
  const getWeekDates = (startDate) => {
    const dates = [];
    const start = new Date(startDate);
    start?.setDate(start?.getDate() - start?.getDay()); // Start from Sunday
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(start);
      date?.setDate(start?.getDate() + i);
      dates?.push(date);
    }
    return dates;
  };

  const weekDates = getWeekDates(currentWeek);

  // Load availability for selected date
  useEffect(() => {
    if (selectedDate) {
      setIsLoading(true);
      setTimeout(() => {
        const slots = generateTimeSlots();
        setAvailableSlots(slots);
        setIsLoading(false);
      }, 500);
    }
  }, [selectedDate]);

  // Notify parent of changes
  useEffect(() => {
    if (selectedDate && selectedTimeSlot && selectedDuration) {
      const totalPrice = selectedTimeSlot?.price * (selectedDuration / 60);
      onSelectionChange({
        date: selectedDate,
        timeSlot: selectedTimeSlot,
        duration: selectedDuration,
        totalPrice,
      });
    }
  }, [selectedDate, selectedTimeSlot, selectedDuration, onSelectionChange]);

  const formatDate = (date) => {
    return date?.toLocaleDateString('ar-SA', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });
  };

  const isToday = (date) => {
    const today = new Date();
    return date?.toDateString() === today?.toDateString();
  };

  const isTomorrow = (date) => {
    const tomorrow = new Date();
    tomorrow?.setDate(tomorrow?.getDate() + 1);
    return date?.toDateString() === tomorrow?.toDateString();
  };

  const getDateDisplayName = (date) => {
    if (isToday(date)) return 'اليوم';
    if (isTomorrow(date)) return 'غداً';
    return formatDate(date);
  };

  const navigateWeek = (direction) => {
    const newWeek = new Date(currentWeek);
    newWeek?.setDate(newWeek?.getDate() + (direction * 7));
    setCurrentWeek(newWeek);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null);
  };

  const handleTimeSlotSelect = (slot) => {
    if (!slot?.available) return;
    setSelectedTimeSlot(slot);
  };

  const durationOptions = [
    { value: 60, label: 'ساعة واحدة', labelEn: '1 Hour' },
    { value: 90, label: 'ساعة ونصف', labelEn: '1.5 Hours' },
    { value: 120, label: 'ساعتان', labelEn: '2 Hours' },
    { value: 180, label: 'ثلاث ساعات', labelEn: '3 Hours' },
  ];

  return (
    <div className="space-y-6">
      {/* Date Selection */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">اختر التاريخ</h3>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateWeek(-1)}
              iconName="ChevronLeft"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateWeek(1)}
              iconName="ChevronRight"
            />
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {weekDates?.map((date, index) => {
            const isSelected = selectedDate && date?.toDateString() === selectedDate?.toDateString();
            const isPast = date < new Date()?.setHours(0, 0, 0, 0);
            
            return (
              <button
                key={index}
                onClick={() => !isPast && handleDateSelect(date)}
                disabled={isPast}
                className={`p-3 rounded-lg text-center transition-micro touch-target ${
                  isPast
                    ? 'bg-muted text-muted-foreground cursor-not-allowed opacity-50'
                    : isSelected
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80 text-foreground'
                }`}
              >
                <div className="text-xs text-muted-foreground mb-1">
                  {date?.toLocaleDateString('ar-SA', { weekday: 'short' })}
                </div>
                <div className="font-semibold">
                  {date?.getDate()}
                </div>
                <div className="text-xs mt-1">
                  {getDateDisplayName(date)}
                </div>
              </button>
            );
          })}
        </div>
      </div>
      {/* Time Selection */}
      {selectedDate && (
        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">اختر الوقت</h3>
          
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Icon name="Loader2" size={24} className="animate-spin text-muted-foreground" />
              <span className="mr-2 text-muted-foreground">جاري التحميل...</span>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {availableSlots?.map((slot) => {
                const isSelected = selectedTimeSlot?.id === slot?.id;
                
                return (
                  <button
                    key={slot?.id}
                    onClick={() => handleTimeSlotSelect(slot)}
                    disabled={!slot?.available}
                    className={`p-3 rounded-lg text-center transition-micro touch-target ${
                      !slot?.available
                        ? 'bg-muted text-muted-foreground cursor-not-allowed opacity-50'
                        : isSelected
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted hover:bg-muted/80 text-foreground'
                    }`}
                  >
                    <div className="font-medium font-mono">{slot?.displayTime}</div>
                    <div className="text-xs mt-1">
                      {slot?.price} د.م/ساعة
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
      {/* Duration Selection */}
      {selectedTimeSlot && (
        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">مدة الحجز</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {durationOptions?.map((option) => {
              const isSelected = selectedDuration === option?.value;
              
              return (
                <button
                  key={option?.value}
                  onClick={() => setSelectedDuration(option?.value)}
                  className={`p-4 rounded-lg text-center transition-micro touch-target ${
                    isSelected
                      ? 'bg-primary text-primary-foreground border-2 border-primary'
                      : 'bg-muted hover:bg-muted/80 text-foreground border-2 border-transparent'
                  }`}
                >
                  <div className="font-medium">{option?.label}</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {option?.labelEn}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DateTimeSelection;