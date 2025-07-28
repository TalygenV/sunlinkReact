import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';
import Toggle from './Toggle';

interface AddOnServiceProps {
  icon: LucideIcon;
  title: string;
  price: string;
  isToggled: boolean;
  onToggle: () => void;
  hasInfo?: boolean;
}

const AddOnService: React.FC<AddOnServiceProps> = ({
  icon: Icon,
  title,
  price,
  isToggled,
  onToggle,
  hasInfo = false
}) => {
  return (
    <div className="bg-slate-700 p-3 rounded-md flex justify-between mb-5">
      <div className="flex w-full">
        <div className="mr-3 bg-white p-2 rounded-md w-8 h-8 flex items-center justify-center">
          <Icon size={16} className="text-black" />
        </div>
        <div className="w-full">
          <p className="text-gray-300 flex items-center">
            {title}
            {hasInfo && (
              <span className="ml-1 text-xs bg-blue-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
                i
              </span>
            )}
          </p>
          <p className="text-sm text-gray-300">{price}</p>
        </div>
      </div>
      <div>
        <Toggle checked={isToggled} onChange={onToggle} />
      </div>
    </div>
  );
};

export default AddOnService;