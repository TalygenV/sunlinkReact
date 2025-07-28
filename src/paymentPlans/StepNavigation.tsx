import React from 'react';
import { Check } from 'lucide-react';

interface Step {
  number: number;
  label: string;
  isCompleted: boolean;
  isActive: boolean;
}

interface StepNavigationProps {
  steps: Step[];
}

const StepNavigation: React.FC<StepNavigationProps> = ({ steps }) => {
  return (
    <div className="flex items-center gap-4 mb-10 text-sm font-medium flex-wrap">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full border border-white text-xs font-bold flex items-center justify-center ${
              step.isCompleted 
                ? 'bg-orange-500 text-black' 
                : step.isActive 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-amber-800 text-white'
            }`}>
              {step.isCompleted ? <Check size={12} /> : step.number}
            </div>
            <span className="text-white">{step.label}</span>
          </div>
          {index < steps.length - 1 && (
            <div className="flex-1 h-0.5 bg-white min-w-[40px]">
              {step.isCompleted && <div className="w-1/2 h-0.5 bg-orange-500"></div>}
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepNavigation;