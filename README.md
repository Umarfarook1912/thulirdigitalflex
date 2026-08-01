# Thulir Digital Flex

Website and business app for **THULIR DIGITAL FLEX & PRINTERS** (Dindigul).

- Public marketing landing page
- Email/password auth (register + login)
- Invoices with line items, print, and share PDF
- Daily finance ledger (expense, income, savings)

Stack: Next.js 16, Supabase, TanStack Query, Zod, Tailwind 4, shadcn.

## Setup

1. **Install**

```bash
npm install
```

2. **Supabase (CLI migrations)**

Migrations are local (gitignored). Keep them under `supabase/migrations/` on your machine.

```bash
# Link your remote project (one-time)
supabase login
supabase link --project-ref <your-project-ref>

# Apply migrations
supabase db push
```

Local migration set:

1. `create_profiles` — roles, profiles, RLS, auth trigger  
2. `create_invoices` — invoices + invoice_items + RLS  
3. `create_finance_entries` — finance ledger + RLS  

Copy URL, anon key, and **service_role** key into `.env.local` (see `.env.example`).

3. **Create Admin**

Open `/register` and create the first account (created as Admin), then sign in at `/login`.

Additional staff can be created from **Dashboard → Staff**.

4. **Run**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Business details

- **Address:** No.5 Makka Pallivasal Compound, Gandhiji New Road, Begambur, Dindigul - 1
- **Phones:** 8056510547, 9790449344
- **Brand colors:** tokens in `app/globals.css` only

## App routes

| Route | Access |
|-------|--------|
| `/` | Public landing |
| `/login` | Sign in |
| `/register` | Create account |
| `/dashboard` | Authenticated |
| `/dashboard/invoices` | Invoices CRUD + print/share |
| `/dashboard/finance` | Expense / income / savings |
| `/dashboard/staff` | Admin only — seed accounts |
