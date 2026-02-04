import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Hardcoded PIN for validation
const VALID_PIN = '1234'

// Auth store state interface
interface AuthState {
  isAuthenticated: boolean

  // Actions
  validatePin: (pin: string) => boolean
  logout: () => void
}

// Create the auth store with localStorage persistence
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,

      // Validate PIN and authenticate
      validatePin: (pin: string) => {
        if (pin === VALID_PIN) {
          set({ isAuthenticated: true })
          return true
        }
        return false
      },

      // Logout user
      logout: () => {
        set({ isAuthenticated: false })
      },
    }),
    {
      name: 'auth-storage', // localStorage key
    }
  )
)
