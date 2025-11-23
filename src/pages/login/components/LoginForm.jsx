import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const LoginForm = ({ onSubmit, isLoading, errors }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="البريد الإلكتروني / Email"
        type="email"
        name="email"
        value={formData?.email}
        onChange={handleInputChange}
        placeholder="أدخل بريدك الإلكتروني"
        error={errors?.email}
        required
        className="text-left"
        dir="ltr"
      />
      <Input
        label="كلمة المرور / Mot de passe"
        type="password"
        name="password"
        value={formData?.password}
        onChange={handleInputChange}
        placeholder="أدخل كلمة المرور"
        error={errors?.password}
        required
        className="text-left"
        dir="ltr"
      />
      <div className="flex items-center justify-between">
        <Checkbox
          label="تذكرني"
          name="rememberMe"
          checked={formData?.rememberMe}
          onChange={handleInputChange}
          className="text-sm"
        />
        
        <a
          href="/forgot-password"
          className="text-sm text-primary hover:text-primary/80 transition-micro font-medium"
        >
          نسيت كلمة المرور؟
        </a>
      </div>
      {errors?.submit && (
        <div className="p-4 rounded-md bg-error/10 border border-error/20">
          <p className="text-sm text-error text-center">{errors?.submit}</p>
        </div>
      )}
      <Button
        type="submit"
        variant="default"
        fullWidth
        loading={isLoading}
        className="h-12 text-base font-semibold"
      >
        تسجيل الدخول
      </Button>
    </form>
  );
};

export default LoginForm;