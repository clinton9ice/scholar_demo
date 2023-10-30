import { createClient } from '@supabase/supabase-js'

const supaBaseUrl = 'https://bqehqardzmtamykrvdvl.supabase.co'
const supaBaseKey = process.env.VITE_SUPABASE_KEY!

const supaBase = createClient(supaBaseUrl, supaBaseKey)
export { supaBase }
