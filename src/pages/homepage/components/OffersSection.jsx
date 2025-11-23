import React from 'react';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const OffersSection = () => {
  const offers = [
    {
      id: 1,
      title: "عرض نهاية الأسبوع",
      titleEn: "Weekend Special",
      description: "احصل على خصم 25% على جميع الحجوزات يومي الجمعة والسبت",
      descriptionEn: "Get 25% off on all bookings for Friday and Saturday",
      discount: 25,
      validUntil: "2025-09-30",
      image: "https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg",
      bgColor: "from-emerald-500 to-emerald-600",
      code: "WEEKEND25",
      minBooking: 2,
      terms: "ساري على الحجوزات لمدة ساعتين أو أكثر"
    },
    {
      id: 2,
      title: "عرض المجموعات",
      titleEn: "Group Booking Deal",
      description: "احجز 3 ساعات واحصل على الرابعة مجاناً للمجموعات",
      descriptionEn: "Book 3 hours and get the 4th hour free for groups",
      discount: "3+1",
      validUntil: "2025-10-15",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256",
      bgColor: "from-blue-500 to-blue-600",
      code: "GROUP3PLUS1",
      minBooking: 8,
      terms: "للمجموعات من 8 لاعبين أو أكثر"
    },
    {
      id: 3,
      title: "عرض العضوية الذهبية",
      titleEn: "Gold Membership",
      description: "اشترك شهرياً واحصل على خصم 30% على جميع الحجوزات",
      descriptionEn: "Subscribe monthly and get 30% off all bookings",
      discount: 30,
      validUntil: "2025-12-31",
      image: "https://images.pixabay.com/photo/2016/06/03/13/57/digital-marketing-1433427_1280.jpg",
      bgColor: "from-amber-500 to-amber-600",
      code: "GOLDMEMBER",
      minBooking: 1,
      terms: "اشتراك شهري بقيمة 99 درهم"
    }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('ar-MA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            العروض والخصومات المتاحة
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            استفد من عروضنا الحصرية ووفر على حجوزاتك القادمة
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {offers?.map((offer) => (
            <div key={offer?.id} className="relative bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300">
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${offer?.bgColor} opacity-90`}></div>
              
              {/* Background Image */}
              <div className="absolute inset-0 opacity-20">
                <Image
                  src={offer?.image}
                  alt={offer?.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="relative p-6 text-white">
                {/* Discount Badge */}
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-sm font-bold">
                    {typeof offer?.discount === 'number' ? `-${offer?.discount}%` : offer?.discount}
                  </span>
                </div>

                {/* Offer Content */}
                <div className="pt-8">
                  <h3 className="text-2xl font-bold mb-2 rtl:text-right">
                    {offer?.title}
                  </h3>
                  <p className="text-sm opacity-90 mb-1 rtl:text-right">
                    {offer?.titleEn}
                  </p>
                  
                  <p className="text-base mb-4 leading-relaxed rtl:text-right">
                    {offer?.description}
                  </p>

                  {/* Terms */}
                  <div className="mb-4">
                    <p className="text-sm opacity-80 rtl:text-right">
                      {offer?.terms}
                    </p>
                  </div>

                  {/* Promo Code */}
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs opacity-80">كود الخصم:</p>
                        <p className="font-mono font-bold text-lg">{offer?.code}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-white/20 border border-white/30"
                        iconName="Copy"
                        iconPosition="left"
                      >
                        نسخ
                      </Button>
                    </div>
                  </div>

                  {/* Valid Until */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center text-sm opacity-80">
                      <Icon name="Calendar" size={14} className="ml-1" />
                      <span>ساري حتى: {formatDate(offer?.validUntil)}</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button
                    variant="default"
                    size="lg"
                    className="w-full bg-white text-gray-900 hover:bg-gray-100 font-bold"
                    iconName="Gift"
                    iconPosition="left"
                  >
                    استخدم العرض الآن
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="bg-gradient-to-r from-blue-800 to-emerald-600 rounded-2xl p-8 text-white text-center">
          <div className="max-w-2xl mx-auto">
            <Icon name="Bell" size={48} className="mx-auto mb-4 text-amber-400" />
            <h3 className="text-2xl font-bold mb-4">
              لا تفوت العروض الحصرية
            </h3>
            <p className="text-blue-100 mb-6">
              اشترك في نشرتنا الإخبارية واحصل على إشعارات فورية بأحدث العروض والخصومات
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="أدخل بريدك الإلكتروني..."
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white focus:outline-none"
              />
              <Button
                variant="default"
                size="lg"
                className="bg-white text-blue-800 hover:bg-gray-100 px-6"
                iconName="Send"
                iconPosition="left"
              >
                اشتراك
              </Button>
            </div>
            
            <p className="text-xs text-blue-200 mt-3">
              نحترم خصوصيتك ولن نرسل لك رسائل مزعجة
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OffersSection;