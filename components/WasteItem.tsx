import React, { useRef } from 'react';
import { WasteItemType } from '../pages/index';

const WasteItem: React.FC<WasteItemType & { onTouchDrop: (item: WasteItemType) => void }> = ({ name, category, onTouchDrop }) => {
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text/plain", JSON.stringify({ name, category }));
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = '0.5';
    }
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = '1';
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartRef.current) {
      const touch = e.changedTouches[0];
      const diffX = Math.abs(touch.clientX - touchStartRef.current.x);
      const diffY = Math.abs(touch.clientY - touchStartRef.current.y);
      
      if (diffX < 20 && diffY < 20) {
        onTouchDrop({ name, category });
      }
    }
    touchStartRef.current = null;
  };

  return (
    <div 
      className="waste-item"
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {name}
    </div>
  );
};

export default WasteItem;