import { createRootRoute, Outlet, useLocation, useNavigate, Link } from '@tanstack/react-router'
import { BottomNav } from '../components/layout/BottomNav'
import { useThemeStore } from '../stores/themeStore'
import { useAuthStore } from '../stores/authStore'
import { useEffect } from 'react'
import { Home, AlertCircle } from 'lucide-react'

// Root component that wraps all pages
function RootComponent() {
  const navigate = useNavigate()
  const location = useLocation()
  const isDarkMode = useThemeStore((state) => state.isDarkMode)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  // Check if we're on the welcome page
  const isWelcomePage = location.pathname === '/welcome'

  // Sync dark mode class with DOM on mount and changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  // Redirect to welcome if not authenticated (except on welcome page)
  useEffect(() => {
    if (!isAuthenticated && !isWelcomePage) {
      navigate({ to: '/welcome', replace: true })
    }
  }, [isAuthenticated, isWelcomePage])

  return (
    <div className="min-h-screen">
      {/* Main content area - pages render here */}
      <Outlet />

      {/* Bottom tab navigation - hide on welcome page */}
      {!isWelcomePage && isAuthenticated && <BottomNav />}
    </div>
  )
}

// 404 Not Found Component
function NotFoundComponent() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      {/* Background gradient */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-purple-100 via-white to-cyan-100 dark:from-purple-950 dark:via-gray-900 dark:to-cyan-950" />

      <div className="glass-card-elevated p-8 text-center max-w-sm animate-fade-in">
        {/* Icon */}
        <div className="relative mb-6 inline-block">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
            <AlertCircle className="w-12 h-12 text-primary" />
          </div>
          <div className="absolute inset-0 rounded-full -z-10 scale-110 aurora-glow opacity-50" />
        </div>

        {/* Message */}
        <h1 className="text-2xl font-bold gradient-text mb-2">Page Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Back to Home Button */}
        <Link
          to="/"
          className="btn-primary inline-flex items-center gap-2"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  )
}

// Create the root route
export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
})
