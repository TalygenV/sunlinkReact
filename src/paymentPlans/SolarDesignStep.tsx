import React from 'react';
import { Expand } from 'lucide-react';
import Toggle from './Toggle';
import roofimg from "../assets/images/roofImg.png"

interface SolarDesignStepProps {
  solarLayoutToggle: boolean;
  onSolarLayoutToggle: () => void;
  onExpandClick: () => void;
}

const SolarDesignStep: React.FC<SolarDesignStepProps> = ({
  solarLayoutToggle,
  onSolarLayoutToggle,
  onExpandClick
}) => {
  return (
    <div className="bg-slate-800 text-white p-5 rounded-xl shadow-lg w-full">
      <div className="flex mb-4">
        <p className="text-sm text-gray-300 flex items-center border rounded-xl px-3 py-1">
          <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2"></span> Step 1
        </p>
      </div>

      <div className="flex justify-between mb-4">
        <div className="text-gray-300">Your Solar Design</div>
        <Toggle
          checked={solarLayoutToggle}
          onChange={onSolarLayoutToggle}
          leftLabel="Solar Layout"
          rightLabel="Savings Chart"
        />
      </div>

      {/*
      <div className="relative bg-gray-400 rounded-md aspect-square flex items-center justify-center text-white text-lg w-full h-[496px]">
        Customized Solar Design
        <button
          onClick={onExpandClick}
          className="absolute top-2 right-2 hover:bg-gray-700 rounded p-1"
          title="Expand"
        >
          <Expand className="h-5 w-5 text-white" />
        </button>
      </div>
      */}
      <div className="relative bg-gray-400 rounded-md aspect-square flex items-center justify-center text-white text-lg w-full h-[496px] overflow-hidden">
      <img
        src={roofimg}
        alt="Customized Solar Design"
        className="object-cover w-full h-full rounded-md"
      />

      {/* 
      <button
        onClick={onExpandClick}
        className="absolute top-2 right-2 hover:bg-gray-700 rounded p-1"
        title="Expand"
      >
        <Expand className="h-5 w-5 text-white" />
      </button>
      */}
    </div>

      <div className="text-sm text-gray-300 py-4">
        *Interactive solar panel layout. Expand to view it full screen.
      </div>

      <div className="bg-neutral-800 p-3 rounded-2xl border-0 mt-5 text-left text-white text-sm font-normal flex items-start">
        <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center mr-3 mt-0.5">
          <span className="text-white text-xs">i</span>
        </div>
        Disclaimer: Final layout may change based on city, utility, roof conditions, and code. 
        SunLink Verified Installers will optimize it for performance, aesthetics, and compliance.
      </div>
    </div>
  );
};

export default SolarDesignStep;