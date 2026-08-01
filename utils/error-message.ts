const DUPLICATE_KEY = '23505'

const FRIENDLY_BY_CONSTRAINT: Record<string, string> = {
  invoices_invoice_no_key: 'That invoice number is already used. Pick a different number.',
  profiles_email_key: 'That email is already registered.',
  finance_entries_entry_date_day_serial_key:
    'That day serial already exists for the selected date.',
}

function isNetworkFetchError(error: unknown): boolean {
  if (!error || typeof error !== 'object') return false
  const { message, name } = error as { message?: string; name?: string }
  const text = `${name ?? ''} ${message ?? ''}`.toLowerCase()
  return (
    text.includes('failed to fetch') ||
    text.includes('networkerror') ||
    text.includes('network request failed') ||
    text.includes('load failed') ||
    text.includes('fetch failed')
  )
}

/**
 * Supabase returns plain objects (PostgrestError), not Error instances, so
 * `err instanceof Error` loses the real reason. This normalises both shapes.
 */
export function getErrorMessage(error: unknown, fallback = 'Something went wrong'): string {
  if (typeof error === 'string' && error.trim()) return error

  if (isNetworkFetchError(error)) {
    return 'Could not reach the server. Check your internet connection and try again.'
  }

  if (error && typeof error === 'object') {
    const { code, message, details, hint } = error as {
      code?: string
      message?: string
      details?: string
      hint?: string
    }

    if (code === DUPLICATE_KEY) {
      const haystack = `${message ?? ''} ${details ?? ''}`
      const matched = Object.keys(FRIENDLY_BY_CONSTRAINT).find((key) => haystack.includes(key))
      if (matched) return FRIENDLY_BY_CONSTRAINT[matched]
      return 'That value already exists. Please use a different one.'
    }

    if (message?.trim()) return message
    if (details?.trim()) return details
    if (hint?.trim()) return hint
  }

  return fallback
}
