import React from 'react';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PopularFieldsSection = () => {
  const popularFields = [
    {
      id: 1,
      name: "ملعب الأطلس الرياضي",
      nameEn: "Atlas Sports Complex",
      location: "الدار البيضاء - Casablanca",
      image: "https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg",
      rating: 4.8,
      reviews: 156,
      hourlyRate: 120,
      currency: "MAD",
      fieldType: "7x7",
      features: ["إضاءة ليلية", "غرف تغيير", "موقف سيارات"],
      availability: "متاح الآن",
      isAvailable: true,
      discount: 15
    },
    {
      id: 2,
      name: "مجمع الأندلس الرياضي",
      nameEn: "Andalus Sports Center",
      location: "الرباط - Rabat",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256",
      rating: 4.6,
      reviews: 89,
      hourlyRate: 100,
      currency: "MAD",
      fieldType: "5x5",
      features: ["عشب صناعي", "غرف تغيير", "كافتيريا"],
      availability: "متاح من 6 مساءً",
      isAvailable: false,
      discount: null
    },
    {
      id: 3,
      name: "ملعب المحيط الأزرق",
      nameEn: "Blue Ocean Field",
      location: "أكادير - Agadir",
      image: "https://images.pixabay.com/photo/2016/06/03/13/57/digital-marketing-1433427_1280.jpg",
      rating: 4.9,
      reviews: 203,
      hourlyRate: 150,
      currency: "MAD",
      fieldType: "11x11",
      features: ["عشب طبيعي", "إضاءة ليلية", "مدرجات"],
      availability: "متاح الآن",
      isAvailable: true,
      discount: 20
    },
    {
      id: 4,
      name: "ملعب النجوم الذهبية",
      nameEn: "Golden Stars Stadium",
      location: "مراكش - Marrakech",
      image: "https://images.pexels.com/photos/1171084/pexels-photo-1171084.jpeg",
      rating: 4.7,
      reviews: 134,
      hourlyRate: 110,
      currency: "MAD",
      fieldType: "7x7",
      features: ["عشب صناعي", "تكييف", "غرف VIP"],
      availability: "متاح غداً",
      isAvailable: false,
      discount: 10
    }
  ];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars?.push(<Icon key={i} name="Star" size={14} className="text-amber-400 fill-current" />);
    }

    if (hasHalfStar) {
      stars?.push(<Icon key="half" name="StarHalf" size={14} className="text-amber-400 fill-current" />);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars?.push(<Icon key={`empty-${i}`} name="Star" size={14} className="text-gray-300" />);
    }

    return stars;
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            الملاعب الأكثر شعبية
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            اكتشف أفضل الملاعب المختارة بعناية والأكثر حجزاً من قبل اللاعبين
          </p>
        </div>

        {/* Fields Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {popularFields?.map((field) => (
            <div key={field?.id} className="bg-white rounded-xl shadow-card hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
              {/* Field Image */}
              <div className="relative overflow-hidden h-48">
                <Image
                  src={field?.image}
                  alt={field?.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Discount Badge */}
                {field?.discount && (
                  <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
                    -{field?.discount}%
                  </div>
                )}

                {/* Availability Badge */}
                <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${
                  field?.isAvailable 
                    ? 'bg-emerald-500 text-white' :'bg-amber-500 text-white'
                }`}>
                  {field?.availability}
                </div>

                {/* Field Type Badge */}
                <div className="absolute bottom-3 right-3 bg-blue-800 text-white px-2 py-1 rounded text-xs font-medium">
                  {field?.fieldType}
                </div>
              </div>

              {/* Field Info */}
              <div className="p-4">
                <div className="mb-2">
                  <h3 className="font-bold text-lg text-gray-900 mb-1 rtl:text-right">
                    {field?.name}
                  </h3>
                  <p className="text-sm text-gray-500 rtl:text-right">
                    {field?.nameEn}
                  </p>
                </div>

                {/* Location */}
                <div className="flex items-center text-gray-600 mb-3 rtl:flex-row-reverse">
                  <Icon name="MapPin" size={14} className="ml-1 rtl:mr-1 rtl:ml-0" />
                  <span className="text-sm">{field?.location}</span>
                </div>

                {/* Rating */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    {renderStars(field?.rating)}
                    <span className="text-sm font-medium text-gray-700 ml-1">
                      {field?.rating}
                    </span>
                    <span className="text-xs text-gray-500">
                      ({field?.reviews} تقييم)
                    </span>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {field?.features?.slice(0, 2)?.map((feature, index) => (
                      <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {feature}
                      </span>
                    ))}
                    {field?.features?.length > 2 && (
                      <span className="text-xs text-blue-600 font-medium">
                        +{field?.features?.length - 2} المزيد
                      </span>
                    )}
                  </div>
                </div>

                {/* Price and Book Button */}
                <div className="flex items-center justify-between">
                  <div className="text-right rtl:text-left">
                    <div className="flex items-center gap-1">
                      {field?.discount && (
                        <span className="text-sm text-gray-400 line-through">
                          {field?.hourlyRate} {field?.currency}
                        </span>
                      )}
                      <span className="text-lg font-bold text-blue-800">
                        {field?.discount 
                          ? Math.round(field?.hourlyRate * (1 - field?.discount / 100))
                          : field?.hourlyRate
                        } {field?.currency}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">في الساعة</span>
                  </div>
                  
                  <Button
                    variant={field?.isAvailable ? "default" : "outline"}
                    size="sm"
                    className={field?.isAvailable ? "bg-blue-800 hover:bg-blue-900" : ""}
                    iconName="Calendar"
                    iconPosition="left"
                  >
                    احجز الآن
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            className="border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white px-8"
            iconName="ArrowLeft"
            iconPosition="right"
          >
            عرض جميع الملاعب
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PopularFieldsSection;