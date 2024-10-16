import React from 'react';
import styles from './SpeechBubble.module.css';

interface SpeechBubbleProps {
  message: string;
  position: 'top' | 'right' | 'bottom' | 'left';
}

const SpeechBubble: React.FC<SpeechBubbleProps> = ({ message, position }) => {
  return (
    <div className={`${styles.bubble} ${styles[position]}`}>
      {message}
    </div>
  );
};

export default SpeechBubble;

