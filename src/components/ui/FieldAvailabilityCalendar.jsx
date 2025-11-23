import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const FieldAvailabilityCalendar = ({ 
  fieldId, 
  onTimeSlotSelect, 
  selectedDate = null, 
  selectedTimeSlot = null,
  pricePerHour = 50 
}) => {
  const [currentDate, setCurrentDate] = useState(selectedDate || new Date());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState('calendar'); // 'calendar' or 'list'

  // Generate time slots for a day (6 AM to 11 PM)
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 6; hour <= 23; hour++) {
      const timeSlot = {
        id: `${hour}:00`,
        time: `${hour?.toString()?.padStart(2, '0')}:00`,
        displayTime: hour < 12 ? `${hour}:00 AM` : hour === 12 ? '12:00 PM' : `${hour - 12}:00 PM`,
        available: Math.random() > 0.3, // Mock availability
        price: pricePerHour,
        duration: 60, // minutes
      };
      slots?.push(timeSlot);
    }
    return slots;
  };

  // Load availability for selected date
  useEffect(() => {
    const loadAvailability = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        const slots = generateTimeSlots();
        setAvailableSlots(slots);
      } catch (error) {
        console.error('Failed to load availability:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAvailability();
  }, [currentDate, fieldId]);

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
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
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    return date?.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const navigateDate = (direction) => {
    const newDate = new Date(currentDate);
    newDate?.setDate(newDate?.getDate() + direction);
    setCurrentDate(newDate);
  };

  const handleTimeSlotClick = (slot) => {
    if (!slot?.available) return;
    
    if (onTimeSlotSelect) {
      onTimeSlotSelect({
        date: currentDate,
        timeSlot: slot,
        totalPrice: slot?.price,
      });
    }
  };

  const getSlotClasses = (slot) => {
    const baseClasses = "p-3 rounded-md border text-center transition-micro cursor-pointer touch-target";
    
    if (!slot?.available) {
      return `${baseClasses} bg-muted text-muted-foreground border-border cursor-not-allowed opacity-50`;
    }
    
    if (selectedTimeSlot?.id === slot?.id) {
      return `${baseClasses} bg-primary text-primary-foreground border-primary`;
    }
    
    return `${baseClasses} bg-card text-foreground border-border hover:border-primary hover:bg-primary/5`;
  };

  // Generate quick date options (next 7 days)
  const getQuickDateOptions = () => {
    const options = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date?.setDate(date?.getDate() + i);
      options?.push(date);
    }
    return options;
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-card">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Select Date & Time</h3>
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'calendar' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('calendar')}
              iconName="Calendar"
            />
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
              iconName="List"
            />
          </div>
        </div>

        {/* Quick Date Selection */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {getQuickDateOptions()?.map((date, index) => (
            <button
              key={index}
              onClick={() => setCurrentDate(date)}
              className={`flex-shrink-0 px-3 py-2 rounded-md text-sm font-medium transition-micro ${
                date?.toDateString() === currentDate?.toDateString()
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {getDateDisplayName(date)}
            </button>
          ))}
        </div>
      </div>
      {/* Date Navigation */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateDate(-1)}
            iconName="ChevronLeft"
            disabled={isToday(currentDate)}
          />
          
          <div className="text-center">
            <h4 className="font-semibold text-foreground">{formatDate(currentDate)}</h4>
            <p className="text-sm text-muted-foreground">
              {availableSlots?.filter(slot => slot?.available)?.length} slots available
            </p>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateDate(1)}
            iconName="ChevronRight"
          />
        </div>
      </div>
      {/* Time Slots */}
      <div className="p-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Icon name="Loader2" size={20} className="animate-spin" />
              <span>Loading availability...</span>
            </div>
          </div>
        ) : (
          <>
            {viewMode === 'calendar' ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {availableSlots?.map((slot) => (
                  <div
                    key={slot?.id}
                    onClick={() => handleTimeSlotClick(slot)}
                    className={getSlotClasses(slot)}
                  >
                    <div className="font-medium font-mono">{slot?.displayTime}</div>
                    <div className="text-xs mt-1 font-mono">
                      ${slot?.price}/hr
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {availableSlots?.map((slot) => (
                  <div
                    key={slot?.id}
                    onClick={() => handleTimeSlotClick(slot)}
                    className={`flex items-center justify-between p-3 rounded-md border transition-micro cursor-pointer ${
                      !slot?.available
                        ? 'bg-muted text-muted-foreground border-border cursor-not-allowed opacity-50'
                        : selectedTimeSlot?.id === slot?.id
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-card text-foreground border-border hover:border-primary hover:bg-primary/5'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon 
                        name={slot?.available ? 'Clock' : 'X'} 
                        size={16} 
                        className={!slot?.available ? 'text-error' : ''} 
                      />
                      <span className="font-medium font-mono">{slot?.displayTime}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-sm">${slot?.price}/hr</span>
                      {!slot?.available && (
                        <span className="text-xs text-error">Booked</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {availableSlots?.filter(slot => slot?.available)?.length === 0 && (
              <div className="text-center py-8">
                <Icon name="Calendar" size={48} className="mx-auto text-muted-foreground mb-4" />
                <h4 className="font-medium text-foreground mb-2">No Available Slots</h4>
                <p className="text-sm text-muted-foreground">
                  Try selecting a different date or check back later.
                </p>
              </div>
            )}
          </>
        )}
      </div>
      {/* Selected Slot Summary */}
      {selectedTimeSlot && (
        <div className="p-4 border-t border-border bg-muted/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">
                {formatDate(currentDate)}
              </p>
              <p className="text-sm text-muted-foreground font-mono">
                {selectedTimeSlot?.displayTime} ({selectedTimeSlot?.duration} min)
              </p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-foreground font-mono">
                ${selectedTimeSlot?.price}
              </p>
              <p className="text-xs text-muted-foreground">per hour</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FieldAvailabilityCalendar;