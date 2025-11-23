import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CTASection = () => {
  const features = [
    {
      icon: "Search",
      title: "بحث سريع",
      description: "ابحث عن الملاعب المتاحة في مدينتك بسهولة"
    },
    {
      icon: "Calendar",
      title: "حجز فوري",
      description: "احجز ملعبك المفضل في دقائق معدودة"
    },
    {
      icon: "CreditCard",
      title: "دفع آمن",
      description: "ادفع بأمان عبر الإنترنت أو في الموقع"
    },
    {
      icon: "Star",
      title: "جودة مضمونة",
      description: "ملاعب مختارة بعناية وتقييمات حقيقية"
    }
  ];

  const downloadLinks = [
    {
      platform: "App Store",
      icon: "Smartphone",
      url: "#",
      badge: "https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
    },
    {
      platform: "Google Play",
      icon: "Smartphone",
      url: "#",
      badge: "https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-800 via-blue-900 to-emerald-800 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-right">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 leading-tight">
              ابدأ رحلتك الرياضية
              <br />
              <span className="text-amber-400">مع TerraBook</span>
            </h2>
            
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              انضم إلى آلاف اللاعبين واكتشف أفضل ملاعب كرة القدم في مدينتك. 
              حجز سريع، أسعار تنافسية، وتجربة لا تُنسى.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {features?.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 text-left rtl:text-right rtl:flex-row-reverse">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 flex-shrink-0">
                    <Icon name={feature?.icon} size={20} className="text-amber-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">{feature?.title}</h4>
                    <p className="text-xs text-blue-200">{feature?.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button
                variant="default"
                size="lg"
                className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold px-8 py-4"
                iconName="Play"
                iconPosition="left"
              >
                ابدأ الحجز الآن
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10 px-8 py-4"
                iconName="Phone"
                iconPosition="left"
              >
                تواصل معنا
              </Button>
            </div>

            {/* App Download Section */}
            <div className="border-t border-white/20 pt-8">
              <p className="text-blue-200 mb-4 text-center lg:text-right">
                حمل التطبيق واحجز من هاتفك مباشرة
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                {downloadLinks?.map((link, index) => (
                  <a
                    key={index}
                    href={link?.url}
                    className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg px-4 py-3 transition-colors group"
                  >
                    <Icon name={link?.icon} size={24} className="text-amber-400" />
                    <div className="text-left rtl:text-right">
                      <p className="text-xs text-blue-200">حمل من</p>
                      <p className="font-semibold">{link?.platform}</p>
                    </div>
                    <Icon name="ExternalLink" size={16} className="text-blue-300 group-hover:text-white" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - Visual */}
          <div className="relative">
            {/* Main Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg"
                alt="Football field booking app interface"
                className="w-full h-96 lg:h-[500px] object-cover"
              />
              
              {/* Overlay with App Preview */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              {/* Floating Cards */}
              <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <Icon name="MapPin" size={16} className="text-emerald-600" />
                  <div>
                    <p className="text-xs font-medium text-gray-900">ملعب قريب</p>
                    <p className="text-xs text-gray-600">500 متر</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <Icon name="Clock" size={16} className="text-blue-600" />
                  <div>
                    <p className="text-xs font-medium text-gray-900">متاح الآن</p>
                    <p className="text-xs text-emerald-600 font-semibold">120 MAD/ساعة</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-amber-400/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-emerald-400/20 rounded-full blur-xl"></div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 pt-8 border-t border-white/20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-2xl lg:text-3xl font-bold text-amber-400 mb-1">500+</div>
              <p className="text-sm text-blue-200">ملعب متاح</p>
            </div>
            <div>
              <div className="text-2xl lg:text-3xl font-bold text-emerald-400 mb-1">50+</div>
              <p className="text-sm text-blue-200">مدينة مغطاة</p>
            </div>
            <div>
              <div className="text-2xl lg:text-3xl font-bold text-rose-400 mb-1">24/7</div>
              <p className="text-sm text-blue-200">دعم العملاء</p>
            </div>
            <div>
              <div className="text-2xl lg:text-3xl font-bold text-purple-400 mb-1">99%</div>
              <p className="text-sm text-blue-200">نجاح الحجوزات</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;