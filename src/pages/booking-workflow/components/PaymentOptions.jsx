import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

import Input from '../../../components/ui/Input';

const PaymentOptions = ({ onPaymentMethodChange, totalAmount = 0 }) => {
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
  });
  const [errors, setErrors] = useState({});

  const paymentMethods = [
    {
      id: 'card',
      name: 'بطاقة ائتمان',
      nameEn: 'Credit/Debit Card',
      icon: 'CreditCard',
      description: 'Visa, Mastercard, American Express',
      secure: true,
    },
    {
      id: 'paypal',
      name: 'PayPal',
      nameEn: 'PayPal',
      icon: 'Wallet',
      description: 'دفع آمن عبر PayPal',
      secure: true,
    },
    {
      id: 'cash',
      name: 'الدفع في الموقع',
      nameEn: 'Pay on Site',
      icon: 'Banknote',
      description: 'ادفع نقداً عند وصولك للملعب',
      secure: false,
    },
  ];

  const handleMethodSelect = (methodId) => {
    setSelectedMethod(methodId);
    setErrors({});
    onPaymentMethodChange({
      method: methodId,
      isValid: methodId === 'cash' || methodId === 'paypal',
      data: methodId === 'card' ? cardData : null,
    });
  };

  const handleCardDataChange = (field, value) => {
    const newCardData = { ...cardData, [field]: value };
    setCardData(newCardData);
    
    // Clear specific field error
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }

    // Validate and notify parent
    const isValid = validateCardData(newCardData);
    onPaymentMethodChange({
      method: 'card',
      isValid,
      data: newCardData,
    });
  };

  const validateCardData = (data) => {
    const newErrors = {};

    if (!data?.cardNumber || data?.cardNumber?.length < 16) {
      newErrors.cardNumber = 'رقم البطاقة غير صحيح';
    }

    if (!data?.expiryDate || !/^\d{2}\/\d{2}$/?.test(data?.expiryDate)) {
      newErrors.expiryDate = 'تاريخ انتهاء الصلاحية غير صحيح';
    }

    if (!data?.cvv || data?.cvv?.length < 3) {
      newErrors.cvv = 'رمز الأمان غير صحيح';
    }

    if (!data?.cardholderName?.trim()) {
      newErrors.cardholderName = 'اسم حامل البطاقة مطلوب';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const formatCardNumber = (value) => {
    const v = value?.replace(/\s+/g, '')?.replace(/[^0-9]/gi, '');
    const matches = v?.match(/\d{4,16}/g);
    const match = matches && matches?.[0] || '';
    const parts = [];
    for (let i = 0, len = match?.length; i < len; i += 4) {
      parts?.push(match?.substring(i, i + 4));
    }
    if (parts?.length) {
      return parts?.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value?.replace(/\D/g, '');
    if (v?.length >= 2) {
      return `${v?.substring(0, 2)}/${v?.substring(2, 4)}`;
    }
    return v;
  };

  return (
    <div className="space-y-6">
      {/* Payment Methods */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">طريقة الدفع</h3>
        
        <div className="space-y-3">
          {paymentMethods?.map((method) => {
            const isSelected = selectedMethod === method?.id;
            
            return (
              <div
                key={method?.id}
                onClick={() => handleMethodSelect(method?.id)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-micro ${
                  isSelected
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/30'
                }`}
              >
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    isSelected ? 'border-primary' : 'border-border'
                  }`}>
                    {isSelected && (
                      <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                    )}
                  </div>
                  
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    <Icon name={method?.icon} size={20} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <h4 className="font-medium text-foreground">{method?.name}</h4>
                      {method?.secure && (
                        <Icon name="Shield" size={16} className="text-success" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{method?.description}</p>
                  </div>
                  
                  <div className="text-right">
                    <span className="text-sm text-muted-foreground">{method?.nameEn}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Card Details Form */}
      {selectedMethod === 'card' && (
        <div className="bg-card rounded-lg border border-border p-6">
          <h4 className="font-medium text-foreground mb-4">تفاصيل البطاقة</h4>
          
          <div className="space-y-4">
            <Input
              label="رقم البطاقة"
              type="text"
              placeholder="1234 5678 9012 3456"
              value={cardData?.cardNumber}
              onChange={(e) => handleCardDataChange('cardNumber', formatCardNumber(e?.target?.value))}
              error={errors?.cardNumber}
              maxLength={19}
              required
            />
            
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="تاريخ انتهاء الصلاحية"
                type="text"
                placeholder="MM/YY"
                value={cardData?.expiryDate}
                onChange={(e) => handleCardDataChange('expiryDate', formatExpiryDate(e?.target?.value))}
                error={errors?.expiryDate}
                maxLength={5}
                required
              />
              
              <Input
                label="رمز الأمان (CVV)"
                type="text"
                placeholder="123"
                value={cardData?.cvv}
                onChange={(e) => handleCardDataChange('cvv', e?.target?.value?.replace(/\D/g, ''))}
                error={errors?.cvv}
                maxLength={4}
                required
              />
            </div>
            
            <Input
              label="اسم حامل البطاقة"
              type="text"
              placeholder="الاسم كما هو مكتوب على البطاقة"
              value={cardData?.cardholderName}
              onChange={(e) => handleCardDataChange('cardholderName', e?.target?.value)}
              error={errors?.cardholderName}
              required
            />
          </div>

          {/* Security Notice */}
          <div className="mt-4 p-3 bg-success/10 border border-success/20 rounded-lg">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Icon name="Shield" size={16} className="text-success" />
              <span className="text-sm font-medium text-success">دفع آمن ومشفر</span>
            </div>
            <p className="text-xs text-success/80 mt-1">
              جميع المعاملات محمية بتشفير SSL 256-bit
            </p>
          </div>
        </div>
      )}
      {/* PayPal Notice */}
      {selectedMethod === 'paypal' && (
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="text-center">
            <Icon name="Wallet" size={48} className="mx-auto text-primary mb-4" />
            <h4 className="font-medium text-foreground mb-2">الدفع عبر PayPal</h4>
            <p className="text-sm text-muted-foreground mb-4">
              ستتم إعادة توجيهك إلى PayPal لإتمام عملية الدفع بشكل آمن
            </p>
            <div className="bg-primary/10 rounded-lg p-3">
              <p className="text-sm text-primary font-medium">
                المبلغ المطلوب: {totalAmount} د.م
              </p>
            </div>
          </div>
        </div>
      )}
      {/* Cash Payment Notice */}
      {selectedMethod === 'cash' && (
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="text-center">
            <Icon name="Banknote" size={48} className="mx-auto text-warning mb-4" />
            <h4 className="font-medium text-foreground mb-2">الدفع في الموقع</h4>
            <p className="text-sm text-muted-foreground mb-4">
              ادفع نقداً عند وصولك للملعب. تأكد من إحضار المبلغ المطلوب.
            </p>
            <div className="bg-warning/10 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-foreground">المبلغ المطلوب:</span>
                <span className="font-bold text-warning font-mono">{totalAmount} د.م</span>
              </div>
              <p className="text-xs text-muted-foreground">
                يرجى الوصول قبل 15 دقيقة من موعد الحجز
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentOptions;