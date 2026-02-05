import { Link, useLocation } from '@tanstack/react-router'
import { Home, FolderOpen, User, Settings } from 'lucide-react'
import { cn } from '../../lib/utils'

// Navigation items configuration
const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/categories', icon: FolderOpen, label: 'Categories' },
  { path: '/profile', icon: User, label: 'Profile' },
  { path: '/settings', icon: Settings, label: 'Settings' },
] as const

export function BottomNav() {
  const location = useLocation()

  return (
    <nav className="fixed bottom-0 left-0 right-0 glass-card rounded-none border-x-0 border-b-0 pb-safe z-50">
      <div className="flex items-center justify-around py-3">
        {navItems.map((item) => {
          // Check if current path matches this nav item
          const isActive =
            item.path === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(item.path)

          const Icon = item.icon

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-300',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {/* Icon container with glow effect when active */}
              <div
                className={cn(
                  'p-2 rounded-xl transition-all duration-300',
                  isActive && 'bg-primary/10 aurora-glow'
                )}
              >
                <Icon
                  className={cn(
                    'w-5 h-5 transition-transform duration-300',
                    isActive && 'scale-110'
                  )}
                />
              </div>
              {/* Label */}
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
