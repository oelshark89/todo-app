import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState, useRef, useEffect } from 'react'
import { Lock } from 'lucide-react'
import { useAuthStore } from '../stores/authStore'
import { useProfileStore } from '../stores/profileStore'
import { cn } from '../lib/utils'

// Create the route for "/welcome"
export const Route = createFileRoute('/welcome')({
  component: WelcomePage,
})

function WelcomePage() {
  const navigate = useNavigate()
  const { validatePin, isAuthenticated } = useAuthStore()
  const { profile } = useProfileStore()

  const [pin, setPin] = useState(['', '', '', ''])
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: '/', replace: true })
    }
  }, [isAuthenticated])

  // Handle PIN input change
  const handleChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return

    const newPin = [...pin]
    newPin[index] = value
    setPin(newPin)
    setError(false)

    // Auto-advance to next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus()
    }

    // Auto-submit when all 4 digits are entered
    if (value && index === 3) {
      const fullPin = newPin.join('')
      if (fullPin.length === 4) {
        handleSubmit(fullPin)
      }
    }
  }

  // Handle backspace
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  // Handle paste
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').slice(0, 4)
    if (/^\d+$/.test(pastedData)) {
      const newPin = pastedData.split('').concat(['', '', '', '']).slice(0, 4)
      setPin(newPin)
      if (pastedData.length === 4) {
        handleSubmit(pastedData)
      } else {
        inputRefs.current[pastedData.length]?.focus()
      }
    }
  }

  // Submit PIN
  const handleSubmit = (fullPin: string) => {
    if (validatePin(fullPin)) {
      setSuccess(true)
      setTimeout(() => {
        navigate({ to: '/', replace: true })
      }, 500)
    } else {
      setError(true)
      setPin(['', '', '', ''])
      inputRefs.current[0]?.focus()
    }
  }

  // Focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      {/* Background gradient */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-purple-100 via-white to-cyan-100 dark:from-purple-950 dark:via-gray-900 dark:to-cyan-950" />

      {/* Welcome card */}
      <div
        className={cn(
          'glass-card-elevated p-8 w-full max-w-sm text-center animate-fade-in',
          error && 'animate-shake',
          success && 'scale-105 transition-transform duration-300'
        )}
      >
        {/* Profile picture */}
        <div className="relative mb-6 inline-block">
          <img
            src={profile.avatar}
            alt={profile.name}
            className={cn(
              'w-24 h-24 rounded-full border-4 shadow-lg transition-all duration-300',
              success
                ? 'border-green-500 scale-110'
                : error
                  ? 'border-destructive'
                  : 'border-primary/30'
            )}
          />
          {/* Glow effect */}
          <div
            className={cn(
              'absolute inset-0 rounded-full -z-10 scale-110 transition-all duration-300',
              success
                ? 'shadow-[0_0_40px_rgba(34,197,94,0.5)]'
                : 'aurora-glow opacity-50'
            )}
          />
        </div>

        {/* Greeting */}
        <h1 className="text-2xl font-bold gradient-text mb-2">
          Hi, {profile.name.split(' ')[0]}!
        </h1>
        <p className="text-muted-foreground mb-8">
          Enter your PIN to continue
        </p>

        {/* PIN input */}
        <div className="flex justify-center gap-3 mb-6">
          {pin.map((digit, index) => (
            <input
              key={index}
              ref={(el) => { inputRefs.current[index] = el }}
              type="password"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              className={cn(
                'w-14 h-14 text-center text-2xl font-bold rounded-xl transition-all duration-200',
                'bg-muted-foreground/10 border-2 outline-none',
                digit
                  ? 'border-primary bg-primary/10'
                  : 'border-transparent',
                error && 'border-destructive bg-destructive/10',
                success && 'border-green-500 bg-green-500/10',
                'focus:border-primary focus:ring-2 focus:ring-primary/30'
              )}
              disabled={success}
            />
          ))}
        </div>

        {/* Error message */}
        {error && (
          <p className="text-destructive text-sm mb-4 animate-fade-in">
            Incorrect PIN. Please try again.
          </p>
        )}

        {/* Success message */}
        {success && (
          <p className="text-green-600 dark:text-green-400 text-sm mb-4 animate-fade-in">
            Welcome back!
          </p>
        )}

        {/* Lock icon hint */}
        <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
          <Lock className="w-4 h-4" />
          <span>PIN: 1234 (for demo)</span>
        </div>
      </div>
    </div>
  )
}
