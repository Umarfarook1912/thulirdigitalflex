import { MarketingNav } from '@/features/marketing/components/marketing-nav'
import { HeroSection } from '@/features/marketing/components/hero-section'
import { ServicesSection } from '@/features/marketing/components/services-section'
import { ContactSection } from '@/features/marketing/components/contact-section'
import { MarketingFooter } from '@/features/marketing/components/marketing-footer'

export function LandingPage() {
  return (
    <main>
      <MarketingNav />
      <HeroSection />
      <ServicesSection />
      <ContactSection />
      <MarketingFooter />
    </main>
  )
}
