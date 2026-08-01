import { NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase/server'
import { ROUTES } from '@/lib/constants'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? ROUTES.dashboard

  if (code) {
    const supabase = await getSupabaseServerClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      if (next === ROUTES.resetPassword || next.startsWith(`${ROUTES.resetPassword}?`)) {
        return NextResponse.redirect(`${origin}${ROUTES.resetPassword}`)
      }
      return NextResponse.redirect(`${origin}${ROUTES.dashboard}`)
    }
  }

  return NextResponse.redirect(`${origin}${ROUTES.login}?error=auth_callback_error`)
}
