import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserProfile } from '../types'
import { DEFAULT_PROFILE } from '../types'

// Profile store state interface
interface ProfileState {
  profile: UserProfile
  updateProfile: (updates: Partial<UserProfile>) => void
  resetProfile: () => void
}

// Create the profile store with localStorage persistence
export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profile: DEFAULT_PROFILE,

      // Update profile fields
      updateProfile: (updates) => {
        set((state) => ({
          profile: { ...state.profile, ...updates },
        }))
      },

      // Reset to default profile
      resetProfile: () => {
        set({ profile: DEFAULT_PROFILE })
      },
    }),
    {
      name: 'profile-storage', // localStorage key
    }
  )
)
