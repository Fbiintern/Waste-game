import React from 'react';  
import { WasteItemType, Difficulty } from '../pages/index';
import styles from '../pages/Home.module.css';

interface WasteItemProps extends WasteItemType {
  onTouchDrop: (item: WasteItemType, x: number, y: number) => void;
}

const WasteItem: React.FC<WasteItemProps> = ({ name, category, difficulty, onTouchDrop }) => {
  let isDragging = false;
  let startPos = { x: 0, y: 0 };

  const handleTouchStart = (e: React.TouchEvent) => {
    isDragging = true;
    startPos = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault(); // Prevent scrolling while dragging
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging) return;
    isDragging = false;
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    
    // Only trigger onTouchDrop if the item has been moved
    if (Math.abs(endX - startPos.x) > 10 || Math.abs(endY - startPos.y) > 10) {
      onTouchDrop({ name, category, difficulty }, endX, endY);
    }
  };

  const preventClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <div 
      className={styles.wasteItem} 
      draggable 
      onDragStart={(e) => e.dataTransfer.setData('text/plain', JSON.stringify({ name, category, difficulty }))}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={preventClick} // Prevent click events
      style={{ userSelect: 'none', cursor: 'move' }} // Disable text selection and change cursor
    >
      {name}
    </div>
  );
};

export default WasteItem;
