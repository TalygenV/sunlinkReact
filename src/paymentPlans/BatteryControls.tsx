import React from 'react';

interface BatteryControlsProps {
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const BatteryControls: React.FC<BatteryControlsProps> = ({ 
  count, 
  onIncrement, 
  onDecrement 
}) => {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={onDecrement}
        className="bg-gray-600 hover:bg-gray-500 rounded-full h-8 w-8 flex items-center justify-center"
      >
        <span className="text-white text-lg">-</span>
      </button>
      <button
        onClick={onIncrement}
        className="bg-gray-600 hover:bg-gray-500 rounded-full h-8 w-8 flex items-center justify-center"
      >
        <span className="text-white text-lg">+</span>
      </button>
    </div>
  );
};

export default BatteryControls;