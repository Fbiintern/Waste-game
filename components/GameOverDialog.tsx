import React from 'react';
import { usePrivy } from '@privy-io/react-auth';
import styles from '../pages/Home.module.css';

interface GameOverDialogProps {
  score: number;
  correctBin: string | null;
  onPlayAgain: () => void;
  isGuestMode: boolean;
  updateGuestMode: (newGuestMode: boolean) => void;
}

const GameOverDialog: React.FC<GameOverDialogProps> = ({ score, correctBin, onPlayAgain, isGuestMode, updateGuestMode }) => {
  const { login } = usePrivy();

  const handleLogin = async () => {
    await login();
    updateGuestMode(false);
  };

  const shareOnWarpcast = () => {
    const shareText = `I picked up ${score} waste items, how many can you?`;
    const warpcastUrl = `https://warpcast.com/~/compose?text=${encodeURIComponent(shareText)}&embeds%5B%5D=https://frame.town/fammywzm`;
    window.open(warpcastUrl, '_blank');
  };

  return (
    <div className={styles.dialogOverlay}>
      <div className={styles.dialogContent}>
        <h2 className={styles.dialogText}>Game Over</h2>
        <p className={styles.dialogText}>Your score: {score}</p>
        {correctBin && (
          <p className={styles.dialogText}>The correct bin was: {correctBin.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</p>
        )}
        {isGuestMode && (
          <p className={`${styles.dialogText} guest-mode-warning`}>Playing as guest. Your score won't be saved.</p>
        )}
        <div className="button-container">
          <button onClick={onPlayAgain} className={`${styles.gameButton} ${styles.green} ${styles.smallButton}`}>Play Again</button>
          {isGuestMode && (
            <button onClick={handleLogin} className={`${styles.gameButton} ${styles.orange} ${styles.smallButton}`}>Login to Save Score</button>
          )}
          {!isGuestMode && (
            <button onClick={shareOnWarpcast} className={`${styles.gameButton} ${styles.purple} ${styles.smallButton}`}>
              <span className="share-text">Share</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameOverDialog;
