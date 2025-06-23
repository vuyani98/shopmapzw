import { createClient } from "@supabase/supabase-js"

// These would be your actual Supabase credentials
const supabaseUrl = "https://your-project.supabase.co"
const supabaseKey = "your-anon-key"

export const supabase = createClient(supabaseUrl, supabaseKey)
