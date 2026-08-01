import { createBrowserClient } from '@supabase/ssr'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let client: ReturnType<typeof createBrowserClient<any>> | undefined

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getSupabaseBrowserClient(): ReturnType<typeof createBrowserClient<any>> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. Copy .env.example to .env.local.'
    )
  }

  if (!client) {
    client = createBrowserClient(url, key)
  }
  return client
}

export function hasSupabaseEnv() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
}
