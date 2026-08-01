import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/lib/constants'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="font-heading text-4xl font-bold">404</h1>
      <p className="text-muted-foreground">This page could not be found.</p>
      <Button nativeButton={false} render={<Link href={ROUTES.home} />}>
        Back home
      </Button>
    </div>
  )
}
