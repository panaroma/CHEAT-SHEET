import React, { useState } from 'react';
import shotsData from '../data/shots.json';
import { Camera, ChevronDown, ChevronRight } from 'lucide-react';

interface Shot {
  id: string;
  name: string;
  description: string;
  gifUrl: string;
}

interface Category {
  id: string;
  title: string;
  items: Shot[];
}

export const CheatSheet: React.FC = () => {
  const [hoveredShot, setHoveredShot] = useState<Shot | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['sizes', 'angles', 'movement']));

  const categories = (shotsData as any).categories as Category[];

  const toggleCategory = (id: string) => {
    const newSet = new Set(expandedCategories);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setExpandedCategories(newSet);
  };

  const handleMouseMove = (e: React.MouseEvent, shot: Shot) => {
    // Calculate position to keep tooltip on screen
    // We want it to the left of the cursor if we are on the right side of the screen
    const x = e.clientX - 290; // Show to the left of cursor
    const y = e.clientY - 100;
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

      <div className="flex-1 overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-transparent">
        {categories.map((category) => (
          <div key={category.id} className="border-b border-neutral-800 last:border-0 pb-2">
            <button
              onClick={() => toggleCategory(category.id)}
              className="w-full flex items-center justify-between py-2 text-neutral-300 hover:text-white font-medium transition-colors"
            >
              <span>{category.title}</span>
              {expandedCategories.has(category.id) ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>

            {expandedCategories.has(category.id) && (
              <div className="space-y-1 mt-1">
                {category.items.map((shot) => (
                  <div
                    key={shot.id}
                    className="group relative px-3 py-2 rounded-lg hover:bg-neutral-800 cursor-help transition-all"
                    onMouseMove={(e) => handleMouseMove(e, shot)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-neutral-400 group-hover:text-neutral-200 transition-colors">
                        {shot.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Floating Tooltip */}
      {hoveredShot && (
        <div
          className="fixed z-50 pointer-events-none bg-black rounded-lg shadow-2xl border border-neutral-700 w-72 overflow-hidden"
          style={{
            left: Math.max(10, position.x), // Prevent going off left edge
            top: Math.max(10, Math.min(position.y, window.innerHeight - 250)) // Keep vertically in bounds
          }}
        >
          <div className="relative aspect-video bg-neutral-800">
             <img
               src={hoveredShot.gifUrl}
               alt={hoveredShot.name}
               className="w-full h-full object-cover"
               loading="eager"
             />
             <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3 pt-6">
               <p className="text-white text-base font-bold shadow-black drop-shadow-md">{hoveredShot.name}</p>
             </div>
          </div>
          <div className="p-3 bg-neutral-900 border-t border-neutral-800">
             <p className="text-xs text-neutral-300 leading-relaxed">{hoveredShot.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};
