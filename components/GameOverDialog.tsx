import React from 'react';
import Image from 'next/image';

interface GameOverDialogProps {
  score: number;
  correctBin: string | null;
  onPlayAgain: () => void;
}

const GameOverDialog: React.FC<GameOverDialogProps> = ({ score, correctBin, onPlayAgain }) => {
  const shareOnWarpcast = () => {
    const shareText = `I picked up ${score} waste items, how many can you?`;
    const warpcastUrl = `https://warpcast.com/~/compose?text=${encodeURIComponent(shareText)}&embeds%5B%5D=https://frame.town/fammywzm`;
    window.open(warpcastUrl, '_blank');
  };

  return (
    <div className="game-over-overlay">
      <div className="game-over-dialog">
        <h2>Game Over</h2>
        <p>Your score: {score}</p>
        {correctBin && (
          <p>The correct bin was: {correctBin.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</p>
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
