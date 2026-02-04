import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Theme store state interface
interface ThemeState {
  isDarkMode: boolean
  toggleDarkMode: () => void
  setDarkMode: (isDark: boolean) => void
}

// Create the theme store with localStorage persistence
export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      isDarkMode: false,

      // Toggle between dark and light mode
      toggleDarkMode: () => {
        const newMode = !get().isDarkMode
        // Update DOM class
        if (newMode) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
        set({ isDarkMode: newMode })
      },

      // Set dark mode explicitly
      setDarkMode: (isDark) => {
        if (isDark) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
        set({ isDarkMode: isDark })
      },
    }),
    {
      name: 'theme-storage', // localStorage key
      // Initialize DOM class when store is rehydrated
      onRehydrateStorage: () => (state) => {
        if (state?.isDarkMode) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      },
    }
  )
)
