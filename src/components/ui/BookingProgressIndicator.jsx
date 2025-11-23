import React from 'react';
import Icon from '../AppIcon';

const BookingProgressIndicator = ({ currentStep = 1, totalSteps = 4, steps = [] }) => {
  const defaultSteps = [
    { id: 1, name: 'Select Field', icon: 'MapPin' },
    { id: 2, name: 'Choose Time', icon: 'Clock' },
    { id: 3, name: 'Payment', icon: 'CreditCard' },
    { id: 4, name: 'Confirmation', icon: 'CheckCircle' },
  ];

  const progressSteps = steps?.length > 0 ? steps : defaultSteps;

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
          {progressSteps?.map((step, index) => {
            const status = getStepStatus(step?.id);
            const isLast = index === progressSteps?.length - 1;

            return (
              <div key={step?.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-standard ${getStepClasses(
                      status
                    )}`}
                  >
                    {status === 'completed' ? (
                      <Icon name="Check" size={16} />
                    ) : (
                      <Icon name={step?.icon} size={16} />
                    )}
                  </div>
                  <span
                    className={`mt-2 text-sm font-medium ${
                      status === 'current' ?'text-primary'
                        : status === 'completed' ?'text-success' :'text-muted-foreground'
                    }`}
                  >
                    {step?.name}
                  </span>
                </div>
                {!isLast && (
                  <div className="flex-1 mx-4">
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
              Step {currentStep} of {totalSteps}
            </h3>
            <span className="text-sm text-muted-foreground">
              {Math.round((currentStep / totalSteps) * 100)}% Complete
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-muted rounded-full h-2 mb-4">
            <div
              className="bg-primary h-2 rounded-full transition-standard"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>

          {/* Current Step Info */}
          <div className="flex items-center space-x-3">
            <div
              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${getStepClasses(
                'current'
              )}`}
            >
              <Icon name={progressSteps?.[currentStep - 1]?.icon || 'Circle'} size={14} />
            </div>
            <span className="text-base font-medium text-foreground">
              {progressSteps?.[currentStep - 1]?.name || `Step ${currentStep}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingProgressIndicator;