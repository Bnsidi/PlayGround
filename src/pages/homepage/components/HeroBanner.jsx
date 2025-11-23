import React from 'react';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HeroBanner = ({ onSearchClick }) => {
  return (
    <div className="relative bg-gradient-to-r from-blue-800 to-emerald-600 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Background Images */}
      <div className="absolute inset-0 grid grid-cols-3 opacity-20">
        <div className="overflow-hidden">
          <Image 
            src="https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg" 
            alt="Football field aerial view"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="overflow-hidden">
          <Image 
            src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256" 
            alt="Football players on field"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="overflow-hidden">
          <Image 
            src="https://images.pixabay.com/photo/2016/06/03/13/57/digital-marketing-1433427_1280.jpg" 
            alt="Modern football stadium"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="relative container mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo and Brand */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full mb-4">
              <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-2">TerraBook</h1>
            <p className="text-xl lg:text-2xl text-blue-100">احجز ملعبك المثالي | Réservez votre terrain parfait</p>
          </div>

          {/* Main Heading */}
          <h2 className="text-2xl lg:text-4xl font-bold mb-6">
            اكتشف واحجز أفضل ملاعب كرة القدم
          </h2>
          <p className="text-lg lg:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            منصة شاملة لحجز ملاعب كرة القدم بسهولة وسرعة. اختر من بين مئات الملاعب المتاحة في مدينتك
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              variant="default" 
              size="lg"
              className="bg-white text-blue-800 hover:bg-blue-50 px-8 py-3"
              onClick={onSearchClick}
              iconName="Search"
              iconPosition="left"
            >
              ابحث عن ملعب الآن
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white/10 px-8 py-3"
              iconName="MapPin"
              iconPosition="left"
            >
              استكشف الملاعب القريبة
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-white/20">
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-amber-400">500+</div>
              <div className="text-sm lg:text-base text-blue-100">ملعب متاح</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-emerald-400">10K+</div>
              <div className="text-sm lg:text-base text-blue-100">حجز مكتمل</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-rose-400">4.8★</div>
              <div className="text-sm lg:text-base text-blue-100">تقييم المستخدمين</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;