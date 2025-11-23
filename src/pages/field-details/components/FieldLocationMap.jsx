import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FieldLocationMap = ({ 
  fieldName = "ملعب الأبطال - Terrain des Champions",
  address = "شارع محمد الخامس، الدار البيضاء، المغرب",
  coordinates = { lat: 33.5731, lng: -7.5898 },
  nearbyLandmarks = []
}) => {
  const [mapView, setMapView] = useState('map'); // 'map' or 'satellite'
  const [showDirections, setShowDirections] = useState(false);

  const defaultLandmarks = [
    { name: "مول المغرب - Morocco Mall", distance: "2.1 كم", icon: "ShoppingBag" },
    { name: "مسجد الحسن الثاني - Mosquée Hassan II", distance: "3.5 كم", icon: "MapPin" },
    { name: "محطة القطار - Gare ferroviaire", distance: "1.8 كم", icon: "Train" },
    { name: "مستشفى ابن سينا - Hôpital Ibn Sina", distance: "2.7 كم", icon: "Hospital" },
    { name: "جامعة الحسن الثاني - Université Hassan II", distance: "4.2 كم", icon: "GraduationCap" }
  ];

  const landmarks = nearbyLandmarks?.length > 0 ? nearbyLandmarks : defaultLandmarks;

  const handleGetDirections = () => {
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${coordinates?.lat},${coordinates?.lng}`;
    window.open(googleMapsUrl, '_blank');
  };

  const handleShareLocation = async () => {
    const shareData = {
      title: fieldName,
      text: `موقع الملعب - Location du terrain: ${address}`,
      url: `https://www.google.com/maps?q=${coordinates?.lat},${coordinates?.lng}`
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard?.writeText(shareData?.url);
      alert('تم نسخ الرابط - Lien copié');
    }
  };

  return (
    <div className="space-y-6">
      {/* Map Container */}
      <div className="bg-card rounded-lg border border-border overflow-hidden shadow-card">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">
              الموقع - Localisation
            </h3>
            <div className="flex items-center space-x-2">
              <Button
                variant={mapView === 'map' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setMapView('map')}
              >
                خريطة - Carte
              </Button>
              <Button
                variant={mapView === 'satellite' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setMapView('satellite')}
              >
                قمر صناعي - Satellite
              </Button>
            </div>
          </div>
        </div>

        {/* Google Maps Embed */}
        <div className="relative aspect-video bg-muted">
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title={fieldName}
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${coordinates?.lat},${coordinates?.lng}&z=15&output=embed&maptype=${mapView}`}
            className="border-0"
          />
          
          {/* Map Overlay Controls */}
          <div className="absolute top-4 right-4 flex flex-col space-y-2">
            <button
              onClick={handleShareLocation}
              className="w-10 h-10 bg-white/90 hover:bg-white text-foreground rounded-lg shadow-md flex items-center justify-center transition-micro"
              title="مشاركة الموقع - Partager la localisation"
            >
              <Icon name="Share" size={18} />
            </button>
            <button
              onClick={() => setShowDirections(!showDirections)}
              className="w-10 h-10 bg-white/90 hover:bg-white text-foreground rounded-lg shadow-md flex items-center justify-center transition-micro"
              title="الاتجاهات - Directions"
            >
              <Icon name="Navigation" size={18} />
            </button>
          </div>
        </div>

        {/* Address and Actions */}
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="font-semibold text-foreground mb-1">{fieldName}</h4>
              <p className="text-sm text-muted-foreground mb-3">{address}</p>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Icon name="MapPin" size={14} />
                <span className="font-mono">
                  {coordinates?.lat?.toFixed(6)}, {coordinates?.lng?.toFixed(6)}
                </span>
              </div>
            </div>
            <Button
              variant="default"
              size="sm"
              onClick={handleGetDirections}
              iconName="Navigation"
              iconPosition="left"
            >
              الاتجاهات - Directions
            </Button>
          </div>
        </div>
      </div>
      {/* Nearby Landmarks */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          معالم قريبة - Points d'intérêt à proximité
        </h3>
        
        <div className="space-y-3">
          {landmarks?.map((landmark, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-micro"
            >
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name={landmark?.icon} size={16} className="text-primary" />
                </div>
                <span className="font-medium text-foreground">{landmark?.name}</span>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <span className="text-sm text-muted-foreground font-mono">{landmark?.distance}</span>
                <Icon name="ExternalLink" size={14} className="text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Transportation Options */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          وسائل النقل - Moyens de transport
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 rtl:space-x-reverse p-3 rounded-lg bg-success/5 border border-success/20">
            <Icon name="Car" size={20} className="text-success" />
            <div>
              <p className="font-medium text-foreground">بالسيارة - En voiture</p>
              <p className="text-sm text-muted-foreground">موقف مجاني - Parking gratuit</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 rtl:space-x-reverse p-3 rounded-lg bg-primary/5 border border-primary/20">
            <Icon name="Bus" size={20} className="text-primary" />
            <div>
              <p className="font-medium text-foreground">بالحافلة - En bus</p>
              <p className="text-sm text-muted-foreground">محطة قريبة - Arrêt proche</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 rtl:space-x-reverse p-3 rounded-lg bg-warning/5 border border-warning/20">
            <Icon name="Train" size={20} className="text-warning" />
            <div>
              <p className="font-medium text-foreground">بالقطار - En train</p>
              <p className="text-sm text-muted-foreground">1.8 كم - 1.8 km</p>
            </div>
          </div>
        </div>
      </div>
      {/* Directions Panel */}
      {showDirections && (
        <div className="bg-card rounded-lg border border-border p-6 shadow-card animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">
              كيفية الوصول - Comment s'y rendre
            </h3>
            <button
              onClick={() => setShowDirections(false)}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-micro"
            >
              <Icon name="X" size={18} />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-muted/30">
              <h4 className="font-medium text-foreground mb-2">من وسط المدينة - Depuis le centre-ville</h4>
              <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                <li>اتجه شمالاً على شارع محمد الخامس - Dirigez-vous vers le nord sur l'avenue Mohammed V</li>
                <li>استمر لمدة 2 كم - Continuez pendant 2 km</li>
                <li>انعطف يميناً عند الإشارة الضوئية - Tournez à droite au feu de circulation</li>
                <li>الملعب على يسارك - Le terrain sera sur votre gauche</li>
              </ol>
            </div>
            
            <div className="flex space-x-3">
              <Button
                variant="default"
                onClick={handleGetDirections}
                iconName="Navigation"
                iconPosition="left"
              >
                فتح في خرائط جوجل - Ouvrir dans Google Maps
              </Button>
              <Button
                variant="outline"
                onClick={handleShareLocation}
                iconName="Share"
                iconPosition="left"
              >
                مشاركة - Partager
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FieldLocationMap;