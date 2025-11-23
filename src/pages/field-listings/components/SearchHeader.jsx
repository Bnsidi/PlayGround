import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import LocationSearchWidget from '../../../components/ui/LocationSearchWidget';

const SearchHeader = ({ 
  searchQuery, 
  onSearchChange, 
  selectedLocation, 
  onLocationChange,
  onFilterToggle,
  resultCount 
}) => {
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    onSearchChange(localSearchQuery);
  };

  const handleLocationSelect = (location) => {
    onLocationChange(location);
  };

  return (
    <div className="bg-card border-b border-border shadow-card">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4 lg:py-6">
        {/* Search Form */}
        <form onSubmit={handleSearchSubmit} className="mb-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Location Search */}
            <div className="flex-1">
              <LocationSearchWidget
                placeholder="ابحث عن موقع... / Rechercher un lieu..."
                onLocationSelect={handleLocationSelect}
                showCurrentLocation={true}
                className="w-full"
              />
            </div>

            {/* Search Input */}
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon name="Search" size={20} className="text-muted-foreground" />
                </div>
                <input
                  type="text"
                  value={localSearchQuery}
                  onChange={(e) => setLocalSearchQuery(e?.target?.value)}
                  placeholder="ابحث عن ملعب... / Rechercher un terrain..."
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-micro"
                />
              </div>
            </div>

            {/* Search Button */}
            <div className="flex space-x-2">
              <Button
                type="submit"
                variant="default"
                iconName="Search"
                className="px-6"
              >
                بحث
              </Button>
              
              {/* Mobile Filter Toggle */}
              <Button
                type="button"
                variant="outline"
                onClick={onFilterToggle}
                iconName="Filter"
                className="lg:hidden"
              >
                مرشحات
              </Button>
            </div>
          </div>
        </form>

        {/* Results Summary */}
        <div className="flex items-center justify-between text-sm">
          <div className="text-muted-foreground">
            {resultCount > 0 ? (
              <span>
                تم العثور على {resultCount} ملعب
                {selectedLocation && (
                  <span> في {selectedLocation?.name}</span>
                )}
              </span>
            ) : (
              <span>لم يتم العثور على نتائج</span>
            )}
          </div>
          
          {selectedLocation && (
            <div className="flex items-center space-x-2 text-success">
              <Icon name="MapPin" size={14} />
              <span>{selectedLocation?.name}</span>
            </div>
          )}
        </div>

        {/* Active Filters Summary */}
        {(searchQuery || selectedLocation) && (
          <div className="mt-3 flex flex-wrap gap-2">
            {searchQuery && (
              <div className="flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                <Icon name="Search" size={12} />
                <span>"{searchQuery}"</span>
                <button
                  onClick={() => {
                    setLocalSearchQuery('');
                    onSearchChange('');
                  }}
                  className="hover:text-primary/80"
                >
                  <Icon name="X" size={12} />
                </button>
              </div>
            )}
            
            {selectedLocation && (
              <div className="flex items-center space-x-2 bg-success/10 text-success px-3 py-1 rounded-full text-sm">
                <Icon name="MapPin" size={12} />
                <span>{selectedLocation?.name}</span>
                <button
                  onClick={() => onLocationChange(null)}
                  className="hover:text-success/80"
                >
                  <Icon name="X" size={12} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchHeader;