import React from 'react';

interface GameOverDialogProps {
  score: number;
  correctBin: string | null;
  onPlayAgain: () => void;
}

const GameOverDialog: React.FC<GameOverDialogProps> = ({ score, correctBin, onPlayAgain }) => (
  <div className="game-over-overlay">
    <div className="game-over-dialog">
      <h2>Game Over</h2>
      <p>Your score: {score}</p>
      {correctBin && (
        <p>The correct bin was: {correctBin.replace("-", " ").toUpperCase()}</p>
      )}
      <button onClick={onPlayAgain}>Play Again</button>
    </div>
  </div>
);

export default GameOverDialog;
