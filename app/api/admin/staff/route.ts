import { NextResponse } from 'next/server'
import { getSupabaseAdminClient } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/api/require-admin'
import { createStaffSchema } from '@/lib/validations/auth'

export async function POST(request: Request) {
  const auth = await requireAdmin()
  if (auth.error) return auth.error

  const body = await request.json()
  const parsed = createStaffSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ message: parsed.error.issues[0]?.message ?? 'Invalid input' }, { status: 400 })
  }

  const { fullName, email, password, role } = parsed.data

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
  if (!serviceKey || serviceKey === anonKey) {
    return NextResponse.json(
      {
        message:
          'SUPABASE_SERVICE_ROLE_KEY is missing or invalid. Copy the service_role key from Supabase Project Settings → API.',
      },
      { status: 500 }
    )
  }

  const adminClient = await getSupabaseAdminClient()

  const { data: newUser, error: createError } = await adminClient.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name: fullName, role },
  })

  if (createError) {
    return NextResponse.json({ message: createError.message }, { status: 400 })
  }

  const { error: profileError } = await adminClient
    .from('profiles')
    .update({ full_name: fullName, role })
    .eq('id', newUser.user.id)

  if (profileError) {
    return NextResponse.json({ message: profileError.message }, { status: 400 })
  }

  return NextResponse.json({ id: newUser.user.id, email }, { status: 201 })
}
