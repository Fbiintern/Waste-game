import React from 'react';  
import { WasteItemType, Difficulty } from '../pages/index';
import styles from '../pages/Home.module.css';

interface WasteItemProps extends WasteItemType {
  onTouchDrop: (item: WasteItemType) => void;
}

const WasteItem: React.FC<WasteItemProps> = ({ name, category, difficulty, onTouchDrop }) => {
  return (
    <div 
      className={styles.wasteItem} 
      draggable 
      onDragStart={(e) => e.dataTransfer.setData('text/plain', JSON.stringify({ name, category, difficulty }))}
      onTouchEnd={() => onTouchDrop({ name, category, difficulty })}
    >
      {name}
    </div>
  );
};

export default WasteItem;
