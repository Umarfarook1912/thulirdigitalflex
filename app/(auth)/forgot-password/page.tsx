import type { Metadata } from 'next'
import { AuthShell } from '@/features/auth/components/auth-shell'
import { ForgotPasswordForm } from '@/features/auth/components/forgot-password-form'

export const metadata: Metadata = {
  title: 'Forgot Password',
}

export default function ForgotPasswordPage() {
  return (
    <AuthShell title="Reset password" description="We will email you a secure reset link.">
      <ForgotPasswordForm />
    </AuthShell>
  )
}
