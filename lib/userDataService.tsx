import { supabase } from './supabase'

export const saveUserScore = async (userId: string, score: number, farcasterUsername: string | null) => {
  // First, get the current score for the user
  const { data, error: fetchError } = await supabase
    .from('leaderboard')
    .select('score')
    .eq('address', userId)
    .single()

  if (fetchError && fetchError.code !== 'PGRST116') {
    console.error('Error fetching current score:', fetchError)
    return
  }

  const currentScore = data?.score || 0

  // Only update if the new score is higher
  if (score > currentScore) {
    const { error: upsertError } = await supabase
      .from('leaderboard')
      .upsert(
        { 
          address: userId, 
          score, 
          farcaster_username: farcasterUsername
        }, 
        { onConflict: 'address' }
      )

    if (upsertError) {
      console.error('Error saving score:', upsertError)
    }
  } else {
    console.log('New score not higher than current best. Score not updated.')
  }
}

export const saveFarcasterUsername = async (address: string, farcasterUsername: string | null) => {
  try {
    const response = await fetch('/api/updateFarcasterUsername', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ address, farcasterUsername }),
    });
    if (!response.ok) {
      throw new Error('Failed to update Farcaster username');
    }
  } catch (err) {
    console.error('Error saving Farcaster username:', err);
  }
};
