import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Category } from '../types'
import { DEFAULT_CATEGORIES } from '../types'
import { v4 as uuidv4 } from 'uuid'
import { useTodoStore } from './todoStore'

// Available category colors for new categories
export const CATEGORY_COLORS = [
  'category-work',
  'category-personal',
  'category-health',
  'category-shopping',
  'category-ideas',
] as const

// Category store state interface
interface CategoryState {
  categories: Category[]

  // Actions
  addCategory: (name: string) => void
  updateCategory: (id: string, name: string) => void
  deleteCategory: (id: string) => void

  // Queries
  getCategoryById: (id: string) => Category | undefined
  getCategoryCount: (id: string) => number
}

// Create the category store with localStorage persistence
export const useCategoryStore = create<CategoryState>()(
  persist(
    (set, get) => ({
      categories: DEFAULT_CATEGORIES,

      // Add a new category with auto-assigned color
      addCategory: (name) => {
        const existingColors = get().categories.map((c) => c.color)
        // Find a color that hasn't been used, or cycle through colors
        const availableColor =
          CATEGORY_COLORS.find((color) => !existingColors.includes(color)) ||
          CATEGORY_COLORS[get().categories.length % CATEGORY_COLORS.length]

        const newCategory: Category = {
          id: uuidv4(),
          name,
          color: availableColor,
        }
        set((state) => ({
          categories: [...state.categories, newCategory],
        }))
      },

      // Update category name
      updateCategory: (id, name) => {
        set((state) => ({
          categories: state.categories.map((category) =>
            category.id === id ? { ...category, name } : category
          ),
        }))
      },

      // Delete a category (with cascade delete of todos)
      deleteCategory: (id) => {
        // First, delete all todos in this category (cascade delete)
        useTodoStore.getState().deleteTodosByCategory(id)

        // Then delete the category
        set((state) => ({
          categories: state.categories.filter((category) => category.id !== id),
        }))
      },

      // Get a single category by ID
      getCategoryById: (id) => {
        return get().categories.find((category) => category.id === id)
      },

      // Get count of todos in a category
      getCategoryCount: (id) => {
        return useTodoStore.getState().getTodosByCategory(id).length
      },
    }),
    {
      name: 'category-storage', // localStorage key
    }
  )
)
