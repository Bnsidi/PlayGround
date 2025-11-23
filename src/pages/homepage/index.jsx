import React, { useState, useEffect } from 'react';
import HeroBanner from './components/HeroBanner';
import QuickSearchSection from './components/QuickSearchSection';
import PopularFieldsSection from './components/PopularFieldsSection';
import OffersSection from './components/OffersSection';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';

const Homepage = () => {
  const [currentLanguage, setCurrentLanguage] = useState('ar');

  useEffect(() => {
    // Check localStorage for saved language preference
    const savedLanguage = localStorage.getItem('terrabook_language') || 'ar';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleSearchClick = () => {
    // Scroll to search section
    const searchSection = document.getElementById('quick-search');
    if (searchSection) {
      searchSection?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearch = (searchData) => {
    console.log('Search data:', searchData);
    // Handle search functionality - would typically navigate to results page
    // For now, just log the search parameters
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner Section */}
      <HeroBanner onSearchClick={handleSearchClick} />

      {/* Quick Search Section */}
      <div id="quick-search" className="relative">
        <div className="container mx-auto">
          <QuickSearchSection onSearch={handleSearch} />
        </div>
      </div>

      {/* Popular Fields Section */}
      <PopularFieldsSection />

      {/* Offers Section */}
      <OffersSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Call to Action Section */}
      <CTASection />
    </div>
  );
};

export default Homepage;