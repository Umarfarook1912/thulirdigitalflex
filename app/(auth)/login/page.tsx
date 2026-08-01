import type { Metadata } from 'next'
import { AuthShell } from '@/features/auth/components/auth-shell'
import { LoginForm } from '@/features/auth/components/login-form'

export const metadata: Metadata = {
  title: 'Sign In',
}

export default function LoginPage() {
  return (
    <AuthShell title="Sign in" description="Access invoices and finance for your shop.">
      <LoginForm />
    </AuthShell>
  )
}
