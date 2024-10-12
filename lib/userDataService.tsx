import { supabase } from './supabase'

export async function saveUserScore(address: string, score: number) {
  try {
    // Fetch the current user data
    const { data: userData, error: fetchError } = await supabase
      .from('user_scores')
      .select('score')
      .eq('address', address)
      .single()

    if (fetchError && fetchError.code !== 'PGRST116') {
      // PGRST116 means no rows returned, which is fine for new users
      console.error('Error fetching user score:', fetchError)
      return false
    }

    // Compare the new score with the existing highest score
    const highestScore = Math.max(userData?.score || 0, score)

    // Update the user's highest score in the database
    const { error: updateError } = await supabase
      .from('user_scores')
      .upsert({ address, score: highestScore }, { onConflict: 'address' })

    if (updateError) {
      console.error('Error updating user score:', updateError)
      return false
    }

    return true
  } catch (error) {
    console.error('Unexpected error saving user score:', error)
    return false
  }
}
