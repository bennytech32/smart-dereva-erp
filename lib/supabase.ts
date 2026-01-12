import { createClient } from '@supabase/supabase-js'

// 1. I have put your REAL Project URL here:
const supabaseUrl = 'https://pfxgydspzdiblxsvvrbx.supabase.co'

// 2. You must paste the long "anon public" key from the dashboard here:
const supabaseKey = 'sb_publishable_1na1riXPSARc4VKuyDy9ww_yExRk3cy'

export const supabase = createClient(supabaseUrl, supabaseKey)