import React from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

interface NavbarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onPageChange }) => {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={currentPage === 'play' ? styles.active : ''}>
          <button onClick={() => onPageChange('play')}>Play</button>
        </li>
        <li className={currentPage === 'about' ? styles.active : ''}>
          <button onClick={() => onPageChange('about')}>About</button>
        </li>
        <li className={currentPage === 'leaderboard' ? styles.active : ''}>
          <button onClick={() => onPageChange('leaderboard')}>Leaderboard</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;