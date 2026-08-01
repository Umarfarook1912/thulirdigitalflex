'use client'

import { LogOut } from 'lucide-react'
import { ThemeToggle } from '@/components/shared/layout/theme-toggle'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/hooks/use-auth'

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

export function DashboardNavbar() {
  const { user, signOut } = useAuth()

  return (
    <header className="bg-background/80 no-print sticky top-0 z-40 flex h-14 items-center border-b px-4 backdrop-blur">
      <p className="font-heading text-sm font-semibold md:hidden">Thulir Digital Flex</p>
      <div className="flex-1" />

      <div className="flex items-center gap-2">
        <ThemeToggle />

        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger className="focus-visible:ring-ring cursor-pointer rounded-full outline-none focus-visible:ring-2">
              <Avatar>
                <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                  {getInitials(user.fullName)}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuGroup>
                <DropdownMenuLabel>
                  <p className="font-medium">{user.fullName}</p>
                  <p className="text-muted-foreground truncate text-xs">{user.email}</p>
                  <p className="text-muted-foreground mt-0.5 text-xs">{user.role}</p>
                </DropdownMenuLabel>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => signOut()}
                className="text-destructive focus:text-destructive"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  )
}
