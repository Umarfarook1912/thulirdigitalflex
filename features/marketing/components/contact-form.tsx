'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Send } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { FormFieldWrapper } from '@/components/shared/forms/form-field-wrapper'
import { BUSINESS_PHONES } from '@/lib/constants'
import { contactSchema, type ContactInput } from '@/lib/validations/contact'

function buildWhatsAppUrl(data: ContactInput) {
  const phone = BUSINESS_PHONES[0].replace(/\D/g, '')
  const withCountry = phone.length === 10 ? `91${phone}` : phone
  const lines = [
    `Hello Thulir Digital Flex,`,
    ``,
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    data.email ? `Email: ${data.email}` : null,
    ``,
    data.message,
  ].filter(Boolean)

  return `https://wa.me/${withCountry}?text=${encodeURIComponent(lines.join('\n'))}`
}

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', phone: '', email: '', message: '' },
  })

  async function onSubmit(data: ContactInput) {
    window.open(buildWhatsAppUrl(data), '_blank', 'noopener,noreferrer')
    toast.success('Opening WhatsApp with your message')
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormFieldWrapper
          label="Name"
          htmlFor="contact-name"
          required
          error={errors.name}
          labelClassName="text-white/85"
        >
          <Input
            id="contact-name"
            autoComplete="name"
            placeholder="Your name"
            aria-invalid={!!errors.name}
            className="h-11 border-white/15 bg-white/5 text-white placeholder:text-white/40"
            {...register('name')}
          />
        </FormFieldWrapper>
        <FormFieldWrapper
          label="Phone"
          htmlFor="contact-phone"
          required
          error={errors.phone}
          labelClassName="text-white/85"
        >
          <Input
            id="contact-phone"
            type="tel"
            autoComplete="tel"
            placeholder="Your phone number"
            aria-invalid={!!errors.phone}
            className="h-11 border-white/15 bg-white/5 text-white placeholder:text-white/40"
            {...register('phone')}
          />
        </FormFieldWrapper>
      </div>

      <FormFieldWrapper
        label="Email"
        htmlFor="contact-email"
        error={errors.email}
        labelClassName="text-white/85"
      >
        <Input
          id="contact-email"
          type="email"
          autoComplete="email"
          placeholder="Optional email"
          aria-invalid={!!errors.email}
          className="h-11 border-white/15 bg-white/5 text-white placeholder:text-white/40"
          {...register('email')}
        />
      </FormFieldWrapper>

      <FormFieldWrapper
        label="Message"
        htmlFor="contact-message"
        required
        error={errors.message}
        labelClassName="text-white/85"
      >
        <Textarea
          id="contact-message"
          rows={4}
          placeholder="Tell us the size, material, and quantity you need"
          aria-invalid={!!errors.message}
          className="border-white/15 bg-white/5 text-white placeholder:text-white/40"
          {...register('message')}
        />
      </FormFieldWrapper>

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full gap-2 sm:w-auto">
        {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
        Send enquiry
      </Button>
    </form>
  )
}
