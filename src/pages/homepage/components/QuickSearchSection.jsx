import React, { useState } from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const QuickSearchSection = ({ onSearch }) => {
  const [searchData, setSearchData] = useState({
    city: '',
    date: '',
    time: ''
  });

  const cityOptions = [
    { value: 'casablanca', label: 'الدار البيضاء - Casablanca' },
    { value: 'rabat', label: 'الرباط - Rabat' },
    { value: 'marrakech', label: 'مراكش - Marrakech' },
    { value: 'fes', label: 'فاس - Fès' },
    { value: 'tangier', label: 'طنجة - Tanger' },
    { value: 'agadir', label: 'أكادير - Agadir' }
  ];

  const timeOptions = [
    { value: '08:00', label: '08:00 - صباحاً' },
    { value: '10:00', label: '10:00 - صباحاً' },
    { value: '12:00', label: '12:00 - ظهراً' },
    { value: '14:00', label: '14:00 - بعد الظهر' },
    { value: '16:00', label: '16:00 - عصراً' },
    { value: '18:00', label: '18:00 - مساءً' },
    { value: '20:00', label: '20:00 - مساءً' },
    { value: '22:00', label: '22:00 - ليلاً' }
  ];

  const handleInputChange = (field, value) => {
    setSearchData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchData);
    }
  };

  const getTodayDate = () => {
    const today = new Date();
    return today?.toISOString()?.split('T')?.[0];
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 lg:p-8 -mt-16 relative z-10 mx-4 lg:mx-8">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          ابحث عن ملعبك المثالي
        </h3>
        <p className="text-gray-600">
          اختر المدينة والتاريخ والوقت المناسب لك
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
        {/* City Selection */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 rtl:text-right">
            <Icon name="MapPin" size={16} className="inline ml-1" />
            المدينة - Ville
          </label>
          <Select
            options={cityOptions}
            value={searchData?.city}
            onChange={(value) => handleInputChange('city', value)}
            placeholder="اختر المدينة..."
            searchable
            className="w-full"
          />
        </div>

        {/* Date Selection */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 rtl:text-right">
            <Icon name="Calendar" size={16} className="inline ml-1" />
            التاريخ - Date
          </label>
          <input
            type="date"
            value={searchData?.date}
            onChange={(e) => handleInputChange('date', e?.target?.value)}
            min={getTodayDate()}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Time Selection */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 rtl:text-right">
            <Icon name="Clock" size={16} className="inline ml-1" />
            الوقت - Heure
          </label>
          <Select
            options={timeOptions}
            value={searchData?.time}
            onChange={(value) => handleInputChange('time', value)}
            placeholder="اختر الوقت..."
            className="w-full"
          />
        </div>

        {/* Search Button */}
        <div className="flex items-end">
          <Button
            variant="default"
            size="lg"
            onClick={handleSearch}
            className="w-full bg-blue-800 hover:bg-blue-900"
            iconName="Search"
            iconPosition="left"
          >
            بحث
          </Button>
        </div>
      </div>
      {/* Quick Filters */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex flex-wrap gap-2 justify-center">
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium text-gray-700 transition-colors">
            <Icon name="Users" size={14} className="inline ml-1" />
            ملاعب 5x5
          </button>
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium text-gray-700 transition-colors">
            <Icon name="Users" size={14} className="inline ml-1" />
            ملاعب 7x7
          </button>
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium text-gray-700 transition-colors">
            <Icon name="Users" size={14} className="inline ml-1" />
            ملاعب 11x11
          </button>
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium text-gray-700 transition-colors">
            <Icon name="Zap" size={14} className="inline ml-1" />
            إضاءة ليلية
          </button>
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium text-gray-700 transition-colors">
            <Icon name="Car" size={14} className="inline ml-1" />
            موقف سيارات
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickSearchSection;