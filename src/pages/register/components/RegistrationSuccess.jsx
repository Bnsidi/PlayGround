import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RegistrationSuccess = ({ userEmail, onResendVerification, isResending }) => {
  return (
    <div className="w-full max-w-md mx-auto text-center">
      {/* Success Icon */}
      <div className="mb-6">
        <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="CheckCircle" size={40} className="text-success" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2" dir="rtl">
          تم إنشاء الحساب بنجاح!
        </h2>
        <p className="text-muted-foreground" dir="rtl">
          Compte créé avec succès!
        </p>
      </div>

      {/* Verification Message */}
      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <div className="flex items-center justify-center mb-4">
          <Icon name="Mail" size={24} className="text-primary" />
        </div>
        <h3 className="font-semibold text-foreground mb-2" dir="rtl">
          تحقق من بريدك الإلكتروني
        </h3>
        <p className="text-sm text-muted-foreground mb-4" dir="rtl">
          لقد أرسلنا رسالة تأكيد إلى:
        </p>
        <p className="font-medium text-foreground bg-muted px-3 py-2 rounded-md text-sm" dir="ltr">
          {userEmail}
        </p>
        <p className="text-xs text-muted-foreground mt-3" dir="rtl">
          انقر على الرابط في الرسالة لتفعيل حسابك
        </p>
      </div>

      {/* SMS Notification */}
      <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse mb-2">
          <Icon name="Smartphone" size={16} className="text-accent" />
          <span className="text-sm font-medium text-foreground" dir="rtl">
            رسالة نصية مرسلة
          </span>
        </div>
        <p className="text-xs text-muted-foreground" dir="rtl">
          تم إرسال رمز التأكيد إلى رقم هاتفك أيضاً
        </p>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        <Button
          variant="default"
          fullWidth
          onClick={onResendVerification}
          loading={isResending}
          iconName="RefreshCw"
          iconPosition="right"
        >
          <span dir="rtl">إعادة إرسال رسالة التأكيد</span>
        </Button>

        <Link to="/login">
          <Button variant="outline" fullWidth>
            <span dir="rtl">العودة إلى تسجيل الدخول</span>
          </Button>
        </Link>
      </div>

      {/* Help Section */}
      <div className="mt-8 p-4 bg-muted/30 rounded-lg">
        <h4 className="font-medium text-foreground mb-2" dir="rtl">
          لم تستلم الرسالة؟
        </h4>
        <ul className="text-xs text-muted-foreground space-y-1" dir="rtl">
          <li>• تحقق من مجلد الرسائل غير المرغوب فيها</li>
          <li>• تأكد من صحة عنوان البريد الإلكتروني</li>
          <li>• انتظر بضع دقائق وحاول مرة أخرى</li>
        </ul>
        <div className="mt-3 pt-3 border-t border-border">
          <Link
            to="/contact"
            className="text-xs text-primary hover:text-primary/80 transition-micro"
          >
            تحتاج مساعدة؟ اتصل بنا
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegistrationSuccess;