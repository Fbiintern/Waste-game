import React from 'react';
import { usePrivy } from '@privy-io/react-auth';

interface WinnerDialogProps {
  score: number;
  completedBin: string;
  onContinue: () => void;
  onRestart: () => void;
  isGuestMode: boolean;
}

const WinnerDialog: React.FC<WinnerDialogProps> = ({ score, completedBin, onContinue, onRestart, isGuestMode }) => {
  const { login } = usePrivy();

  const shareOnWarpcast = () => {
    const shareText = `I filled the ${completedBin.replace('-', ' ')} bin and scored ${score} points in How Wasted Are You?!`;
    const warpcastUrl = `https://warpcast.com/~/compose?text=${encodeURIComponent(shareText)}&embeds%5B%5D=https://frame.town/fammywzm`;
    window.open(warpcastUrl, '_blank');
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <h2>Congratulations!</h2>
        <p>You've filled the {completedBin.replace('-', ' ')} bin!</p>
        <p>Your current score: {score}</p>
        {isGuestMode && (
          <>
            <p className="guest-mode-warning">Playing as guest. Your score won't be saved.</p>
            <button onClick={login} className="login-button">Login to Save Score</button>
          </>
        )}
        <div className="dialog-buttons">
          <button onClick={onContinue}>Keep Playing</button>
          <button onClick={onRestart}>Restart Game</button>
          {!isGuestMode && (
            <button onClick={shareOnWarpcast} className="share-button">
              Share on Warpcast
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WinnerDialog;
