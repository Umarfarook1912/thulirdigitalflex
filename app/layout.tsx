import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Providers } from '@/components/providers'
import './globals.css'

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Thulir Digital Flex & Printers',
    template: '%s | Thulir Digital Flex',
  },
  description:
    'Digital flex printing, UV printing, and signage in Dindigul. Quality print work with prompt service.',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'Thulir Digital Flex & Printers',
    description: 'Digital flex printing & signage — Dindigul',
    type: 'website',
    images: [{ url: '/logo.png' }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geist.variable} ${geistMono.variable}`}
    >
      <body className="bg-background min-h-screen font-sans antialiased">
        <Providers>
          <TooltipProvider delay={300}>{children}</TooltipProvider>
        </Providers>
        <Toaster closeButton />
      </body>
    </html>
  )
}
