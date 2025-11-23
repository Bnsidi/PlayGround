import React from 'react';
import { Link } from 'react-router-dom';

const LoginFooter = () => {
  return (
    <div className="mt-8 space-y-4">
      {/* Registration Link */}
      <div className="text-center">
        <p className="text-muted-foreground">
          ليس لديك حساب؟{' '}
          <Link
            to="/register"
            className="text-primary hover:text-primary/80 font-semibold transition-micro"
          >
            إنشاء حساب جديد
          </Link>
        </p>
      </div>

      {/* Terms and Privacy */}
      <div className="text-center text-sm text-muted-foreground">
        <p>
          بتسجيل الدخول، أنت توافق على{' '}
          <a href="/terms" className="text-primary hover:text-primary/80 transition-micro">
            شروط الاستخدام
          </a>
          {' '}و{' '}
          <a href="/privacy" className="text-primary hover:text-primary/80 transition-micro">
            سياسة الخصوصية
          </a>
        </p>
      </div>

      {/* Language Toggle */}
      <div className="flex justify-center space-x-4 text-sm">
        <button className="text-primary font-medium">العربية</button>
        <span className="text-muted-foreground">|</span>
        <button className="text-muted-foreground hover:text-foreground transition-micro">
          Français
        </button>
      </div>
    </div>
  );
};

export default LoginFooter;