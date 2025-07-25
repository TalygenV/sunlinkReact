import React from 'react';

interface WarrantyCardProps {
  title: string;
  description: string;
  duration: string;
  bgColor: string;
}

const WarrantyCard: React.FC<WarrantyCardProps> = ({ 
  title, 
  description, 
  duration, 
  bgColor 
}) => {
  return (
    <div className="bg-slate-700 p-3 rounded-md flex justify-between">
      <div className="flex w-full">
        <div className={`mr-3 p-1 w-10 h-10 ${bgColor} rounded flex items-center justify-center`}>
          <div className="w-4 h-4 bg-white rounded"></div>
        </div>
        <div className="w-full">
          <p className="text-gray-300">{title}</p>
          <p className="text-sm text-gray-300">{description}</p>
        </div>
      </div>
      <div className="w-24">
        <p className="text-sm text-gray-300 border rounded-xl px-2 py-1">{duration}</p>
      </div>
    </div>
  );
};

export default WarrantyCard;