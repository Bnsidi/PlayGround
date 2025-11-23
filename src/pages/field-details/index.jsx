import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import FieldImageGallery from './components/FieldImageGallery';
import FieldSpecifications from './components/FieldSpecifications';
import FieldLocationMap from './components/FieldLocationMap';
import FieldReviews from './components/FieldReviews';
import BookingSection from './components/BookingSection';

const FieldDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [field, setField] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [isFavorite, setIsFavorite] = useState(false);

  // Mock field data
  const mockField = {
    id: id || "field-1",
    name: "ملعب الأبطال - Terrain des Champions",
    description: `ملعب كرة قدم حديث ومجهز بأحدث المعدات في قلب الدار البيضاء. يتميز بعشب صناعي عالي الجودة وإضاءة ليلية قوية، مما يجعله مثالياً للمباريات والتدريبات في جميع الأوقات.\n\nTerrain de football moderne et équipé des derniers équipements au cœur de Casablanca. Il dispose d'un gazon artificiel de haute qualité et d'un éclairage nocturne puissant.`,
    images: [
      {
        id: 1,
        url: "https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=800",
        alt: "Main field view",
        caption: "منظر عام للملعب - Vue générale du terrain"
      },
      {
        id: 2,
        url: "https://images.pixabay.com/photo-2016/03/27/07/32/football-1282946_960_720.jpg",
        alt: "Field from side angle",
        caption: "منظر جانبي للملعب - Vue latérale du terrain"
      },
      {
        id: 3,
        url: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&auto=format&fit=crop&q=60",
        alt: "Night lighting view",
        caption: "الإضاءة الليلية - Éclairage nocturne"
      }
    ],
    size: "11x11",
    surface: "عشب صناعي - Gazon artificiel",
    pricePerHour: 120,
    currency: "MAD",
    rating: 4.8,
    totalReviews: 127,
    location: {
      address: "شارع محمد الخامس، الدار البيضاء، المغرب",
      coordinates: { lat: 33.5731, lng: -7.5898 }
    },
    facilities: [
      { name: "غرف تغيير الملابس - Vestiaires", icon: "Home", available: true },
      { name: "إضاءة ليلية - Éclairage nocturne", icon: "Lightbulb", available: true },
      { name: "موقف سيارات - Parking", icon: "Car", available: true },
      { name: "دش ساخن - Douches chaudes", icon: "Droplets", available: true },
      { name: "مقاعد للمتفرجين - Gradins", icon: "Users", available: false },
      { name: "كافيتيريا - Cafétéria", icon: "Coffee", available: false }
    ],
    availability: {
      openTime: "06:00",
      closeTime: "23:00",
      daysOpen: [1, 2, 3, 4, 5, 6, 7] // Monday to Sunday
    }
  };

  useEffect(() => {
    // Simulate API call to fetch field details
    const fetchFieldDetails = async () => {
      setIsLoading(true);
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setField(mockField);
        
        // Check if field is in favorites
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setIsFavorite(favorites?.includes(mockField?.id));
      } catch (error) {
        console.error('Failed to fetch field details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFieldDetails();
  }, [id]);

  const handleToggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    let updatedFavorites;
    
    if (isFavorite) {
      updatedFavorites = favorites?.filter(favId => favId !== field?.id);
    } else {
      updatedFavorites = [...favorites, field?.id];
    }
    
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  const handleShare = async () => {
    const shareData = {
      title: field?.name,
      text: `تحقق من هذا الملعب الرائع - Découvrez ce terrain fantastique: ${field?.name}`,
      url: window.location?.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard?.writeText(window.location?.href);
      alert('تم نسخ الرابط - Lien copié');
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center space-x-1 rtl:space-x-reverse">
        {[1, 2, 3, 4, 5]?.map((star) => (
          <Icon
            key={star}
            name="Star"
            size={16}
            className={star <= Math.round(rating) ? "text-warning fill-current" : "text-muted-foreground"}
          />
        ))}
      </div>
    );
  };

  const tabs = [
    { id: 'overview', name: 'نظرة عامة - Aperçu', icon: 'Info' },
    { id: 'booking', name: 'الحجز - Réservation', icon: 'Calendar' },
    { id: 'location', name: 'الموقع - Localisation', icon: 'MapPin' },
    { id: 'reviews', name: 'التقييمات - Avis', icon: 'Star' }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <Icon name="Loader2" size={24} className="animate-spin text-primary" />
            <span className="text-lg text-muted-foreground">
              جاري التحميل - Chargement...
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (!field) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
          <Icon name="AlertCircle" size={64} className="text-error mb-4" />
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            الملعب غير موجود - Terrain non trouvé
          </h2>
          <p className="text-muted-foreground text-center mb-6">
            عذراً، لم نتمكن من العثور على الملعب المطلوب
            <br />
            Désolé, nous n'avons pas pu trouver le terrain demandé
          </p>
          <Button
            variant="default"
            onClick={() => navigate('/field-listings')}
            iconName="ArrowLeft"
            iconPosition="left"
          >
            العودة للملاعب - Retour aux terrains
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Breadcrumb */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 rtl:space-x-reverse text-sm">
            <Link to="/homepage" className="text-primary hover:text-primary/80 transition-micro">
              الرئيسية - Accueil
            </Link>
            <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
            <Link to="/field-listings" className="text-primary hover:text-primary/80 transition-micro">
              الملاعب - Terrains
            </Link>
            <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
            <span className="text-muted-foreground truncate">{field?.name}</span>
          </nav>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Field Header */}
            <div className="bg-card rounded-lg border border-border p-6 shadow-card">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                    {field?.name}
                  </h1>
                  <div className="flex items-center space-x-4 rtl:space-x-reverse mb-3">
                    {renderStars(field?.rating)}
                    <span className="font-medium text-foreground">{field?.rating}</span>
                    <span className="text-muted-foreground">
                      ({field?.totalReviews} تقييم - avis)
                    </span>
                  </div>
                  <p className="text-muted-foreground">
                    {field?.location?.address}
                  </p>
                </div>
                
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleToggleFavorite}
                    iconName={isFavorite ? "Heart" : "Heart"}
                    className={isFavorite ? "text-error border-error" : ""}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleShare}
                    iconName="Share"
                  />
                </div>
              </div>

              <p className="text-foreground leading-relaxed whitespace-pre-line">
                {field?.description}
              </p>
            </div>

            {/* Image Gallery */}
            <FieldImageGallery 
              images={field?.images} 
              fieldName={field?.name}
            />

            {/* Tab Navigation */}
            <div className="bg-card rounded-lg border border-border shadow-card">
              <div className="border-b border-border">
                <nav className="flex space-x-0 overflow-x-auto">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`flex items-center space-x-2 rtl:space-x-reverse px-6 py-4 text-sm font-medium border-b-2 transition-micro whitespace-nowrap ${
                        activeTab === tab?.id
                          ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                      }`}
                    >
                      <Icon name={tab?.icon} size={16} />
                      <span>{tab?.name}</span>
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {activeTab === 'overview' && (
                  <FieldSpecifications field={field} />
                )}
                
                {activeTab === 'booking' && (
                  <div className="lg:hidden">
                    <BookingSection
                      fieldId={field?.id}
                      fieldName={field?.name}
                      pricePerHour={field?.pricePerHour}
                      currency={field?.currency}
                      availability={field?.availability}
                    />
                  </div>
                )}
                
                {activeTab === 'location' && (
                  <FieldLocationMap
                    fieldName={field?.name}
                    address={field?.location?.address}
                    coordinates={field?.location?.coordinates}
                  />
                )}
                
                {activeTab === 'reviews' && (
                  <FieldReviews fieldId={field?.id} />
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Booking Section (Desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <BookingSection
                fieldId={field?.id}
                fieldName={field?.name}
                pricePerHour={field?.pricePerHour}
                currency={field?.currency}
                availability={field?.availability}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Booking Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 shadow-modal z-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">السعر يبدأ من - À partir de</p>
            <p className="text-lg font-bold text-foreground font-mono">
              {field?.pricePerHour} {field?.currency}/ساعة - heure
            </p>
          </div>
          <Button
            variant="default"
            size="lg"
            onClick={() => setActiveTab('booking')}
            iconName="Calendar"
            iconPosition="left"
          >
            احجز الآن - Réserver
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FieldDetails;