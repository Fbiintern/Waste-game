import React from 'react';
import Image from 'next/image';
import { usePrivy } from '@privy-io/react-auth';
import styles from '../pages/Home.module.css';

interface GameOverDialogProps {
  score: number;
  correctBin: string | null;
  onPlayAgain: () => void;
  isGuestMode: boolean;
}

const GameOverDialog: React.FC<GameOverDialogProps> = ({ score, correctBin, onPlayAgain, isGuestMode }) => {
  const { login } = usePrivy();

  const shareOnWarpcast = () => {
    const shareText = `I picked up ${score} waste items in How Wasted Are You?! Can you beat my score?`;
    const warpcastUrl = `https://warpcast.com/~/compose?text=${encodeURIComponent(shareText)}&embeds%5B%5D=https://frame.town/fammywzm`;
    window.open(warpcastUrl, '_blank');
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <h2>Game Over</h2>
        <p className="dialog-score">Your score: {score}</p>
        {correctBin && (
          <p>Correct bin: {correctBin.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</p>
        )}
        {isGuestMode ? (
          <>
            <div className="guest-mode-warning">
              <p>Playing as guest. Your score won't be saved.</p>
              <button onClick={login} className={`${styles.gameButton} ${styles.orange} ${styles.smallButton}`}>Login to Save Score</button>
            </div>
            <div className={styles.centeredPlayAgain}>
              <button onClick={onPlayAgain} className={`${styles.gameButton} ${styles.green} ${styles.smallButton}`}>Play Again</button>
            </div>
          </>
        ) : (
          <div className="dialog-buttons">
            <button onClick={onPlayAgain} className={`${styles.gameButton} ${styles.green} ${styles.smallButton}`}>Play Again</button>
            <button onClick={shareOnWarpcast} className={`${styles.gameButton} ${styles.red} ${styles.smallButton}`}>
              <span>Share</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameOverDialog;
