import React, { useState, useEffect, useRef } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const LocationSearchWidget = ({ 
  onLocationSelect, 
  placeholder = "Search location...",
  showCurrentLocation = true,
  className = "" 
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Mock location data - in real app, this would come from Google Places API
  const mockLocations = [
    { id: '1', name: 'Dubai Marina', city: 'Dubai', country: 'UAE', coordinates: { lat: 25.0772, lng: 55.1392 } },
    { id: '2', name: 'Downtown Dubai', city: 'Dubai', country: 'UAE', coordinates: { lat: 25.1972, lng: 55.2744 } },
    { id: '3', name: 'Jumeirah Beach', city: 'Dubai', country: 'UAE', coordinates: { lat: 25.2048, lng: 55.2708 } },
    { id: '4', name: 'Business Bay', city: 'Dubai', country: 'UAE', coordinates: { lat: 25.1877, lng: 55.2633 } },
    { id: '5', name: 'Al Barsha', city: 'Dubai', country: 'UAE', coordinates: { lat: 25.1124, lng: 55.2021 } },
    { id: '6', name: 'Deira', city: 'Dubai', country: 'UAE', coordinates: { lat: 25.2697, lng: 55.3094 } },
    { id: '7', name: 'Bur Dubai', city: 'Dubai', country: 'UAE', coordinates: { lat: 25.2582, lng: 55.2962 } },
    { id: '8', name: 'Sharjah City Centre', city: 'Sharjah', country: 'UAE', coordinates: { lat: 25.3463, lng: 55.4209 } },
  ];

  // Search for locations
  const searchLocations = async (searchQuery) => {
    if (!searchQuery?.trim()) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const filtered = mockLocations?.filter(location =>
        location?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        location?.city?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
      
      setSuggestions(filtered?.slice(0, 6));
    } catch (error) {
      console.error('Location search failed:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    const value = e?.target?.value;
    setQuery(value);
    setShowSuggestions(true);
    searchLocations(value);
  };

  // Handle location selection
  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setQuery(location?.name);
    setShowSuggestions(false);
    
    if (onLocationSelect) {
      onLocationSelect(location);
    }
  };

  // Get current location
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.');
      return;
    }

    setIsLoading(true);
    
    navigator.geolocation?.getCurrentPosition(
      (position) => {
        const location = {
          id: 'current',
          name: 'Current Location',
          city: 'Your Location',
          country: '',
          coordinates: {
            lat: position?.coords?.latitude,
            lng: position?.coords?.longitude,
          },
        };
        
        setCurrentLocation(location);
        handleLocationSelect(location);
        setIsLoading(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        alert('Unable to retrieve your location. Please search manually.');
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      }
    );
  };

  // Clear search
  const clearSearch = () => {
    setQuery('');
    setSelectedLocation(null);
    setSuggestions([]);
    setShowSuggestions(false);
    inputRef?.current?.focus();
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef?.current &&
        !suggestionsRef?.current?.contains(event?.target) &&
        !inputRef?.current?.contains(event?.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon name="MapPin" size={20} className="text-muted-foreground" />
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(true)}
          placeholder={placeholder}
          className="w-full pl-10 pr-20 py-3 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-micro"
        />
        
        <div className="absolute inset-y-0 right-0 flex items-center space-x-1 pr-2">
          {query && (
            <button
              onClick={clearSearch}
              className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-micro"
            >
              <Icon name="X" size={16} />
            </button>
          )}
          
          {showCurrentLocation && (
            <Button
              variant="ghost"
              size="sm"
              onClick={getCurrentLocation}
              disabled={isLoading}
              iconName="Crosshair"
              className="h-8 w-8 p-0"
            />
          )}
        </div>
      </div>
      {/* Suggestions Dropdown */}
      {showSuggestions && (query || suggestions?.length > 0) && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-md shadow-modal z-120 max-h-64 overflow-y-auto animate-slide-up"
        >
          {isLoading ? (
            <div className="flex items-center justify-center py-4">
              <Icon name="Loader2" size={20} className="animate-spin text-muted-foreground" />
              <span className="ml-2 text-sm text-muted-foreground">Searching...</span>
            </div>
          ) : suggestions?.length > 0 ? (
            <div className="py-2">
              {suggestions?.map((location) => (
                <button
                  key={location?.id}
                  onClick={() => handleLocationSelect(location)}
                  className="w-full px-4 py-3 text-left hover:bg-muted transition-micro flex items-center space-x-3"
                >
                  <Icon name="MapPin" size={16} className="text-muted-foreground flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{location?.name}</p>
                    <p className="text-sm text-muted-foreground truncate">
                      {location?.city}{location?.country && `, ${location?.country}`}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          ) : query && !isLoading ? (
            <div className="py-4 px-4 text-center">
              <Icon name="Search" size={24} className="mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">No locations found</p>
              <p className="text-xs text-muted-foreground mt-1">Try a different search term</p>
            </div>
          ) : null}
          
          {/* Popular Locations */}
          {!query && suggestions?.length === 0 && (
            <div className="py-2">
              <div className="px-4 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Popular Locations
              </div>
              {mockLocations?.slice(0, 4)?.map((location) => (
                <button
                  key={location?.id}
                  onClick={() => handleLocationSelect(location)}
                  className="w-full px-4 py-3 text-left hover:bg-muted transition-micro flex items-center space-x-3"
                >
                  <Icon name="TrendingUp" size={16} className="text-muted-foreground flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{location?.name}</p>
                    <p className="text-sm text-muted-foreground truncate">
                      {location?.city}{location?.country && `, ${location?.country}`}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
      {/* Selected Location Display */}
      {selectedLocation && !showSuggestions && (
        <div className="mt-2 p-3 bg-success/10 border border-success/20 rounded-md flex items-center space-x-2">
          <Icon name="CheckCircle" size={16} className="text-success flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {selectedLocation?.name}
            </p>
            {selectedLocation?.city && (
              <p className="text-xs text-muted-foreground truncate">
                {selectedLocation?.city}{selectedLocation?.country && `, ${selectedLocation?.country}`}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSearchWidget;