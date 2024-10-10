import React from 'react';

interface WinnerDialogProps {
  score: number;
  onClose: () => void;
}

const WinnerDialog: React.FC<WinnerDialogProps> = ({ score, onClose }) => {
  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <h2>Congratulations!</h2>
        <p>You've filled a bin and won the game!</p>
        <p>Your score: {score}</p>
        <button onClick={onClose}>Play Again</button>
      </div>
    </div>
  );
};

export default WinnerDialog;
