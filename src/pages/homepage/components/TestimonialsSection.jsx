import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "أحمد المرابطي",
      nameEn: "Ahmed El Marabti",
      location: "الدار البيضاء",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
      review: `منصة رائعة جداً! استطعت حجز ملعب قريب من منزلي بسهولة تامة. 
الملعب كان نظيفاً والخدمة ممتازة. أنصح الجميع باستخدام TerraBook 
لحجز الملاعب. التطبيق سهل الاستخدام والأسعار معقولة جداً.`,
      date: "2025-09-10",
      fieldBooked: "ملعب الأطلس الرياضي",
      verified: true
    },
    {
      id: 2,
      name: "فاطمة الزهراء",
      nameEn: "Fatima Zahra",
      location: "الرباط",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5,
      review: `تجربة مميزة! حجزت ملعب لفريقنا النسائي وكانت التجربة أكثر من رائعة.
الملعب مجهز بكل المرافق اللازمة وغرف تغيير نظيفة. الحجز كان سريع 
والدفع آمن. شكراً لفريق TerraBook على هذه الخدمة المتميزة.`,
      date: "2025-09-08",
      fieldBooked: "مجمع الأندلس الرياضي",
      verified: true
    },
    {
      id: 3,
      name: "يوسف بنعلي",
      nameEn: "Youssef Benali",
      location: "مراكش",
      avatar: "https://randomuser.me/api/portraits/men/56.jpg",
      rating: 4,
      review: `خدمة ممتازة وسرعة في الاستجابة. حجزت عدة مرات من خلال المنصة 
ولم أواجه أي مشاكل. الملاعب متنوعة والأسعار تنافسية. أقترح إضافة 
المزيد من الملاعب في مراكش. بشكل عام، تجربة إيجابية جداً.`,
      date: "2025-09-05",
      fieldBooked: "ملعب النجوم الذهبية",
      verified: true
    },
    {
      id: 4,
      name: "محمد الإدريسي",
      nameEn: "Mohamed Idrissi",
      location: "فاس",
      avatar: "https://randomuser.me/api/portraits/men/78.jpg",
      rating: 5,
      review: `أفضل منصة لحجز الملاعب في المغرب! استخدمتها لتنظيم بطولة 
صغيرة مع الأصدقاء وكانت التجربة سلسة جداً. إمكانية مقارنة الأسعار 
والمواقع مفيدة جداً. التطبيق يوفر الوقت والجهد. أنصح به بقوة!`,
      date: "2025-09-03",
      fieldBooked: "ملعب الأطلس الرياضي",
      verified: true
    },
    {
      id: 5,
      name: "سعيد الحسني",
      nameEn: "Said Hassani",
      location: "طنجة",
      avatar: "https://randomuser.me/api/portraits/men/23.jpg",
      rating: 4,
      review: `تجربة جيدة جداً مع TerraBook. الموقع سهل الاستخدام والحجز سريع.
الملاعب المتاحة ذات جودة عالية والأسعار مناسبة. خدمة العملاء متجاوبة 
ومفيدة. أتمنى توسيع الخدمة لتشمل المزيد من المدن المغربية.`,
      date: "2025-09-01",
      fieldBooked: "ملعب المحيط الأزرق",
      verified: true
    }
  ];

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars?.push(
        <Icon 
          key={i} 
          name="Star" 
          size={16} 
          className={i < rating ? "text-amber-400 fill-current" : "text-gray-300"} 
        />
      );
    }
    return stars;
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials?.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials?.length) % testimonials?.length);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('ar-MA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-emerald-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            ماذا يقول عملاؤنا
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            آراء وتجارب حقيقية من اللاعبين الذين استخدموا منصة TerraBook
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 relative">
            {/* Quote Icon */}
            <div className="absolute top-6 right-6 text-blue-200">
              <Icon name="Quote" size={48} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              {/* User Info */}
              <div className="text-center lg:text-right">
                <div className="relative inline-block mb-4">
                  <Image
                    src={testimonials?.[currentTestimonial]?.avatar}
                    alt={testimonials?.[currentTestimonial]?.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto"
                  />
                  {testimonials?.[currentTestimonial]?.verified && (
                    <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-1">
                      <Icon name="Check" size={14} className="text-white" />
                    </div>
                  )}
                </div>
                
                <h4 className="text-xl font-bold text-gray-900 mb-1">
                  {testimonials?.[currentTestimonial]?.name}
                </h4>
                <p className="text-sm text-gray-500 mb-2">
                  {testimonials?.[currentTestimonial]?.nameEn}
                </p>
                <p className="text-sm text-gray-600 mb-3 flex items-center justify-center lg:justify-end">
                  <Icon name="MapPin" size={14} className="ml-1" />
                  {testimonials?.[currentTestimonial]?.location}
                </p>
                
                {/* Rating */}
                <div className="flex items-center justify-center lg:justify-end gap-1 mb-3">
                  {renderStars(testimonials?.[currentTestimonial]?.rating)}
                </div>
                
                {/* Field Booked */}
                <p className="text-xs text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block">
                  حجز: {testimonials?.[currentTestimonial]?.fieldBooked}
                </p>
              </div>

              {/* Review Content */}
              <div className="lg:col-span-2">
                <div className="text-right rtl:text-right">
                  <p className="text-lg leading-relaxed text-gray-700 mb-4">
                    {testimonials?.[currentTestimonial]?.review}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{formatDate(testimonials?.[currentTestimonial]?.date)}</span>
                    <div className="flex items-center gap-1">
                      <Icon name="Calendar" size={14} />
                      <span>تاريخ التقييم</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="sm"
                onClick={prevTestimonial}
                className="rounded-full w-10 h-10 p-0"
                iconName="ChevronRight"
              />
              
              {/* Dots Indicator */}
              <div className="flex gap-2">
                {testimonials?.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentTestimonial ? 'bg-blue-800' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={nextTestimonial}
                className="rounded-full w-10 h-10 p-0"
                iconName="ChevronLeft"
              />
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-blue-800 mb-2">4.8★</div>
            <p className="text-gray-600">متوسط التقييم</p>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-emerald-600 mb-2">2,500+</div>
            <p className="text-gray-600">تقييم إيجابي</p>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-amber-500 mb-2">10K+</div>
            <p className="text-gray-600">حجز مكتمل</p>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-rose-500 mb-2">98%</div>
            <p className="text-gray-600">رضا العملاء</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 mb-6">
            انضم إلى آلاف اللاعبين الراضين عن خدماتنا
          </p>
          <Button
            variant="default"
            size="lg"
            className="bg-blue-800 hover:bg-blue-900 px-8"
            iconName="UserPlus"
            iconPosition="left"
          >
            ابدأ حجزك الأول الآن
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;