import React from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  bgColor?: string;
  controls?: React.ReactNode;
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  subtitle, 
  bgColor = "bg-slate-700",
  controls 
}) => {
  return (
    <div className={`${bgColor} text-white rounded-xl p-4 border border-neutral-600`}>
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-400">{title}</span>
      </div>
      <div className="text-4xl pt-6 flex justify-between items-center">
        {typeof value === 'number' ? value.toLocaleString() : value}
        {controls}
      </div>
      {subtitle && (
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-400">{subtitle}</span>
        </div>
      )}
    </div>
  );
};

export default StatsCard;