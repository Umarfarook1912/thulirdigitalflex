import { type LucideIcon } from 'lucide-react'
import { cn } from '@/utils/cn'

interface StatsCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  description?: string
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'destructive'
  className?: string
}

const iconStyles: Record<string, string> = {
  default: 'bg-muted text-muted-foreground',
  primary: 'bg-primary/15 text-primary',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/15 text-brand-dark',
  destructive: 'bg-destructive/10 text-destructive',
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  description,
  variant = 'default',
  className,
}: StatsCardProps) {
  return (
    <div className={cn('bg-card rounded-xl border p-5', className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-muted-foreground text-sm font-medium">{title}</p>
          <p className="font-heading text-3xl font-bold tracking-tight">{value}</p>
          {description && <p className="text-muted-foreground text-xs">{description}</p>}
        </div>
        <div className={cn('rounded-xl p-2.5', iconStyles[variant])}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  )
}
