import React from 'react';

interface BreadcrumbProps {
  steps: Array<{
    label: string;
    isActive?: boolean;
  }>;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ steps }) => {
  return (
    <div className="text-sm text-gray-400 mb-2">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <span className={`uppercase tracking-wide text-xs ${step.isActive ? 'text-white' : ''}`}>
            {step.label}
          </span>
          {index < steps.length - 1 && <span className="px-3">&gt;</span>}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumb;