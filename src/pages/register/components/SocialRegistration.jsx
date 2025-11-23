import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SocialRegistration = ({ onSocialRegister, isLoading }) => {
  const handleSocialRegister = async (provider) => {
    if (onSocialRegister) {
      await onSocialRegister(provider);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="space-y-4">
        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-background px-4 text-muted-foreground" dir="rtl">
              أو التسجيل باستخدام / Ou s'inscrire avec
            </span>
          </div>
        </div>

        {/* Google Registration */}
        <Button
          variant="outline"
          fullWidth
          onClick={() => handleSocialRegister('Google')}
          disabled={isLoading}
          className="h-12 text-base"
        >
          <div className="flex items-center justify-center space-x-3 rtl:space-x-reverse">
            <Icon name="Chrome" size={20} className="text-[#4285F4]" />
            <span dir="rtl">التسجيل بـ Google</span>
          </div>
        </Button>

        {/* Facebook Registration */}
        <Button
          variant="outline"
          fullWidth
          onClick={() => handleSocialRegister('Facebook')}
          disabled={isLoading}
          className="h-12 text-base"
        >
          <div className="flex items-center justify-center space-x-3 rtl:space-x-reverse">
            <Icon name="Facebook" size={20} className="text-[#1877F2]" />
            <span dir="rtl">التسجيل بـ Facebook</span>
          </div>
        </Button>

        {/* Apple Registration */}
        <Button
          variant="outline"
          fullWidth
          onClick={() => handleSocialRegister('Apple')}
          disabled={isLoading}
          className="h-12 text-base"
        >
          <div className="flex items-center justify-center space-x-3 rtl:space-x-reverse">
            <Icon name="Apple" size={20} className="text-foreground" />
            <span dir="rtl">التسجيل بـ Apple</span>
          </div>
        </Button>
      </div>

      {/* Security Notice */}
      <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
        <div className="flex items-start space-x-3 rtl:space-x-reverse">
          <Icon name="Shield" size={16} className="text-success mt-0.5 flex-shrink-0" />
          <div className="text-xs text-muted-foreground" dir="rtl">
            <p className="font-medium text-foreground mb-1">تسجيل آمن ومحمي</p>
            <p>
              نحن نحمي معلوماتك الشخصية ولا نشاركها مع أطراف ثالثة. 
              التسجيل عبر وسائل التواصل الاجتماعي آمن ومشفر.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialRegistration;