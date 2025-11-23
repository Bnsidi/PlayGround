import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterSidebar = ({ 
  isOpen, 
  onClose, 
  filters, 
  onFiltersChange,
  onClearFilters 
}) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const fieldSizes = [
    { id: '5x5', label: 'ملعب صغير (5x5)', labelFr: 'Petit terrain (5x5)' },
    { id: '7x7', label: 'ملعب متوسط (7x7)', labelFr: 'Terrain moyen (7x7)' },
    { id: '11x11', label: 'ملعب كبير (11x11)', labelFr: 'Grand terrain (11x11)' }
  ];

  const amenities = [
    { id: 'changing_rooms', label: 'غرف تغيير الملابس', labelFr: 'Vestiaires', icon: 'Users' },
    { id: 'lighting', label: 'إضاءة ليلية', labelFr: 'Éclairage nocturne', icon: 'Lightbulb' },
    { id: 'parking', label: 'موقف سيارات', labelFr: 'Parking', icon: 'Car' },
    { id: 'shower', label: 'دش', labelFr: 'Douches', icon: 'Droplets' },
    { id: 'cafeteria', label: 'كافيتيريا', labelFr: 'Cafétéria', icon: 'Coffee' },
    { id: 'security', label: 'أمن', labelFr: 'Sécurité', icon: 'Shield' }
  ];

  const handlePriceChange = (field, value) => {
    const newFilters = {
      ...localFilters,
      priceRange: {
        ...localFilters?.priceRange,
        [field]: parseInt(value) || 0
      }
    };
    setLocalFilters(newFilters);
  };

  const handleSizeChange = (sizeId, checked) => {
    const newSizes = checked 
      ? [...localFilters?.fieldSizes, sizeId]
      : localFilters?.fieldSizes?.filter(size => size !== sizeId);
    
    const newFilters = {
      ...localFilters,
      fieldSizes: newSizes
    };
    setLocalFilters(newFilters);
  };

  const handleAmenityChange = (amenityId, checked) => {
    const newAmenities = checked 
      ? [...localFilters?.amenities, amenityId]
      : localFilters?.amenities?.filter(amenity => amenity !== amenityId);
    
    const newFilters = {
      ...localFilters,
      amenities: newAmenities
    };
    setLocalFilters(newFilters);
  };

  const applyFilters = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      location: '',
      priceRange: { min: 0, max: 200 },
      fieldSizes: [],
      amenities: [],
      availability: 'all'
    };
    setLocalFilters(clearedFilters);
    onClearFilters();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-140 lg:hidden"
          onClick={onClose}
        />
      )}
      {/* Sidebar */}
      <div className={`
        fixed lg:sticky top-0 right-0 h-full lg:h-auto w-80 lg:w-full max-w-sm
        bg-card border-l lg:border-l-0 lg:border border-border shadow-modal lg:shadow-card
        transform transition-transform duration-300 z-150 lg:z-auto lg:transform-none
        overflow-y-auto
        ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">
              المرشحات / Filtres
            </h3>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                مسح الكل
              </Button>
              <button
                onClick={onClose}
                className="lg:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-micro"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Filters Content */}
        <div className="p-4 lg:p-6 space-y-6">
          {/* Price Range */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">نطاق السعر / Gamme de prix</h4>
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="الحد الأدنى"
                type="number"
                value={localFilters?.priceRange?.min}
                onChange={(e) => handlePriceChange('min', e?.target?.value)}
                placeholder="0"
                className="text-right"
              />
              <Input
                label="الحد الأقصى"
                type="number"
                value={localFilters?.priceRange?.max}
                onChange={(e) => handlePriceChange('max', e?.target?.value)}
                placeholder="200"
                className="text-right"
              />
            </div>
            <div className="text-sm text-muted-foreground text-center">
              {localFilters?.priceRange?.min} - {localFilters?.priceRange?.max} درهم/ساعة
            </div>
          </div>

          {/* Field Sizes */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">حجم الملعب / Taille du terrain</h4>
            <div className="space-y-3">
              {fieldSizes?.map((size) => (
                <Checkbox
                  key={size?.id}
                  label={
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">{size?.label}</span>
                      <span className="text-xs text-muted-foreground">{size?.labelFr}</span>
                    </div>
                  }
                  checked={localFilters?.fieldSizes?.includes(size?.id)}
                  onChange={(e) => handleSizeChange(size?.id, e?.target?.checked)}
                />
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">المرافق / Équipements</h4>
            <div className="space-y-3">
              {amenities?.map((amenity) => (
                <Checkbox
                  key={amenity?.id}
                  label={
                    <div className="flex items-center space-x-3">
                      <Icon name={amenity?.icon} size={16} className="text-muted-foreground" />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-foreground">{amenity?.label}</span>
                        <span className="text-xs text-muted-foreground">{amenity?.labelFr}</span>
                      </div>
                    </div>
                  }
                  checked={localFilters?.amenities?.includes(amenity?.id)}
                  onChange={(e) => handleAmenityChange(amenity?.id, e?.target?.checked)}
                />
              ))}
            </div>
          </div>

          {/* Availability */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">التوفر / Disponibilité</h4>
            <div className="space-y-2">
              {[
                { value: 'all', label: 'جميع الملاعب', labelFr: 'Tous les terrains' },
                { value: 'available_today', label: 'متاح اليوم', labelFr: 'Disponible aujourd\'hui' },
                { value: 'available_tomorrow', label: 'متاح غداً', labelFr: 'Disponible demain' }
              ]?.map((option) => (
                <label key={option?.value} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="availability"
                    value={option?.value}
                    checked={localFilters?.availability === option?.value}
                    onChange={(e) => setLocalFilters({
                      ...localFilters,
                      availability: e?.target?.value
                    })}
                    className="w-4 h-4 text-primary border-border focus:ring-primary"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">{option?.label}</span>
                    <span className="text-xs text-muted-foreground">{option?.labelFr}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-card border-t border-border p-4 lg:p-6">
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={clearAllFilters}
              className="flex-1"
            >
              مسح الكل
            </Button>
            <Button
              variant="default"
              onClick={applyFilters}
              className="flex-1"
            >
              تطبيق المرشحات
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;