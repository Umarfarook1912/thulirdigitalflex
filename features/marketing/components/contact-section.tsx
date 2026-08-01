import { BUSINESS_ADDRESS, BUSINESS_NAME, BUSINESS_PHONES } from '@/lib/constants'

export function ContactSection() {
  return (
    <section id="contact" className="bg-brand-dark px-6 py-24 text-white">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">Visit us</h2>
        <p className="mt-3 max-w-md text-white/70">
          Call ahead or drop by the shop — we are ready for your next order.
        </p>
        <div className="mt-12 grid gap-10 sm:grid-cols-2">
          <div>
            <p className="text-primary text-xs font-semibold tracking-[0.2em] uppercase">Address</p>
            <p className="mt-2 font-medium">{BUSINESS_NAME}</p>
            <p className="mt-1 max-w-sm text-white/80">{BUSINESS_ADDRESS}</p>
          </div>
          <div>
            <p className="text-primary text-xs font-semibold tracking-[0.2em] uppercase">Phone</p>
            <ul className="mt-2 space-y-1">
              {BUSINESS_PHONES.map((phone) => (
                <li key={phone}>
                  <a href={`tel:${phone}`} className="text-lg font-medium hover:text-primary">
                    {phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
