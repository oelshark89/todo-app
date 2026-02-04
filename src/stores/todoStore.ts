import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Todo } from '../types'
import { DEFAULT_TODOS } from '../types'
import { v4 as uuidv4 } from 'uuid'

// Todo store state interface
interface TodoState {
  todos: Todo[]

  // Actions
  addTodo: (todo: Omit<Todo, 'id' | 'createdAt' | 'completed'>) => void
  updateTodo: (id: string, updates: Partial<Todo>) => void
  deleteTodo: (id: string) => void
  toggleTodo: (id: string) => void

  // Queries
  getTodoById: (id: string) => Todo | undefined
  getTodosByCategory: (categoryId: string) => Todo[]
  deleteTodosByCategory: (categoryId: string) => void
}

// Create the todo store with localStorage persistence
export const useTodoStore = create<TodoState>()(
  persist(
    (set, get) => ({
      todos: DEFAULT_TODOS,

      // Add a new todo
      addTodo: (todoData) => {
        const newTodo: Todo = {
          ...todoData,
          id: uuidv4(),
          createdAt: new Date().toISOString(),
          completed: false,
        }
        set((state) => ({
          todos: [newTodo, ...state.todos],
        }))
      },

      // Update an existing todo
      updateTodo: (id, updates) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, ...updates } : todo
          ),
        }))
      },

      // Delete a todo
      deleteTodo: (id) => {
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        }))
      },

      // Toggle todo completion status
      toggleTodo: (id) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        }))
      },

      // Get a single todo by ID
      getTodoById: (id) => {
        return get().todos.find((todo) => todo.id === id)
      },

      // Get todos filtered by category
      getTodosByCategory: (categoryId) => {
        return get().todos.filter((todo) => todo.categoryId === categoryId)
      },

      // Delete all todos in a category (for cascade delete)
      deleteTodosByCategory: (categoryId) => {
        set((state) => ({
          todos: state.todos.filter((todo) => todo.categoryId !== categoryId),
        }))
      },
    }),
    {
      name: 'todo-storage', // localStorage key
    }
  )
)
