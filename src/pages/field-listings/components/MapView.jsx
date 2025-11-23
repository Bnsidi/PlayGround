import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MapView = ({ fields, selectedField, onFieldSelect, center }) => {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleFieldMarkerClick = (field) => {
    onFieldSelect(field);
  };

  const getMapUrl = () => {
    const lat = center?.lat || 25.2048;
    const lng = center?.lng || 55.2708;
    return `https://www.google.com/maps?q=${lat},${lng}&z=12&output=embed`;
  };

  return (
    <div className="relative h-96 lg:h-[600px] bg-muted rounded-lg overflow-hidden">
      {!mapLoaded ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <Icon name="Loader2" size={32} className="animate-spin text-primary" />
            <p className="text-muted-foreground">جاري تحميل الخريطة...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Google Maps Iframe */}
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title="خريطة الملاعب"
            referrerPolicy="no-referrer-when-downgrade"
            src={getMapUrl()}
            className="border-0"
          />

          {/* Field Markers Overlay */}
          <div className="absolute inset-0 pointer-events-none">
            {fields?.map((field, index) => {
              // Mock positioning based on field index
              const positions = [
                { top: '20%', left: '25%' },
                { top: '35%', left: '45%' },
                { top: '50%', left: '30%' },
                { top: '65%', left: '60%' },
                { top: '40%', left: '70%' },
                { top: '75%', left: '40%' },
              ];
              
              const position = positions?.[index % positions?.length];
              
              return (
                <div
                  key={field?.id}
                  className="absolute pointer-events-auto"
                  style={{ top: position?.top, left: position?.left }}
                >
                  <button
                    onClick={() => handleFieldMarkerClick(field)}
                    className={`relative flex items-center justify-center w-10 h-10 rounded-full border-2 transition-standard ${
                      selectedField?.id === field?.id
                        ? 'bg-primary border-primary text-primary-foreground scale-110'
                        : 'bg-card border-primary text-primary hover:scale-105'
                    }`}
                  >
                    <Icon name="MapPin" size={20} />
                    
                    {/* Price Badge */}
                    <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs px-1 py-0.5 rounded text-center min-w-8">
                      {field?.pricePerHour}
                    </div>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Selected Field Info Card */}
          {selectedField && (
            <div className="absolute bottom-4 left-4 right-4 bg-card border border-border rounded-lg shadow-modal p-4 animate-slide-up">
              <div className="flex items-start space-x-4">
                <img
                  src={selectedField?.images?.[0]}
                  alt={selectedField?.name}
                  className="w-16 h-16 rounded-md object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground truncate">
                    {selectedField?.name}
                  </h4>
                  <p className="text-sm text-muted-foreground truncate">
                    {selectedField?.location}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={12} className="text-warning fill-current" />
                      <span className="text-sm font-medium">{selectedField?.rating}</span>
                    </div>
                    <span className="text-sm text-primary font-semibold">
                      {selectedField?.pricePerHour} درهم/ساعة
                    </span>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(`/field-details?id=${selectedField?.id}`, '_blank')}
                  >
                    التفاصيل
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => window.open(`/booking-workflow?fieldId=${selectedField?.id}`, '_blank')}
                  >
                    احجز
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Map Controls */}
          <div className="absolute top-4 right-4 flex flex-col space-y-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Plus"
              className="w-10 h-10 p-0"
              title="تكبير"
            />
            <Button
              variant="outline"
              size="sm"
              iconName="Minus"
              className="w-10 h-10 p-0"
              title="تصغير"
            />
            <Button
              variant="outline"
              size="sm"
              iconName="Crosshair"
              className="w-10 h-10 p-0"
              title="موقعي الحالي"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default MapView;