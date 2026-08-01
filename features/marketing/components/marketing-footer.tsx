import { BUSINESS_NAME } from '@/lib/constants'

export function MarketingFooter() {
  return (
    <footer className="border-t border-white/10 bg-[var(--brand-dark)] px-6 py-6 text-center text-sm text-white/50">
      © {new Date().getFullYear()} {BUSINESS_NAME}. All rights reserved.
    </footer>
  )
}
