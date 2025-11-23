import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FieldCard = ({ field }) => {
  const getAvailabilityStatus = () => {
    if (field?.availableSlots > 5) {
      return { text: 'متاح', textFr: 'Disponible', color: 'text-success', bg: 'bg-success/10' };
    } else if (field?.availableSlots > 0) {
      return { text: 'محدود', textFr: 'Limité', color: 'text-warning', bg: 'bg-warning/10' };
    } else {
      return { text: 'محجوز', textFr: 'Complet', color: 'text-error', bg: 'bg-error/10' };
    }
  };

  const status = getAvailabilityStatus();

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name={index < Math.floor(rating) ? 'Star' : 'Star'}
        size={14}
        className={index < Math.floor(rating) ? 'text-warning fill-current' : 'text-muted-foreground'}
      />
    ));
  };

  const getFieldSizeLabel = (size) => {
    const sizeLabels = {
      '5x5': { ar: 'صغير', fr: 'Petit' },
      '7x7': { ar: 'متوسط', fr: 'Moyen' },
      '11x11': { ar: 'كبير', fr: 'Grand' }
    };
    return sizeLabels?.[size] || { ar: size, fr: size };
  };

  const sizeLabel = getFieldSizeLabel(field?.size);

  return (
    <div className="bg-card rounded-lg border border-border shadow-card hover:shadow-modal transition-standard overflow-hidden group">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={field?.images?.[0]}
          alt={field?.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-standard"
        />
        
        {/* Overlay Elements */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
          {/* Availability Badge */}
          <div className={`px-2 py-1 rounded-md text-xs font-medium ${status?.bg} ${status?.color}`}>
            {status?.text}
          </div>
          
          {/* Favorite Button */}
          <button className="p-2 rounded-full bg-white/90 hover:bg-white text-muted-foreground hover:text-error transition-micro">
            <Icon name="Heart" size={16} />
          </button>
        </div>

        {/* Price Badge */}
        <div className="absolute bottom-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm font-semibold">
          {field?.pricePerHour} درهم/ساعة
        </div>
      </div>
      {/* Content */}
      <div className="p-4">
        {/* Header */}
        <div className="mb-3">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-foreground text-lg leading-tight">
              {field?.name}
            </h3>
            <div className={`px-2 py-1 rounded text-xs font-medium bg-muted text-muted-foreground`}>
              {sizeLabel?.ar} / {sizeLabel?.fr}
            </div>
          </div>
          
          {/* Location */}
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Icon name="MapPin" size={14} />
            <span className="text-sm">{field?.location}</span>
          </div>
        </div>

        {/* Rating & Reviews */}
        <div className="flex items-center space-x-3 mb-3">
          <div className="flex items-center space-x-1">
            {renderStars(field?.rating)}
          </div>
          <span className="text-sm font-medium text-foreground">{field?.rating}</span>
          <span className="text-sm text-muted-foreground">
            ({field?.reviewCount} تقييم)
          </span>
        </div>

        {/* Amenities */}
        <div className="flex items-center space-x-4 mb-4">
          {field?.amenities?.slice(0, 4)?.map((amenity) => {
            const amenityIcons = {
              changing_rooms: 'Users',
              lighting: 'Lightbulb',
              parking: 'Car',
              shower: 'Droplets',
              cafeteria: 'Coffee',
              security: 'Shield'
            };
            
            return (
              <div key={amenity} className="flex items-center space-x-1">
                <Icon 
                  name={amenityIcons?.[amenity] || 'Check'} 
                  size={14} 
                  className="text-success" 
                />
              </div>
            );
          })}
          {field?.amenities?.length > 4 && (
            <span className="text-xs text-muted-foreground">
              +{field?.amenities?.length - 4} المزيد
            </span>
          )}
        </div>

        {/* Availability Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-muted-foreground">
            {field?.availableSlots > 0 ? (
              <span>{field?.availableSlots} فترة متاحة اليوم</span>
            ) : (
              <span>لا توجد فترات متاحة اليوم</span>
            )}
          </div>
          <div className="text-sm text-muted-foreground">
            {field?.distance && `${field?.distance} كم`}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Link to={`/field-details?id=${field?.id}`} className="flex-1">
            <Button variant="outline" fullWidth size="sm">
              عرض التفاصيل
            </Button>
          </Link>
          <Link 
            to={`/booking-workflow?fieldId=${field?.id}`} 
            className="flex-1"
          >
            <Button 
              variant="default" 
              fullWidth 
              size="sm"
              disabled={field?.availableSlots === 0}
            >
              احجز الآن
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FieldCard;