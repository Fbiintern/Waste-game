import { supabase } from './supabase'

export const saveUserScore = async (userId: string, score: number, farcasterUsername: string | null) => {
  const { error } = await supabase
    .from('leaderboard')
    .upsert(
      { 
        address: userId, 
        score, 
        farcaster_username: farcasterUsername
      }, 
      { onConflict: 'address' }
    )

  if (error) {
    console.error('Error saving score:', error)
  }
}
