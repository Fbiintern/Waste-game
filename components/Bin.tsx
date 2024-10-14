import React from 'react';
import { WasteItemType } from '../pages/index';

interface BinProps {
  category: string;
  onDrop: (item: WasteItemType, binCategory: string) => void;
  fillLevel: number;
  isCorrectBin: boolean;
  isTooltipActive: boolean;
  onTooltipToggle: (category: string) => void;
}

const getBinColor = (category: string): string => {
  switch(category) {
    case 'wet-waste': return 'rgba(0, 128, 0, 0.5)'; // Green
    case 'dry-waste': return 'rgba(0, 0, 255, 0.5)'; // Blue
    case 'hazardous-waste': return 'rgba(255, 0, 0, 0.5)'; // Red
    case 'sanitary-waste': return 'rgba(255, 165, 0, 0.5)'; // Orange
    case 'e-waste': return 'rgba(128, 0, 128, 0.5)'; // Purple
    default: return 'rgba(200, 200, 200, 0.5)'; // Grey
  }
};

const getBinDescription = (category: string): string => {
  switch(category) {
    case 'wet-waste': return 'For biodegradable waste like food scraps and plant matter.';
    case 'dry-waste': return 'For recyclable materials like paper, plastic, and metal.';
    case 'hazardous-waste': return 'For dangerous materials like chemicals and batteries.';
    case 'sanitary-waste': return 'For personal hygiene products and medical waste.';
    case 'e-waste': return 'For electronic devices and components.';
    default: return 'Unknown waste category';
  }
};

const Bin: React.FC<BinProps> = ({ 
  category, 
  onDrop, 
  fillLevel, 
  isCorrectBin, 
  isTooltipActive, 
  onTooltipToggle 
}) => {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const item = JSON.parse(e.dataTransfer.getData("text")) as WasteItemType;
    onDrop(item, category);
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onTooltipToggle(category);
  };

  const binColor = getBinColor(category);
  const binDescription = getBinDescription(category);

  return (
    <div className="bin-wrapper" onDoubleClick={handleDoubleClick}>
      <div 
        className={`bin ${isCorrectBin ? 'correct-bin' : ''}`}
        style={{ backgroundColor: binColor }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <div className="fill-level" style={{ height: `${fillLevel}%` }}></div>
        <div className="bin-label">{category.replace('-', ' ')}</div>
      </div>
      {isTooltipActive && (
        <div className="tooltip">
          <p>{binDescription}</p>
        </div>
      )}
    </div>
  );
};

export default Bin;
