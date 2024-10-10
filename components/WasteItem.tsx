import React, { useState } from 'react';
import { WasteItemType } from '../pages/index';

const WasteItem: React.FC<WasteItemType> = ({ name, category }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text/plain", JSON.stringify({ name, category }));
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    const div = e.currentTarget;
    const rect = div.getBoundingClientRect();
    div.style.position = 'fixed';
    div.style.left = `${touch.clientX - rect.width / 2}px`;
    div.style.top = `${touch.clientY - rect.height / 2}px`;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    const div = e.currentTarget;
    div.style.left = `${touch.clientX - div.offsetWidth / 2}px`;
    div.style.top = `${touch.clientY - div.offsetHeight / 2}px`;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const div = e.currentTarget;
    div.style.position = 'static';
    setIsDragging(false);
    // Here you would implement the logic to check if the item is over a bin
    // and call the appropriate function to handle the drop
  };

  return (
    <div 
      className={`waste-item ${isDragging ? 'dragging' : ''}`}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {name}
    </div>
  );
};

export default WasteItem;