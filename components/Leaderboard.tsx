// components/Leaderboard.tsx
import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import styles from './Leaderboard.module.css'
import { usePrivy } from '@privy-io/react-auth'
import { useWalletClient } from 'wagmi'
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'
import { getEnsName } from 'viem/ens'

interface LeaderboardEntry {
  address: string
  score: number
  ensName: string | null
  farcasterUsername: string | null
}

export const Leaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = usePrivy()
  const { data: walletClient } = useWalletClient()

  const publicClient = createPublicClient({
    chain: mainnet,
    transport: http()
  })

  useEffect(() => {
    fetchLeaderboard()
  }, [])

  const fetchLeaderboard = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('leaderboard')
        .select('address, score, farcaster_username')
        .order('score', { ascending: false })
        .limit(10)

      if (error) throw error

      const leaderboardWithNames = await Promise.all(
        (data || []).map(async (entry) => {
          let ensName = null
          try {
            ensName = await getEnsName(publicClient, { address: entry.address as `0x${string}` })
          } catch (error) {
            console.error('Error fetching ENS name:', error)
          }
          return {
            ...entry,
            ensName,
            farcasterUsername: entry.farcaster_username
          }
        })
      )

      setLeaderboard(leaderboardWithNames)
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

  const isCurrentUser = (address: string) => {
    return user?.wallet?.address?.toLowerCase() === address.toLowerCase();
  };

  const displayName = (entry: LeaderboardEntry) => {
    if (entry.ensName) return entry.ensName
    if (entry.farcasterUsername) return entry.farcasterUsername
    return truncateAddress(entry.address)
  };

  return (
    <div className={styles.leaderboardContainer}>
      <div className={styles.leaderboardContent}>
        <h2>Leaderboard</h2>
        <table className={styles.leaderboardTable}>
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, index) => (
              <tr key={index} className={isCurrentUser(entry.address) ? styles.currentUser : ''}>
                <td className={styles.rank}>{index + 1}</td>
                <td className={styles.address}>
                  {displayName(entry)}
                  {isCurrentUser(entry.address) && <span className={styles.youIndicator}> (You)</span>}
                </td>
                <td className={styles.score}>{entry.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
