import React from 'react';

interface WinnerDialogProps {
  score: number;
  completedBin: string;
  onContinue: () => void;
  onRestart: () => void;
}

const WinnerDialog: React.FC<WinnerDialogProps> = ({ score, completedBin, onContinue, onRestart }) => {
  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <h2>Congratulations!</h2>
        <p>You've filled the {completedBin.replace('-', ' ')} bin!</p>
        <p>Your current score: {score}</p>
        <div className="dialog-buttons">
          <button onClick={onContinue}>Keep Playing</button>
          <button onClick={onRestart}>Restart Game</button>
        </div>
      </div>
    </div>
  );
};

export default WinnerDialog;
