import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const RegistrationForm = ({ onRegister, isLoading }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    agreeToPrivacy: false,
    subscribeNewsletter: false
  });
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Calculate password strength
    if (name === 'password') {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password?.length >= 8) strength += 25;
    if (/[a-z]/?.test(password)) strength += 25;
    if (/[A-Z]/?.test(password)) strength += 25;
    if (/[0-9]/?.test(password)) strength += 25;
    setPasswordStrength(strength);
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 25) return 'bg-error';
    if (passwordStrength <= 50) return 'bg-warning';
    if (passwordStrength <= 75) return 'bg-accent';
    return 'bg-success';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 25) return 'ضعيف';
    if (passwordStrength <= 50) return 'متوسط';
    if (passwordStrength <= 75) return 'جيد';
    return 'قوي';
  };

  const validateForm = () => {
    const newErrors = {};

    // Full name validation
    if (!formData?.fullName?.trim()) {
      newErrors.fullName = 'الاسم الكامل مطلوب';
    } else if (formData?.fullName?.trim()?.length < 2) {
      newErrors.fullName = 'الاسم يجب أن يكون أكثر من حرفين';
    }

    // Phone validation
    if (!formData?.phone?.trim()) {
      newErrors.phone = 'رقم الهاتف مطلوب';
    } else if (!/^[+]?[\d\s-()]{8,15}$/?.test(formData?.phone)) {
      newErrors.phone = 'رقم الهاتف غير صحيح';
    }

    // Email validation
    if (!formData?.email?.trim()) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'البريد الإلكتروني غير صحيح';
    }

    // Password validation
    if (!formData?.password) {
      newErrors.password = 'كلمة المرور مطلوبة';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'كلمة المرور يجب أن تكون 8 أحرف على الأقل';
    }

    // Confirm password validation
    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'تأكيد كلمة المرور مطلوب';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'كلمات المرور غير متطابقة';
    }

    // Terms agreement validation
    if (!formData?.agreeToTerms) {
      newErrors.agreeToTerms = 'يجب الموافقة على الشروط والأحكام';
    }

    // Privacy policy validation
    if (!formData?.agreeToPrivacy) {
      newErrors.agreeToPrivacy = 'يجب الموافقة على سياسة الخصوصية';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    const registrationData = {
      fullName: formData?.fullName?.trim(),
      phone: formData?.phone?.trim(),
      email: formData?.email?.trim()?.toLowerCase(),
      password: formData?.password,
      subscribeNewsletter: formData?.subscribeNewsletter
    };

    if (onRegister) {
      await onRegister(registrationData);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <Input
          label="الاسم الكامل / Nom complet"
          type="text"
          name="fullName"
          value={formData?.fullName}
          onChange={handleInputChange}
          placeholder="أدخل اسمك الكامل"
          error={errors?.fullName}
          required
          dir="rtl"
        />

        {/* Phone Number */}
        <Input
          label="رقم الهاتف / Numéro de téléphone"
          type="tel"
          name="phone"
          value={formData?.phone}
          onChange={handleInputChange}
          placeholder="أدخل رقم هاتفك"
          error={errors?.phone}
          required
          dir="ltr"
        />

        {/* Email */}
        <Input
          label="البريد الإلكتروني / Email"
          type="email"
          name="email"
          value={formData?.email}
          onChange={handleInputChange}
          placeholder="أدخل بريدك الإلكتروني"
          error={errors?.email}
          required
          dir="ltr"
        />

        {/* Password */}
        <div className="space-y-2">
          <Input
            label="كلمة المرور / Mot de passe"
            type="password"
            name="password"
            value={formData?.password}
            onChange={handleInputChange}
            placeholder="أدخل كلمة المرور"
            error={errors?.password}
            required
            dir="ltr"
          />
          
          {/* Password Strength Indicator */}
          {formData?.password && (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">قوة كلمة المرور</span>
                <span className={`font-medium ${
                  passwordStrength <= 25 ? 'text-error' :
                  passwordStrength <= 50 ? 'text-warning' :
                  passwordStrength <= 75 ? 'text-accent' : 'text-success'
                }`}>
                  {getPasswordStrengthText()}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                  style={{ width: `${passwordStrength}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <Input
          label="تأكيد كلمة المرور / Confirmer le mot de passe"
          type="password"
          name="confirmPassword"
          value={formData?.confirmPassword}
          onChange={handleInputChange}
          placeholder="أعد إدخال كلمة المرور"
          error={errors?.confirmPassword}
          required
          dir="ltr"
        />

        {/* Terms and Privacy Checkboxes */}
        <div className="space-y-4">
          <Checkbox
            label={
              <span className="text-sm text-foreground" dir="rtl">
                أوافق على{' '}
                <Link to="/terms" className="text-primary hover:text-primary/80 underline">
                  الشروط والأحكام
                </Link>
              </span>
            }
            checked={formData?.agreeToTerms}
            onChange={handleInputChange}
            name="agreeToTerms"
            error={errors?.agreeToTerms}
            required
          />

          <Checkbox
            label={
              <span className="text-sm text-foreground" dir="rtl">
                أوافق على{' '}
                <Link to="/privacy" className="text-primary hover:text-primary/80 underline">
                  سياسة الخصوصية
                </Link>
              </span>
            }
            checked={formData?.agreeToPrivacy}
            onChange={handleInputChange}
            name="agreeToPrivacy"
            error={errors?.agreeToPrivacy}
            required
          />

          <Checkbox
            label={
              <span className="text-sm text-muted-foreground" dir="rtl">
                أرغب في تلقي النشرة الإخبارية والعروض الخاصة
              </span>
            }
            checked={formData?.subscribeNewsletter}
            onChange={handleInputChange}
            name="subscribeNewsletter"
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="default"
          fullWidth
          loading={isLoading}
          className="mt-8"
        >
          إنشاء حساب / Créer un compte
        </Button>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground" dir="rtl">
            لديك حساب بالفعل؟{' '}
            <Link
              to="/login"
              className="text-primary hover:text-primary/80 font-medium transition-micro"
            >
              تسجيل الدخول
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;