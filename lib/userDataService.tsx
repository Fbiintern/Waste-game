import { supabase } from './supabase'

export async function saveUserScore(address: string, score: number) {
  const { error } = await supabase
    .from('user_scores')
    .upsert({ address, score }, { onConflict: 'address' })

  if (error) {
    console.error('Error saving user score:', error)
    return false
  }
  return true
}

