import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SortControls = ({ 
  sortBy, 
  onSortChange, 
  viewMode, 
  onViewModeChange,
  resultCount 
}) => {
  const sortOptions = [
    { value: 'relevance', label: 'الأكثر صلة', labelFr: 'Pertinence', icon: 'Star' },
    { value: 'price_low', label: 'السعر: الأقل أولاً', labelFr: 'Prix: croissant', icon: 'ArrowUp' },
    { value: 'price_high', label: 'السعر: الأعلى أولاً', labelFr: 'Prix: décroissant', icon: 'ArrowDown' },
    { value: 'rating', label: 'التقييم الأعلى', labelFr: 'Mieux notés', icon: 'Star' },
    { value: 'distance', label: 'الأقرب', labelFr: 'Plus proche', icon: 'MapPin' },
    { value: 'availability', label: 'الأكثر توفراً', labelFr: 'Plus disponible', icon: 'Clock' }
  ];

  const getCurrentSortLabel = () => {
    const current = sortOptions?.find(option => option?.value === sortBy);
    return current ? current?.label : 'ترتيب';
  };

  return (
    <div className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Left Side - Results Count */}
          <div className="text-sm text-muted-foreground">
            {resultCount} ملعب متاح
          </div>

          {/* Right Side - Controls */}
          <div className="flex items-center space-x-4">
            {/* Sort Dropdown */}
            <div className="relative group">
              <Button
                variant="outline"
                size="sm"
                iconName="ArrowUpDown"
                iconPosition="right"
                className="min-w-32"
              >
                {getCurrentSortLabel()}
              </Button>
              
              {/* Dropdown Menu */}
              <div className="absolute top-full right-0 mt-1 w-64 bg-popover border border-border rounded-md shadow-modal z-120 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-standard">
                <div className="py-2">
                  {sortOptions?.map((option) => (
                    <button
                      key={option?.value}
                      onClick={() => onSortChange(option?.value)}
                      className={`w-full px-4 py-2 text-left hover:bg-muted transition-micro flex items-center space-x-3 ${
                        sortBy === option?.value ? 'bg-primary/10 text-primary' : 'text-foreground'
                      }`}
                    >
                      <Icon name={option?.icon} size={16} />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{option?.label}</span>
                        <span className="text-xs text-muted-foreground">{option?.labelFr}</span>
                      </div>
                      {sortBy === option?.value && (
                        <Icon name="Check" size={14} className="ml-auto" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-muted rounded-md p-1">
              <button
                onClick={() => onViewModeChange('grid')}
                className={`p-2 rounded transition-micro ${
                  viewMode === 'grid' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                }`}
                title="عرض الشبكة / Vue grille"
              >
                <Icon name="Grid3X3" size={16} />
              </button>
              <button
                onClick={() => onViewModeChange('list')}
                className={`p-2 rounded transition-micro ${
                  viewMode === 'list' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                }`}
                title="عرض القائمة / Vue liste"
              >
                <Icon name="List" size={16} />
              </button>
              <button
                onClick={() => onViewModeChange('map')}
                className={`p-2 rounded transition-micro ${
                  viewMode === 'map' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                }`}
                title="عرض الخريطة / Vue carte"
              >
                <Icon name="Map" size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortControls;