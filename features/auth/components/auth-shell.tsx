import Image from 'next/image'
import Link from 'next/link'
import { APP_LOGO, BUSINESS_NAME, ROUTES } from '@/lib/constants'

interface AuthShellProps {
  title: string
  description: string
  children: React.ReactNode
}

export function AuthShell({ title, description, children }: AuthShellProps) {
  return (
    <div className="from-brand-dark via-brand-dark to-brand-dark/95 flex min-h-screen flex-col items-center justify-center bg-gradient-to-br px-4 py-12">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="bg-primary/20 absolute -top-24 right-0 h-72 w-72 rounded-full blur-3xl" />
        <div className="bg-primary/10 absolute bottom-0 left-0 h-64 w-64 rounded-full blur-3xl" />
      </div>

      <Link href={ROUTES.home} className="relative mb-8 flex flex-col items-center gap-3">
        <Image src={APP_LOGO} alt={BUSINESS_NAME} width={80} height={80} className="object-contain" />
        <span className="font-heading text-sm tracking-[0.2em] text-white uppercase">
          {BUSINESS_NAME}
        </span>
      </Link>

      <div className="bg-card text-card-foreground relative w-full max-w-md rounded-2xl border p-8 shadow-xl">
        <div className="mb-6 text-center">
          <h1 className="font-heading text-2xl font-bold">{title}</h1>
          <p className="text-muted-foreground mt-1 text-sm">{description}</p>
        </div>
        {children}
      </div>
    </div>
  )
}
