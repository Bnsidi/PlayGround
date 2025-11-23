import React from 'react';
import Icon from '../../../components/AppIcon';

const BookingStepIndicator = ({ currentStep = 1, totalSteps = 4 }) => {
  const steps = [
    { id: 1, name: 'التاريخ والوقت', nameEn: 'Date & Time', icon: 'Calendar' },
    { id: 2, name: 'تفاصيل الحجز', nameEn: 'Booking Details', icon: 'FileText' },
    { id: 3, name: 'الدفع', nameEn: 'Payment', icon: 'CreditCard' },
    { id: 4, name: 'التأكيد', nameEn: 'Confirmation', icon: 'CheckCircle' },
  ];

  const getStepStatus = (stepId) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'current';
    return 'upcoming';
  };

  const getStepClasses = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success text-success-foreground border-success';
      case 'current':
        return 'bg-primary text-primary-foreground border-primary';
      case 'upcoming':
        return 'bg-muted text-muted-foreground border-border';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getConnectorClasses = (stepId) => {
    return stepId < currentStep ? 'bg-success' : 'bg-border';
  };

  return (
    <div className="w-full bg-card border-b border-border p-4 lg:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Desktop Progress Indicator */}
        <div className="hidden md:flex items-center justify-between">
          {steps?.map((step, index) => {
            const status = getStepStatus(step?.id);
            const isLast = index === steps?.length - 1;

            return (
              <div key={step?.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-standard ${getStepClasses(
                      status
                    )}`}
                  >
                    {status === 'completed' ? (
                      <Icon name="Check" size={20} />
                    ) : (
                      <Icon name={step?.icon} size={20} />
                    )}
                  </div>
                  <div className="mt-3 text-center">
                    <span
                      className={`block text-sm font-medium ${
                        status === 'current' ?'text-primary'
                          : status === 'completed' ?'text-success' :'text-muted-foreground'
                      }`}
                    >
                      {step?.name}
                    </span>
                    <span className="block text-xs text-muted-foreground mt-1">
                      {step?.nameEn}
                    </span>
                  </div>
                </div>
                {!isLast && (
                  <div className="flex-1 mx-6">
                    <div
                      className={`h-0.5 transition-standard ${getConnectorClasses(
                        step?.id
                      )}`}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile Progress Indicator */}
        <div className="md:hidden">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">
              الخطوة {currentStep} من {totalSteps}
            </h3>
            <span className="text-sm text-muted-foreground">
              {Math.round((currentStep / totalSteps) * 100)}% مكتمل
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-muted rounded-full h-3 mb-4">
            <div
              className="bg-primary h-3 rounded-full transition-standard"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>

          {/* Current Step Info */}
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div
              className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${getStepClasses(
                'current'
              )}`}
            >
              <Icon name={steps?.[currentStep - 1]?.icon || 'Circle'} size={18} />
            </div>
            <div>
              <span className="block text-base font-medium text-foreground">
                {steps?.[currentStep - 1]?.name || `الخطوة ${currentStep}`}
              </span>
              <span className="block text-sm text-muted-foreground">
                {steps?.[currentStep - 1]?.nameEn || `Step ${currentStep}`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingStepIndicator;