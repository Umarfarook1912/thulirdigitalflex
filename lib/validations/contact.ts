import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Enter your name'),
  phone: z
    .string()
    .trim()
    .min(10, 'Enter a valid phone number')
    .max(15, 'Enter a valid phone number'),
  email: z
    .string()
    .trim()
    .email('Enter a valid email')
    .optional()
    .or(z.literal('')),
  message: z.string().trim().min(10, 'Tell us a bit more about what you need'),
})

export type ContactInput = z.infer<typeof contactSchema>
