import { NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase/server'

const ALLOWED = new Set(['PATCH', 'POST', 'PUT', 'DELETE'])
const NULL_BODY_STATUS = new Set([204, 205, 304])
const FORWARD_HEADERS = [
  'prefer',
  'accept',
  'accept-profile',
  'content-profile',
  'x-client-info',
] as const

/**
 * Same-origin bridge for REST writes. Some browser extensions block
 * cross-origin PATCH to *.supabase.co while leaving GET/POST/DELETE alone.
 * The browser posts here; we forward with the caller's session.
 */
export async function POST(request: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!supabaseUrl || !anonKey) {
    return NextResponse.json({ error: 'Supabase is not configured' }, { status: 500 })
  }

  let payload: {
    method?: string
    path?: string
    body?: string | null
    headers?: Record<string, string>
  }
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const method = (payload.method ?? '').toUpperCase()
  const path = payload.path ?? ''
  if (!ALLOWED.has(method) || !path.startsWith('/rest/v1/')) {
    return NextResponse.json({ error: 'Unsupported method or path' }, { status: 400 })
  }

  const supabase = await getSupabaseServerClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session?.access_token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const forwardHeaders = new Headers({
    apikey: anonKey,
    Authorization: `Bearer ${session.access_token}`,
    'Content-Type': 'application/json',
  })
  for (const key of FORWARD_HEADERS) {
    const match = payload.headers
      ? Object.entries(payload.headers).find(([name]) => name.toLowerCase() === key)
      : undefined
    if (match?.[1]) forwardHeaders.set(key, match[1])
  }

  const upstream = await fetch(`${supabaseUrl}${path}`, {
    method,
    headers: forwardHeaders,
    body: payload.body ?? undefined,
  })

  // 204/205/304 are null-body statuses; attaching a body to them throws.
  if (NULL_BODY_STATUS.has(upstream.status)) {
    return new NextResponse(null, { status: upstream.status })
  }

  const text = await upstream.text()
  return new NextResponse(text, {
    status: upstream.status,
    headers: {
      'Content-Type': upstream.headers.get('Content-Type') ?? 'application/json',
    },
  })
}
