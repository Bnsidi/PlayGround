import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FieldImageGallery = ({ images = [], fieldName = "Football Field" }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const defaultImages = [
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
    },
    {
      id: 4,
      url: "https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Changing rooms",
      caption: "غرف تغيير الملابس - Vestiaires"
    },
    {
      id: 5,
      url: "https://images.pixabay.com/photo-2016/11/29/13/14/attractive-1869761_960_720.jpg",
      alt: "Parking area",
      caption: "منطقة الانتظار - Zone de stationnement"
    }
  ];

  const galleryImages = images?.length > 0 ? images : defaultImages;
  const currentImage = galleryImages?.[currentImageIndex];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages?.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages?.length) % galleryImages?.length);
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <>
      {/* Main Gallery */}
      <div className="bg-card rounded-lg border border-border overflow-hidden shadow-card">
        {/* Main Image */}
        <div className="relative aspect-video bg-muted">
          <Image
            src={currentImage?.url}
            alt={currentImage?.alt}
            className="w-full h-full object-cover"
          />
          
          {/* Navigation Arrows */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-micro"
            disabled={galleryImages?.length <= 1}
          >
            <Icon name="ChevronLeft" size={20} />
          </button>
          
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-micro"
            disabled={galleryImages?.length <= 1}
          >
            <Icon name="ChevronRight" size={20} />
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-micro"
          >
            <Icon name="Maximize2" size={18} />
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-mono">
            {currentImageIndex + 1} / {galleryImages?.length}
          </div>
        </div>

        {/* Thumbnail Navigation */}
        <div className="p-4">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {galleryImages?.map((image, index) => (
              <button
                key={image?.id}
                onClick={() => goToImage(index)}
                className={`flex-shrink-0 w-20 h-16 rounded-md overflow-hidden border-2 transition-micro ${
                  index === currentImageIndex
                    ? 'border-primary' :'border-border hover:border-primary/50'
                }`}
              >
                <Image
                  src={image?.url}
                  alt={image?.alt}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
          
          {/* Image Caption */}
          <p className="text-sm text-muted-foreground mt-3 text-center">
            {currentImage?.caption}
          </p>
        </div>
      </div>
      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-200 bg-black/90 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <Image
              src={currentImage?.url}
              alt={currentImage?.alt}
              className="max-w-full max-h-full object-contain"
            />
            
            {/* Close Button */}
            <button
              onClick={toggleFullscreen}
              className="absolute top-4 right-4 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-micro"
            >
              <Icon name="X" size={24} />
            </button>

            {/* Navigation in Fullscreen */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-micro"
              disabled={galleryImages?.length <= 1}
            >
              <Icon name="ChevronLeft" size={24} />
            </button>
            
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-micro"
              disabled={galleryImages?.length <= 1}
            >
              <Icon name="ChevronRight" size={24} />
            </button>

            {/* Image Info */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-lg text-center">
              <p className="text-sm font-mono mb-1">
                {currentImageIndex + 1} / {galleryImages?.length}
              </p>
              <p className="text-xs">{currentImage?.caption}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FieldImageGallery;