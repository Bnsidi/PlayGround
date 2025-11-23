import React from 'react';
import FieldCard from './FieldCard';
import Icon from '../../../components/AppIcon';

const FieldGrid = ({ fields, viewMode, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="flex flex-col items-center space-y-4">
          <Icon name="Loader2" size={32} className="animate-spin text-primary" />
          <p className="text-muted-foreground">جاري تحميل الملاعب...</p>
        </div>
      </div>
    );
  }

  if (fields?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <Icon name="Search" size={48} className="text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">
          لم يتم العثور على ملاعب
        </h3>
        <p className="text-muted-foreground max-w-md">
          لم نتمكن من العثور على ملاعب تطابق معايير البحث الخاصة بك. جرب تعديل المرشحات أو البحث في منطقة أخرى.
        </p>
      </div>
    );
  }

  const getGridClasses = () => {
    switch (viewMode) {
      case 'list':
        return 'grid grid-cols-1 gap-4';
      case 'grid':
      default:
        return 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6';
    }
  };

  return (
    <div className={getGridClasses()}>
      {fields?.map((field) => (
        <FieldCard key={field?.id} field={field} />
      ))}
    </div>
  );
};

export default FieldGrid;