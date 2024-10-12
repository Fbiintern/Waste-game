import React from 'react';
import Image from 'next/image';

interface GameOverDialogProps {
  score: number;
  correctBin: string | null;
  onPlayAgain: () => void;
}

const GameOverDialog: React.FC<GameOverDialogProps> = ({ score, correctBin, onPlayAgain }) => {
  const shareOnWarpcast = () => {
    const shareText = `I could collect ${score} waste items, try to beat my score!`;
    const warpcastUrl = `https://warpcast.com/~/compose?text=${encodeURIComponent(shareText)}`;
    window.open(warpcastUrl, '_blank');
  };

  return (
    <div className="game-over-overlay">
      <div className="game-over-dialog">
        <h2>Game Over</h2>
        <p>Your score: {score}</p>
        {correctBin && (
          <p>The correct bin was: {correctBin.replace("-", " ").toUpperCase()}</p>
        )}
        <div className="button-container">
          <button onClick={onPlayAgain} className="play-again-button">Play Again</button>
          <button onClick={shareOnWarpcast} className="share-button">
            <Image src="/warpcast-logo.png" alt="Warpcast" width={20} height={20} />
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOverDialog;
