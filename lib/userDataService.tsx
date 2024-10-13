import { supabase } from './supabase'

export const saveUserScore = async (address: string, score: number) => {
  const { data, error } = await supabase
    .from('leaderboard')
    .upsert({ address, score }, { onConflict: 'address' })

  if (error) {
    console.error('Error saving score:', error)
  } else {
    console.log('Score saved successfully')
  }
}
