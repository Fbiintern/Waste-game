import React, { useState } from 'react';
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
  const { login, authenticated } = usePrivy();
  const [showNFTEmbed, setShowNFTEmbed] = useState(false);

  const handleLogin = async () => {
    await login();
    updateGuestMode(false);
  };

  const shareOnWarpcast = () => {
    const shareText = `I filled the ${completedBin.replace('-', ' ')} bin and scored ${score} points in How Wasted Are You?!`;
    const warpcastUrl = `https://warpcast.com/~/compose?text=${encodeURIComponent(shareText)}&embeds%5B%5D=https://frame.town/fammywzm`;
    window.open(warpcastUrl, '_blank');
  };

  const mintWinnerNFT = () => {
    setShowNFTEmbed(true);
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
        {authenticated && !isGuestMode && (
          <div className={styles.authenticatedButtons}>
            <button onClick={shareOnWarpcast} className={`${styles.gameButton} ${styles.purple} ${styles.smallButton}`}>
              <span className={styles.shareText}>Share on Warpcast</span>
            </button>
            <button onClick={mintWinnerNFT} className={`${styles.gameButton} ${styles.blue} ${styles.smallButton}`}>
              <span className={styles.shareText}>Claim Winner's NFT</span>
            </button>
          </div>
        )}
        {showNFTEmbed && (
          <div className={styles.nftEmbed}>
            <div style={{position:'relative',width:'100%',paddingTop:'calc(100% + 72px)'}}>
              <iframe 
                src="https://zora.co/collect/base:0x70a34574b9a6b12ca1a4e35807bb64f9cef795a1/1/embed?referrer=0x791D41b061891e7701461D672a0989abF1bc4005" 
                style={{border:0,backgroundColor:'transparent',position:'absolute',inset:0}}
                width="100%" 
                height="100%" 
                allowTransparency={true}
                allowFullScreen={true}
                sandbox="allow-pointer-lock allow-same-origin allow-scripts allow-popups"
              ></iframe>
            </div>
            <a 
              href="https://zora.co/collect/base:0x70a34574b9a6b12ca1a4e35807bb64f9cef795a1/1" 
              className={styles.nftLink}
            >
              Badge of Pride on Zora
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default WinnerDialog;
