
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
console.log('ANON KEY first 20:', supabaseAnonKey?.slice(0, 20))

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase env vars missing. Check your .env file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
