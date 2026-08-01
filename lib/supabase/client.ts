import { createBrowserClient } from '@supabase/ssr'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let client: ReturnType<typeof createBrowserClient<any>> | undefined

/**
 * Some Chrome extensions block cross-origin PATCH to *.supabase.co
 * (GET/POST/DELETE still work). Route PATCH through our same-origin API.
 */
function createPatchedFetch(supabaseUrl: string): typeof fetch {
  return async (input, init) => {
    const target =
      typeof input === 'string' ? input : input instanceof URL ? input.href : input.url
    const method = (init?.method ?? (input instanceof Request ? input.method : 'GET')).toUpperCase()
    const isSupabaseRest = target.startsWith(`${supabaseUrl}/rest/v1/`)

    if (method === 'PATCH' && isSupabaseRest) {
      const path = target.slice(supabaseUrl.length)
      const headerObj = init?.headers
        ? Object.fromEntries(new Headers(init.headers).entries())
        : {}
      return fetch('/api/supabase-rest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          method: 'PATCH',
          path,
          body: typeof init?.body === 'string' ? init.body : null,
          headers: headerObj,
        }),
      })
    }

    return fetch(input, init)
  }
}

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
    client = createBrowserClient(url, key, { global: { fetch: createPatchedFetch(url) } })
  }
  return client
}

export function hasSupabaseEnv() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
}
