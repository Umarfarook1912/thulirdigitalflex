import type { Metadata } from 'next'
import { AuthShell } from '@/features/auth/components/auth-shell'
import { ResetPasswordForm } from '@/features/auth/components/reset-password-form'

export const metadata: Metadata = {
  title: 'Set New Password',
}

export default function ResetPasswordPage() {
  return (
    <AuthShell title="Set new password" description="Choose a strong password for your account.">
      <ResetPasswordForm />
    </AuthShell>
  )
}
