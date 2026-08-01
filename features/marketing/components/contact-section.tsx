import { Phone, MapPin } from 'lucide-react'
import { BUSINESS_ADDRESS, BUSINESS_NAME, BUSINESS_PHONES } from '@/lib/constants'
import { Reveal } from '@/components/shared/layout/reveal'
import { ContactForm } from '@/features/marketing/components/contact-form'

const MAP_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31398.70668303702!2d77.94517636299129!3d10.354808407152012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00abec67823709%3A0xc5d17bc0cf1b3b4d!2sThulir%20Digitalflex!5e0!3m2!1sen!2sin!4v1785607632689!5m2!1sen!2sin'

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-brand-dark px-4 py-20 text-white sm:px-6 sm:py-28 lg:px-10"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(circle at 85% 15%, color-mix(in oklab, var(--brand-primary) 18%, transparent), transparent 38%)',
        }}
      />
      <div className="relative mx-auto w-full max-w-7xl">
        <Reveal className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-primary inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.24em] uppercase">
              <span className="bg-primary h-px w-5" aria-hidden="true" />
              Contact
            </p>
            <h2 className="font-heading mt-3 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              Let&apos;s bring your next print to life
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-white/65 sm:text-base">
            Share your requirement below, call us, or visit the Dindigul shop.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:mt-14 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-5">
            <Reveal delay={80}>
              <div className="glass-panel rounded-3xl p-6 sm:p-7">
                <div className="bg-primary/15 text-primary flex size-12 items-center justify-center rounded-2xl">
                  <MapPin className="size-5" />
                </div>
                <p className="text-primary mt-5 text-xs font-semibold tracking-[0.2em] uppercase">
                  Address
                </p>
                <p className="mt-3 font-medium">{BUSINESS_NAME}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{BUSINESS_ADDRESS}</p>

                <div className="mt-6 border-t border-white/10 pt-5">
                  <div className="bg-primary/15 text-primary mb-4 flex size-10 items-center justify-center rounded-xl">
                    <Phone className="size-4" />
                  </div>
                  <p className="text-primary text-xs font-semibold tracking-[0.2em] uppercase">
                    Phone
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {BUSINESS_PHONES.map((phone) => (
                      <li key={phone}>
                        <a
                          href={`tel:${phone}`}
                          className="text-base font-medium transition hover:text-primary"
                        >
                          {phone}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <div className="min-h-56 overflow-hidden rounded-3xl border border-white/10 shadow-2xl sm:min-h-64">
                <iframe
                  src={MAP_URL}
                  title={`${BUSINESS_NAME} location`}
                  className="h-56 w-full sm:h-64"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
            </Reveal>
          </div>

          <Reveal delay={180}>
            <div className="glass-panel h-full rounded-3xl p-6 sm:p-8">
              <p className="text-primary text-xs font-semibold tracking-[0.2em] uppercase">
                Send enquiry
              </p>
              <h3 className="font-heading mt-2 text-2xl font-bold tracking-tight">
                Tell us what you need
              </h3>
              <p className="mt-2 mb-6 text-sm text-white/60">
                Fill in the details and we&apos;ll continue the conversation on WhatsApp.
              </p>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
