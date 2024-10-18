import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { userId, score, farcasterUsername } = req.body;

  if (!userId || typeof score !== 'number') {
    return res.status(400).json({ message: 'Invalid request body' });
  }

  try {
    // First, get the current score for the user
    const { data, error: fetchError } = await supabase
      .from('leaderboard')
      .select('score')
      .eq('address', userId)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      throw fetchError;
    }

    const currentScore = data?.score || 0;

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
        );

      if (upsertError) {
        throw upsertError;
      }

      return res.status(200).json({ message: 'Score updated successfully' });
    } else {
      return res.status(200).json({ message: 'Score not updated (not higher than current best)' });
    }
  } catch (error) {
    console.error('Error updating score:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

