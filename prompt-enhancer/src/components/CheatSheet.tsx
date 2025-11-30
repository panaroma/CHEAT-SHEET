import React, { useState } from 'react';
import shotsData from '../data/shots.json';
import { Camera } from 'lucide-react';

interface Shot {
  id: string;
  name: string;
  description: string;
  gifUrl: string;
}

export const CheatSheet: React.FC = () => {
  const [hoveredShot, setHoveredShot] = useState<Shot | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent, shot: Shot) => {
    // Calculate position to keep tooltip on screen
    const x = e.clientX + 20; // Offset from cursor
    const y = e.clientY - 100; // Offset from cursor
    setPosition({ x, y });
    setHoveredShot(shot);
  };

  const handleMouseLeave = () => {
    setHoveredShot(null);
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 h-full flex flex-col">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <Camera className="w-5 h-5" /> Camera Cheat Sheet
      </h3>

      <div className="flex-1 overflow-y-auto space-y-2 pr-2">
        {shotsData.map((shot: any) => (
          <div
            key={shot.id}
            className="group relative p-3 rounded-lg hover:bg-neutral-800 cursor-help border border-transparent hover:border-neutral-700 transition-all"
            onMouseMove={(e) => handleMouseMove(e, shot)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex justify-between items-center">
              <span className="font-medium text-neutral-200">{shot.name}</span>
            </div>
            <p className="text-xs text-neutral-500 mt-1 line-clamp-1">
              {shot.description}
            </p>
          </div>
        ))}
      </div>

      {/* Floating Tooltip */}
      {hoveredShot && (
        <div
          className="fixed z-50 pointer-events-none bg-black rounded-lg shadow-2xl border border-neutral-700 w-64 overflow-hidden"
          style={{
            left: Math.min(position.x, window.innerWidth - 280), // Prevent going off right edge
            top: Math.max(10, Math.min(position.y, window.innerHeight - 200)) // Keep vertically in bounds
          }}
        >
          <div className="relative aspect-video bg-neutral-800">
             {/* Note: Using placeholder images/gifs. In a real app, verify these load correctly. */}
             <img
               src={hoveredShot.gifUrl}
               alt={hoveredShot.name}
               className="w-full h-full object-cover"
               onError={(e) => {
                 (e.target as HTMLImageElement).src = 'https://via.placeholder.com/320x180?text=Preview+Unavailable';
               }}
             />
             <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
               <p className="text-white text-sm font-bold">{hoveredShot.name}</p>
             </div>
          </div>
          <div className="p-2 bg-neutral-900">
             <p className="text-xs text-neutral-400">{hoveredShot.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};
