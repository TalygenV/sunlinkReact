import React, { useState } from 'react';

const USMap: React.FC = () => {
  const [hoveredState, setHoveredState] = useState<string>('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleStateHover = (stateName: string) => {
    setHoveredState(stateName);
  };

  const handleStateLeave = () => {
    setHoveredState('');
  };

  return (
    <div className="xl:container mx-auto usamap relative">
      {hoveredState && (
        <div
          className="absolute pointer-events-none bg-black text-white px-2 py-1 rounded text-sm z-50"
          style={{
            top: mousePosition.y - 40,
            left: mousePosition.x - 50,
            opacity: hoveredState ? 1 : 0
          }}
        >
          {hoveredState}
        </div>
      )}
      
      <div className="bg-gray-100 rounded-lg p-8 h-96 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">Interactive US Map</h3>
          <p className="text-gray-600">
            Interactive map showing our coverage across the United States
          </p>
          <div className="mt-8 space-y-2 text-sm font-mono">
            <div className="flex items-center justify-center space-x-2">
              <span className="h-2.5 w-2.5 rounded-full bg-orange-500"></span>
              <span className="text-gray-900">ACTIVELY INSTALLING</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span className="h-2.5 w-2.5 rounded-full bg-gray-300"></span>
              <span className="text-gray-900">ROOM TO GROW</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default USMap;