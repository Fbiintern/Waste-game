import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { address, farcasterUsername } = req.body;

  if (!address) {
    return res.status(400).json({ message: 'Invalid request body' });
  }

  try {
    // First, check if the user already exists in the leaderboard
    const { data, error: fetchError } = await supabase
      .from('leaderboard')
      .select('score')
      .eq('address', address)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      throw fetchError;
    }

    const currentScore = data?.score || 0;

    // Now, upsert the row with the existing score (or 0 if it's a new user)
    const { error } = await supabase
      .from('leaderboard')
      .upsert(
        { 
          address, 
          farcaster_username: farcasterUsername,
          score: currentScore
        }, 
        { onConflict: 'address' }
      );

    if (error) throw error;

    return res.status(200).json({ message: 'Farcaster username updated successfully' });
  } catch (error) {
    console.error('Error updating Farcaster username:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
