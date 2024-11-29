import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey)

// function loginWithGoogle(){
//     const { data, error } = await supabase.auth.signInWithOAuth({
//         provider: 'google'
//       })
// }

// function logout(){
//     const { error } = await supabase.auth.signOut()
// }

export default supabase
