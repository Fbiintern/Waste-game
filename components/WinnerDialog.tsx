import React from 'react';
import { usePrivy } from '@privy-io/react-auth';
import Image from 'next/image';
import styles from '../pages/Home.module.css';

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
            <button onClick={login} className={`${styles.gameButton} ${styles.orange} ${styles.smallButton}`}>Login to Save Score</button>
          </>
        )}
        <div className="dialog-buttons">
          <button onClick={onContinue} className={`${styles.gameButton} ${styles.green} ${styles.smallButton}`}>Keep Playing</button>
          <button onClick={onRestart} className={`${styles.gameButton} ${styles.red} ${styles.smallButton}`}>Restart Game</button>
          {!isGuestMode && (
            <button onClick={shareOnWarpcast} className={`${styles.gameButton} ${styles.orange} ${styles.smallButton}`}>
              <Image src="/warpcast-logo.png" alt="Warpcast" width={10} height={10} />
              <span className="share-text">Share</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WinnerDialog;