import { MarketingNav } from '@/features/marketing/components/marketing-nav'
import { HeroSection } from '@/features/marketing/components/hero-section'
import { ServicesSection } from '@/features/marketing/components/services-section'
import { ProcessSection } from '@/features/marketing/components/process-section'
import { WhyThulirSection } from '@/features/marketing/components/why-thulir-section'
import { CtaSection } from '@/features/marketing/components/cta-section'
import { ContactSection } from '@/features/marketing/components/contact-section'
import { MarketingFooter } from '@/features/marketing/components/marketing-footer'

export function LandingPage() {
  return (
    <main>
      <MarketingNav />
      <HeroSection />
      <ServicesSection />
      <ProcessSection />
      <WhyThulirSection />
      <CtaSection />
      <ContactSection />
      <MarketingFooter />
    </main>
  )
}
