import React from 'react';
import { cn } from '@/utils/cn';
import { CheckIcon } from 'lucide-react';

export interface StepProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

export const Step: React.FC<StepProps> = ({ title, description, icon }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-2">{icon}</div>
      <h3 className="text-sm font-medium">{title}</h3>
      {description && <p className="text-xs text-muted-foreground">{description}</p>}
    </div>
  );
};

export interface StepsProps {
  currentStep: number;
  children: React.ReactNode;
  className?: string;
}

export const Steps: React.FC<StepsProps> = ({ currentStep, children, className }) => {
  const steps = React.Children.toArray(children);
  
  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          
          return (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center">
                <div 
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border-2",
                    isCompleted 
                      ? "bg-primary border-primary text-primary-foreground" 
                      : isCurrent 
                        ? "border-primary text-primary" 
                        : "border-muted-foreground text-muted-foreground"
                  )}
                >
                  {isCompleted ? (
                    <CheckIcon className="h-5 w-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                {React.isValidElement(step) && React.cloneElement(step, {
                  ...step.props,
                  className: cn(
                    "mt-2",
                    isCompleted 
                      ? "text-primary" 
                      : isCurrent 
                        ? "text-foreground" 
                        : "text-muted-foreground"
                  )
                })}
              </div>
              
              {index < steps.length - 1 && (
                <div className="flex-1 flex items-center">
                  <div 
                    className={cn(
                      "h-[2px] w-full mx-2",
                      index < currentStep 
                        ? "bg-primary" 
                        : "bg-muted-foreground"
                    )}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}; 