import type { Metadata } from 'next'
import { AuthShell } from '@/features/auth/components/auth-shell'
import { RegisterForm } from '@/features/auth/components/register-form'

export const metadata: Metadata = {
  title: 'Register',
}

export default function RegisterPage() {
  return (
    <AuthShell title="Create account" description="Register with email and password to manage the shop.">
      <RegisterForm />
    </AuthShell>
  )
}
