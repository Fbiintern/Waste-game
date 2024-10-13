// components/Leaderboard.tsx
import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import styles from './Leaderboard.module.css'

interface LeaderboardEntry {
  address: string
  score: number
}

export const Leaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetchLeaderboard()
  }, [])

  const fetchLeaderboard = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('leaderboard')
        .select('address, score')
        .order('score', { ascending: false })
        .limit(10)

      if (error) throw error

      setLeaderboard(data || [])
    } catch (err) {
      setError('Failed to fetch leaderboard')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className={styles.leaderboardContainer}>
    <button 
      className={styles.toggleButton}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {isExpanded ? 'Hide Leaderboard' : 'Show Leaderboard'}
    </button>
    {isExpanded && (
      <div className={styles.leaderboardContent}>
        <h3>Try to take the crown 👑</h3>
        <table className={styles.leaderboardTable}>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Address</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.slice(0, showAll ? leaderboard.length : 5).map((entry, index) => (
              <tr key={index}>
                <td className={styles.rank}>{index + 1}</td>
                <td className={styles.address}>{truncateAddress(entry.address)}</td>
                <td className={styles.score}>{entry.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {leaderboard.length > 5 && (
          <button 
            className={styles.showMoreButton}
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Show Less' : 'Show More'}
          </button>
        )}
      </div>
    )}
  </div>
);
};

export default Leaderboard;