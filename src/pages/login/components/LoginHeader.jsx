import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center mb-8">
      {/* Logo */}
      <Link to="/homepage" className="inline-flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
          <Icon name="Zap" size={28} color="white" />
        </div>
        <span className="text-2xl font-bold text-foreground">TerraBook</span>
      </Link>

      {/* Welcome Message */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          مرحباً بعودتك
        </h1>
        <p className="text-muted-foreground text-lg">
          سجل دخولك لحجز ملاعب كرة القدم المفضلة لديك
        </p>
      </div>
    </div>
  );
};

export default LoginHeader;