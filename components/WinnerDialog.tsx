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
  updateGuestMode: (newGuestMode: boolean) => void;
}

const WinnerDialog: React.FC<WinnerDialogProps> = ({ score, completedBin, onContinue, onRestart, isGuestMode, updateGuestMode }) => {
  const { login } = usePrivy();

  const handleLogin = async () => {
    await login();
    updateGuestMode(false);
  };

  const shareOnWarpcast = () => {
    const shareText = `I filled the ${completedBin.replace('-', ' ')} bin and scored ${score} points in How Wasted Are You?!`;
    const warpcastUrl = `https://warpcast.com/~/compose?text=${encodeURIComponent(shareText)}&embeds%5B%5D=https://frame.town/fammywzm`;
    window.open(warpcastUrl, '_blank');
  };

  return (
    <div className={styles.dialogOverlay}>
      <div className={styles.dialogContent}>
        <h2 className={`${styles.dialogTitle} ${styles.dialogText}`}>Congratulations!</h2>
        <p className={styles.dialogText}>You've filled the {completedBin.replace('-', ' ')} bin!</p>
        <p className={`${styles.dialogScore} ${styles.dialogText}`}>Your current score: {score}</p>
        {isGuestMode && (
          <button onClick={handleLogin} className={`${styles.gameButton} ${styles.orange} ${styles.smallButton}`}>
            Login to Save Score
          </button>
        )}
        <div className={styles.dialogButtons}>
          <button onClick={onContinue} className={`${styles.gameButton} ${styles.green}`}>Keep Playing</button>
          <button onClick={onRestart} className={`${styles.gameButton} ${styles.red}`}>Restart Game</button>
        </div>
        {!isGuestMode && (
          <button onClick={shareOnWarpcast} className={`${styles.gameButton} ${styles.purple} ${styles.smallButton}`}>
            <span className={styles.shareText}>Share on Warpcast</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default WinnerDialog;
