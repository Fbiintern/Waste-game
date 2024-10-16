import React from 'react';
import { usePrivy } from '@privy-io/react-auth';
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
    <div className={styles.dialogOverlay}>
      <div className={styles.dialogContent}>
        <h2 className={styles.dialogTitle}>Congratulations!</h2>
        <p className={styles.dialogText}>You've filled the {completedBin.replace('-', ' ')} bin!</p>
        <p className={styles.dialogScore}>Score: {score}</p>
        {isGuestMode && (
          <div className={styles.guestModeWarning}>
            <p>Playing as guest. Your score won't be saved.</p>
            <button onClick={login} className={`${styles.gameButton} ${styles.orange} ${styles.smallButton}`}>Login to Save Score</button>
          </div>
        )}
        <div className={styles.stackedButtons}>
          <button onClick={onContinue} className={`${styles.gameButton} ${styles.green} ${styles.fullWidth}`}>Keep Playing</button>
          <button onClick={onRestart} className={`${styles.gameButton} ${styles.red} ${styles.fullWidth}`}>Restart Game</button>
          {!isGuestMode && (
            <button onClick={shareOnWarpcast} className={`${styles.gameButton} ${styles.purple} ${styles.fullWidth}`}>
              Share
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WinnerDialog;
