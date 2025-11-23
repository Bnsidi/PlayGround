import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import FilterSidebar from './components/FilterSidebar';
import SearchHeader from './components/SearchHeader';
import SortControls from './components/SortControls';
import FieldGrid from './components/FieldGrid';
import MapView from './components/MapView';
import Pagination from './components/Pagination';

const FieldListings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // 'grid', 'list', 'map'
  const [selectedMapField, setSelectedMapField] = useState(null);

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState(searchParams?.get('search') || '');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('relevance');

  const [filters, setFilters] = useState({
    location: '',
    priceRange: { min: 0, max: 200 },
    fieldSizes: [],
    amenities: [],
    availability: 'all'
  });

  // Mock field data
  const mockFields = [
    {
      id: '1',
      name: 'ملعب الأندلس الرياضي',
      location: 'الدار البيضاء، المغرب',
      pricePerHour: 80,
      rating: 4.8,
      reviewCount: 124,
      size: '11x11',
      availableSlots: 8,
      distance: 2.3,
      images: [
        'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
        'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400'
      ],
      amenities: ['changing_rooms', 'lighting', 'parking', 'shower', 'cafeteria'],
      coordinates: { lat: 33.5731, lng: -7.5898 }
    },
    {
      id: '2',
      name: 'مجمع الرياض الرياضي',
      location: 'الرباط، المغرب',
      pricePerHour: 65,
      rating: 4.6,
      reviewCount: 89,
      size: '7x7',
      availableSlots: 5,
      distance: 1.8,
      images: [
        'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=400',
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400'
      ],
      amenities: ['changing_rooms', 'lighting', 'parking', 'security'],
      coordinates: { lat: 34.0209, lng: -6.8416 }
    },
    {
      id: '3',
      name: 'ملعب النخيل',
      location: 'مراكش، المغرب',
      pricePerHour: 55,
      rating: 4.4,
      reviewCount: 67,
      size: '5x5',
      availableSlots: 12,
      distance: 3.1,
      images: [
        'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=400',
        'https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=400'
      ],
      amenities: ['lighting', 'parking', 'cafeteria'],
      coordinates: { lat: 31.6295, lng: -7.9811 }
    },
    {
      id: '4',
      name: 'ملعب الأطلس الحديث',
      location: 'فاس، المغرب',
      pricePerHour: 70,
      rating: 4.7,
      reviewCount: 156,
      size: '11x11',
      availableSlots: 3,
      distance: 4.2,
      images: [
        'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400',
        'https://images.unsplash.com/photo-1552667466-07770ae110d0?w=400'
      ],
      amenities: ['changing_rooms', 'lighting', 'parking', 'shower', 'security'],
      coordinates: { lat: 34.0181, lng: -5.0078 }
    },
    {
      id: '5',
      name: 'مركز الشباب الرياضي',
      location: 'طنجة، المغرب',
      pricePerHour: 45,
      rating: 4.2,
      reviewCount: 43,
      size: '7x7',
      availableSlots: 7,
      distance: 2.9,
      images: [
        'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400',
        'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400'
      ],
      amenities: ['changing_rooms', 'lighting', 'parking'],
      coordinates: { lat: 35.7595, lng: -5.8340 }
    },
    {
      id: '6',
      name: 'ملعب الوحدة',
      location: 'أكادير، المغرب',
      pricePerHour: 60,
      rating: 4.5,
      reviewCount: 78,
      size: '5x5',
      availableSlots: 0,
      distance: 1.5,
      images: [
        'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=400',
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400'
      ],
      amenities: ['lighting', 'parking', 'cafeteria', 'security'],
      coordinates: { lat: 30.4278, lng: -9.5981 }
    }
  ];

  const [filteredFields, setFilteredFields] = useState(mockFields);
  const resultsPerPage = 9;
  const totalPages = Math.ceil(filteredFields?.length / resultsPerPage);

  // Load initial data
  useEffect(() => {
    const loadFields = async () => {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setFilteredFields(mockFields);
      setIsLoading(false);
    };

    loadFields();
  }, []);

  // Apply filters and search
  useEffect(() => {
    let filtered = [...mockFields];

    // Apply search query
    if (searchQuery) {
      filtered = filtered?.filter(field =>
        field?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        field?.location?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    // Apply location filter
    if (selectedLocation) {
      filtered = filtered?.filter(field =>
        field?.location?.includes(selectedLocation?.name) ||
        field?.location?.includes(selectedLocation?.city)
      );
    }

    // Apply price range filter
    filtered = filtered?.filter(field =>
      field?.pricePerHour >= filters?.priceRange?.min &&
      field?.pricePerHour <= filters?.priceRange?.max
    );

    // Apply field size filter
    if (filters?.fieldSizes?.length > 0) {
      filtered = filtered?.filter(field =>
        filters?.fieldSizes?.includes(field?.size)
      );
    }

    // Apply amenities filter
    if (filters?.amenities?.length > 0) {
      filtered = filtered?.filter(field =>
        filters?.amenities?.every(amenity =>
          field?.amenities?.includes(amenity)
        )
      );
    }

    // Apply availability filter
    if (filters?.availability === 'available_today') {
      filtered = filtered?.filter(field => field?.availableSlots > 0);
    } else if (filters?.availability === 'available_tomorrow') {
      filtered = filtered?.filter(field => field?.availableSlots > 3);
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'price_low':
          return a?.pricePerHour - b?.pricePerHour;
        case 'price_high':
          return b?.pricePerHour - a?.pricePerHour;
        case 'rating':
          return b?.rating - a?.rating;
        case 'distance':
          return a?.distance - b?.distance;
        case 'availability':
          return b?.availableSlots - a?.availableSlots;
        default:
          return b?.rating - a?.rating; // Default to rating
      }
    });

    setFilteredFields(filtered);
    setCurrentPage(1);
  }, [searchQuery, selectedLocation, filters, sortBy]);

  // Get paginated results
  const getPaginatedFields = () => {
    const startIndex = (currentPage - 1) * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;
    return filteredFields?.slice(startIndex, endIndex);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setSearchParams(prev => {
      if (query) {
        prev?.set('search', query);
      } else {
        prev?.delete('search');
      }
      return prev;
    });
  };

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      location: '',
      priceRange: { min: 0, max: 200 },
      fieldSizes: [],
      amenities: [],
      availability: 'all'
    });
    setSearchQuery('');
    setSelectedLocation(null);
    setSearchParams({});
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    if (mode !== 'map') {
      setSelectedMapField(null);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMapFieldSelect = (field) => {
    setSelectedMapField(field);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Search Header */}
      <SearchHeader
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        selectedLocation={selectedLocation}
        onLocationChange={handleLocationChange}
        onFilterToggle={() => setIsFilterOpen(true)}
        resultCount={filteredFields?.length}
      />
      {/* Sort Controls */}
      <SortControls
        sortBy={sortBy}
        onSortChange={handleSortChange}
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
        resultCount={filteredFields?.length}
      />
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
        <div className="flex gap-6">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-24">
              <FilterSidebar
                isOpen={true}
                onClose={() => {}}
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onClearFilters={handleClearFilters}
              />
            </div>
          </div>

          {/* Mobile Filter Sidebar */}
          <FilterSidebar
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onClearFilters={handleClearFilters}
          />

          {/* Content Area */}
          <div className="flex-1 min-w-0">
            {viewMode === 'map' ? (
              <MapView
                fields={filteredFields}
                selectedField={selectedMapField}
                onFieldSelect={handleMapFieldSelect}
                center={selectedLocation?.coordinates}
              />
            ) : (
              <>
                <FieldGrid
                  fields={getPaginatedFields()}
                  viewMode={viewMode}
                  isLoading={isLoading}
                />

                {/* Pagination */}
                {!isLoading && filteredFields?.length > resultsPerPage && (
                  <div className="mt-8">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      totalResults={filteredFields?.length}
                      resultsPerPage={resultsPerPage}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FieldListings;