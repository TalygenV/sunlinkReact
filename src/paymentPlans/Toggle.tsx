import React from 'react';

interface ToggleProps {
  checked: boolean;
  onChange: () => void;
  leftLabel?: string;
  rightLabel?: string;
}

const Toggle: React.FC<ToggleProps> = ({ checked, onChange, leftLabel, rightLabel }) => {
  return (
    <div className="flex items-center">
      {leftLabel && <span className="mr-2 text-sm text-gray-300">{leftLabel}</span>}
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only peer"
        />
        <div className="relative w-9 h-5 border-2 border-gray-400 bg-transparent rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
      </label>
      {rightLabel && <span className="ml-2 text-sm text-gray-300">{rightLabel}</span>}
    </div>
  );
};

export default Toggle;