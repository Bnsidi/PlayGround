import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const UserInformation = ({ onDataChange, initialData = null }) => {
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    phone: '',
    emergencyContact: '',
    specialRequests: '',
    agreeToTerms: false,
    agreeToPrivacy: false,
    ...initialData,
  });
  const [errors, setErrors] = useState({});

  // Mock user data (would come from authentication context)
  useEffect(() => {
    // Simulate loading user data from authentication
    const mockUserData = {
      fullName: 'أحمد محمد الكريم',
      email: 'ahmed.mohamed@email.com',
      phone: '+212 6 12 34 56 78',
      emergencyContact: '+212 6 87 65 43 21',
      specialRequests: '',
      agreeToTerms: false,
      agreeToPrivacy: false,
    };
    
    setUserData(prev => ({ ...prev, ...mockUserData }));
  }, []);

  const handleInputChange = (field, value) => {
    const newUserData = { ...userData, [field]: value };
    setUserData(newUserData);
    
    // Clear field error
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }

    // Validate and notify parent
    const isValid = validateUserData(newUserData);
    onDataChange({
      data: newUserData,
      isValid,
    });
  };

  const validateUserData = (data) => {
    const newErrors = {};

    if (!data?.fullName?.trim()) {
      newErrors.fullName = 'الاسم الكامل مطلوب';
    }

    if (!data?.email?.trim()) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/\S+@\S+\.\S+/?.test(data?.email)) {
      newErrors.email = 'البريد الإلكتروني غير صحيح';
    }

    if (!data?.phone?.trim()) {
      newErrors.phone = 'رقم الهاتف مطلوب';
    } else if (!/^\+?[0-9\s-]{10,}$/?.test(data?.phone)) {
      newErrors.phone = 'رقم الهاتف غير صحيح';
    }

    if (!data?.agreeToTerms) {
      newErrors.agreeToTerms = 'يجب الموافقة على الشروط والأحكام';
    }

    if (!data?.agreeToPrivacy) {
      newErrors.agreeToPrivacy = 'يجب الموافقة على سياسة الخصوصية';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">المعلومات الشخصية</h3>
        
        <div className="space-y-4">
          <Input
            label="الاسم الكامل"
            type="text"
            placeholder="أدخل اسمك الكامل"
            value={userData?.fullName}
            onChange={(e) => handleInputChange('fullName', e?.target?.value)}
            error={errors?.fullName}
            required
          />
          
          <Input
            label="البريد الإلكتروني"
            type="email"
            placeholder="example@email.com"
            value={userData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            error={errors?.email}
            required
          />
          
          <Input
            label="رقم الهاتف"
            type="tel"
            placeholder="+212 6 12 34 56 78"
            value={userData?.phone}
            onChange={(e) => handleInputChange('phone', e?.target?.value)}
            error={errors?.phone}
            required
          />
          
          <Input
            label="رقم الطوارئ (اختياري)"
            type="tel"
            placeholder="+212 6 87 65 43 21"
            value={userData?.emergencyContact}
            onChange={(e) => handleInputChange('emergencyContact', e?.target?.value)}
            description="رقم للتواصل في حالة الطوارئ"
          />
        </div>
      </div>
      {/* Additional Information */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">معلومات إضافية</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              طلبات خاصة (اختياري)
            </label>
            <textarea
              value={userData?.specialRequests}
              onChange={(e) => handleInputChange('specialRequests', e?.target?.value)}
              placeholder="أي طلبات خاصة أو ملاحظات للملعب..."
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-micro resize-none"
            />
            <p className="text-xs text-muted-foreground mt-1">
              مثل: طلب معدات إضافية، ترتيبات خاصة، إلخ
            </p>
          </div>
        </div>
      </div>
      {/* Terms and Conditions */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">الشروط والأحكام</h3>
        
        <div className="space-y-4">
          <div className="bg-muted/30 rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2">شروط الحجز:</h4>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>يجب الوصول قبل 15 دقيقة من موعد الحجز</li>
              <li>يمكن إلغاء الحجز مجاناً حتى 24 ساعة قبل الموعد</li>
              <li>عدم الحضور يؤدي إلى فقدان كامل المبلغ المدفوع</li>
              <li>يُمنع التدخين داخل الملعب</li>
              <li>المسؤولية الشخصية عن الإصابات أثناء اللعب</li>
            </ul>
          </div>

          <div className="space-y-3">
            <Checkbox
              label="أوافق على الشروط والأحكام"
              checked={userData?.agreeToTerms}
              onChange={(e) => handleInputChange('agreeToTerms', e?.target?.checked)}
              error={errors?.agreeToTerms}
              required
            />
            
            <Checkbox
              label="أوافق على سياسة الخصوصية ومعالجة البيانات"
              checked={userData?.agreeToPrivacy}
              onChange={(e) => handleInputChange('agreeToPrivacy', e?.target?.checked)}
              error={errors?.agreeToPrivacy}
              required
            />
          </div>

          {/* Contact Information */}
          <div className="bg-primary/5 rounded-lg p-4 mt-4">
            <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
              <Icon name="Info" size={16} className="text-primary" />
              <span className="font-medium text-foreground">معلومات مهمة</span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              في حالة وجود أي استفسارات أو مشاكل، يمكنك التواصل معنا:
            </p>
            <div className="space-y-1 text-sm">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Icon name="Phone" size={14} className="text-primary" />
                <span className="font-mono text-foreground">+212 5 22 12 34 56</span>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Icon name="Mail" size={14} className="text-primary" />
                <span className="text-foreground">support@terrabook.ma</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInformation;