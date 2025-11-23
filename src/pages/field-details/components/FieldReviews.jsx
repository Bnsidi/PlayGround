import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FieldReviews = ({ fieldId, reviews = [] }) => {
  const [sortBy, setSortBy] = useState('recent'); // 'recent', 'rating', 'helpful'
  const [filterRating, setFilterRating] = useState('all'); // 'all', '5', '4', '3', '2', '1'
  const [showAllReviews, setShowAllReviews] = useState(false);

  const mockReviews = [
    {
      id: 1,
      userName: "أحمد المرابط - Ahmed Almourabit",
      userAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
      date: new Date('2025-01-15'),
      comment: `ملعب ممتاز بجودة عالية. العشب الصناعي في حالة ممتازة والإضاءة قوية جداً. غرف تغيير الملابس نظيفة ومجهزة بشكل جيد.\n\nTerrain excellent avec une qualité exceptionnelle. Le gazon artificiel est en parfait état et l'éclairage est très puissant.`,
      helpful: 12,
      verified: true
    },
    {
      id: 2,
      userName: "فاطمة الزهراء - Fatima Zahra",
      userAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 4,
      date: new Date('2025-01-10'),comment: `مكان رائع للعب كرة القدم. الموقع سهل الوصول إليه وهناك موقف سيارات كافي. السعر معقول مقارنة بالجودة.\n\nEndroit fantastique pour jouer au football. L'emplacement est facilement accessible avec un parking suffisant.`,
      helpful: 8,
      verified: true
    },
    {
      id: 3,
      userName: "يوسف بنعلي - Youssef Benali",
      userAvatar: "https://randomuser.me/api/portraits/men/67.jpg",
      rating: 5,
      date: new Date('2025-01-08'),
      comment: `أفضل ملعب في المنطقة! الحجز سهل والموظفون ودودون جداً. الملعب نظيف ومجهز بكل ما نحتاجه.\n\nLe meilleur terrain de la région ! La réservation est facile et le personnel est très amical.`,
      helpful: 15,
      verified: true
    },
    {
      id: 4,
      userName: "سارة الإدريسي - Sara Idrissi",
      userAvatar: "https://randomuser.me/api/portraits/women/23.jpg",
      rating: 4,
      date: new Date('2025-01-05'),
      comment: `تجربة جيدة بشكل عام. الملعب في حالة جيدة لكن أتمنى لو كانت هناك مقاعد أكثر للمتفرجين.\n\nBonne expérience dans l'ensemble. Le terrain est en bon état mais j'aimerais qu'il y ait plus de sièges pour les spectateurs.`,
      helpful: 6,
      verified: false
    },
    {
      id: 5,
      userName: "محمد التازي - Mohammed Tazi",
      userAvatar: "https://randomuser.me/api/portraits/men/89.jpg",
      rating: 3,
      date: new Date('2025-01-02'),
      comment: `الملعب جيد لكن الأسعار مرتفعة قليلاً. كما أن الحجز أحياناً يكون صعباً في عطلة نهاية الأسبوع.\n\nLe terrain est correct mais les prix sont un peu élevés. De plus, la réservation est parfois difficile le week-end.`,
      helpful: 3,
      verified: true
    }
  ];

  const reviewData = reviews?.length > 0 ? reviews : mockReviews;

  // Calculate rating statistics
  const ratingStats = {
    average: reviewData?.reduce((sum, review) => sum + review?.rating, 0) / reviewData?.length,
    total: reviewData?.length,
    distribution: {
      5: reviewData?.filter(r => r?.rating === 5)?.length,
      4: reviewData?.filter(r => r?.rating === 4)?.length,
      3: reviewData?.filter(r => r?.rating === 3)?.length,
      2: reviewData?.filter(r => r?.rating === 2)?.length,
      1: reviewData?.filter(r => r?.rating === 1)?.length,
    }
  };

  // Filter and sort reviews
  const filteredReviews = reviewData?.filter(review => filterRating === 'all' || review?.rating?.toString() === filterRating)?.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b?.rating - a?.rating;
        case 'helpful':
          return b?.helpful - a?.helpful;
        case 'recent':
        default:
          return new Date(b.date) - new Date(a.date);
      }
    });

  const displayedReviews = showAllReviews ? filteredReviews : filteredReviews?.slice(0, 3);

  const formatDate = (date) => {
    return date?.toLocaleDateString('ar-MA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderStars = (rating, size = 16) => {
    return (
      <div className="flex items-center space-x-1 rtl:space-x-reverse">
        {[1, 2, 3, 4, 5]?.map((star) => (
          <Icon
            key={star}
            name="Star"
            size={size}
            className={star <= rating ? "text-warning fill-current" : "text-muted-foreground"}
          />
        ))}
      </div>
    );
  };

  const renderRatingBar = (rating, count) => {
    const percentage = ratingStats?.total > 0 ? (count / ratingStats?.total) * 100 : 0;
    
    return (
      <div className="flex items-center space-x-3 rtl:space-x-reverse">
        <span className="text-sm font-medium text-foreground w-8">{rating}</span>
        <Icon name="Star" size={14} className="text-warning" />
        <div className="flex-1 bg-muted rounded-full h-2">
          <div
            className="bg-warning h-2 rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="text-sm text-muted-foreground w-8">{count}</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Rating Overview */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          التقييمات والمراجعات - Avis et évaluations
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Overall Rating */}
          <div className="text-center">
            <div className="text-4xl font-bold text-foreground mb-2">
              {ratingStats?.average?.toFixed(1)}
            </div>
            {renderStars(Math.round(ratingStats?.average), 20)}
            <p className="text-sm text-muted-foreground mt-2">
              {ratingStats?.total} تقييم - évaluations
            </p>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1]?.map((rating) => (
              <div key={rating}>
                {renderRatingBar(rating, ratingStats?.distribution?.[rating])}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Filters and Sorting */}
      <div className="bg-card rounded-lg border border-border p-4 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <span className="text-sm font-medium text-foreground">ترتيب حسب - Trier par:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e?.target?.value)}
              className="px-3 py-1 border border-border rounded-md bg-input text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="recent">الأحدث - Plus récent</option>
              <option value="rating">التقييم - Note</option>
              <option value="helpful">الأكثر فائدة - Plus utile</option>
            </select>
          </div>

          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <span className="text-sm font-medium text-foreground">فلترة - Filtrer:</span>
            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e?.target?.value)}
              className="px-3 py-1 border border-border rounded-md bg-input text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="all">جميع التقييمات - Tous les avis</option>
              <option value="5">5 نجوم - 5 étoiles</option>
              <option value="4">4 نجوم - 4 étoiles</option>
              <option value="3">3 نجوم - 3 étoiles</option>
              <option value="2">2 نجوم - 2 étoiles</option>
              <option value="1">1 نجمة - 1 étoile</option>
            </select>
          </div>
        </div>
      </div>
      {/* Reviews List */}
      <div className="space-y-4">
        {displayedReviews?.map((review) => (
          <div key={review?.id} className="bg-card rounded-lg border border-border p-6 shadow-card">
            <div className="flex items-start space-x-4 rtl:space-x-reverse">
              <img
                src={review?.userAvatar}
                alt={review?.userName}
                className="w-12 h-12 rounded-full object-cover"
                onError={(e) => {
                  e.target.src = '/assets/images/no_image.png';
                }}
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <h4 className="font-medium text-foreground">{review?.userName}</h4>
                    {review?.verified && (
                      <div className="flex items-center space-x-1 rtl:space-x-reverse">
                        <Icon name="CheckCircle" size={14} className="text-success" />
                        <span className="text-xs text-success">موثق - Vérifié</span>
                      </div>
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground">{formatDate(review?.date)}</span>
                </div>

                <div className="flex items-center space-x-2 rtl:space-x-reverse mb-3">
                  {renderStars(review?.rating)}
                </div>

                <p className="text-foreground text-sm leading-relaxed whitespace-pre-line mb-3">
                  {review?.comment}
                </p>

                <div className="flex items-center justify-between">
                  <button className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-muted-foreground hover:text-foreground transition-micro">
                    <Icon name="ThumbsUp" size={14} />
                    <span>مفيد ({review?.helpful}) - Utile ({review?.helpful})</span>
                  </button>
                  
                  <button className="text-sm text-muted-foreground hover:text-foreground transition-micro">
                    <Icon name="Flag" size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Load More Button */}
      {filteredReviews?.length > 3 && (
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => setShowAllReviews(!showAllReviews)}
            iconName={showAllReviews ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            {showAllReviews 
              ? `إخفاء المراجعات - Masquer les avis`
              : `عرض جميع المراجعات (${filteredReviews?.length - 3}+) - Voir tous les avis (${filteredReviews?.length - 3}+)`
            }
          </Button>
        </div>
      )}
      {/* No Reviews Message */}
      {filteredReviews?.length === 0 && (
        <div className="bg-card rounded-lg border border-border p-8 text-center shadow-card">
          <Icon name="MessageSquare" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h4 className="font-medium text-foreground mb-2">
            لا توجد مراجعات - Aucun avis trouvé
          </h4>
          <p className="text-sm text-muted-foreground">
            جرب تغيير الفلاتر أو كن أول من يترك مراجعة
            <br />
            Essayez de modifier les filtres ou soyez le premier à laisser un avis
          </p>
        </div>
      )}
    </div>
  );
};

export default FieldReviews;