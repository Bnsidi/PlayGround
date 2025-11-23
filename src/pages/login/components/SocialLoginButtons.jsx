import React from 'react';
import Button from '../../../components/ui/Button';

const SocialLoginButtons = ({ onSocialLogin, isLoading }) => {
  const handleGoogleLogin = () => {
    if (onSocialLogin) {
      onSocialLogin('google');
    }
  };

  const handleFacebookLogin = () => {
    if (onSocialLogin) {
      onSocialLogin('facebook');
    }
  };

  return (
    <div className="space-y-3">
      <Button
        variant="outline"
        fullWidth
        onClick={handleGoogleLogin}
        disabled={isLoading}
        iconName="Chrome"
        iconPosition="left"
        className="h-12 text-base font-medium border-2 hover:bg-muted/50"
      >
        تسجيل الدخول بـ Google
      </Button>
      
      <Button
        variant="outline"
        fullWidth
        onClick={handleFacebookLogin}
        disabled={isLoading}
        iconName="Facebook"
        iconPosition="left"
        className="h-12 text-base font-medium border-2 hover:bg-muted/50"
      >
        تسجيل الدخول بـ Facebook
      </Button>
    </div>
  );
};

export default SocialLoginButtons;