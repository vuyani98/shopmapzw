import { createClient, type SupabaseClient } from "@supabase/supabase-js"

/**
 * Environment-driven configuration.
 *
 * Add these to a .env.local file *before* going live:
 * NEXT_PUBLIC_SUPABASE_URL="https://xxx.supabase.co"
 * NEXT_PUBLIC_SUPABASE_ANON_KEY="public-anon-key"
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// If either variable is missing we return null.
// The UI will gracefully fall back to demo data.
export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null
