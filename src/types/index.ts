// Days of the week for repeat functionality
export type DayOfWeek = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'

// Repeat configuration for tasks
export interface RepeatConfig {
  enabled: boolean
  days: DayOfWeek[] // Which days to repeat (e.g., ['mon', 'wed', 'fri'])
}

// All days in order
export const ALL_DAYS: DayOfWeek[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

// Short day labels for compact display
export const DAY_SHORT_LABELS: Record<DayOfWeek, string> = {
  mon: 'Mon',
  tue: 'Tue',
  wed: 'Wed',
  thu: 'Thu',
  fri: 'Fri',
  sat: 'Sat',
  sun: 'Sun',
}

// Todo type - represents a single todo item
export interface Todo {
  id: string
  title: string
  description: string
  categoryId: string
  completed: boolean
  createdAt: string // ISO date string for JSON serialization
  dueDate?: string  // Optional due date
  repeat?: RepeatConfig // Optional repeat configuration
}

// Category type - represents a todo category
export interface Category {
  id: string
  name: string
  color: string // CSS class name for styling (e.g., 'category-work')
}

// Tag color options
export type TagColor = 'tag-purple' | 'tag-pink' | 'tag-green' | 'tag-orange' | 'tag-cyan' | 'tag-blue'

export const TAG_COLORS: { id: TagColor; label: string; preview: string }[] = [
  { id: 'tag-purple', label: 'Purple', preview: 'rgb(126 34 206)' },
  { id: 'tag-pink', label: 'Pink', preview: 'rgb(190 24 93)' },
  { id: 'tag-green', label: 'Green', preview: 'rgb(4 120 87)' },
  { id: 'tag-orange', label: 'Orange', preview: 'rgb(194 65 12)' },
  { id: 'tag-cyan', label: 'Cyan', preview: 'rgb(14 116 144)' },
  { id: 'tag-blue', label: 'Blue', preview: 'rgb(29 78 216)' },
]

// User profile type - hardcoded user info
export interface UserProfile {
  name: string
  avatar: string
  about: string
  tag: string // User's status tag/badge
  tagColor: TagColor // Color for the tag badge
}

// Default categories with Aurora theme colors
export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'work', name: 'Work', color: 'category-work' },
  { id: 'personal', name: 'Personal', color: 'category-personal' },
  { id: 'health', name: 'Health', color: 'category-health' },
  { id: 'shopping', name: 'Shopping', color: 'category-shopping' },
  { id: 'ideas', name: 'Ideas', color: 'category-ideas' },
]

// Default user profile
export const DEFAULT_PROFILE: UserProfile = {
  name: 'Alex Johnson',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
  about: 'Productivity enthusiast and design lover. Building beautiful things one task at a time.',
  tag: 'Productivity Enthusiast',
  tagColor: 'tag-cyan',
}

// Sample todos for initial state
export const DEFAULT_TODOS: Todo[] = [
  {
    id: '1',
    title: 'Complete project proposal',
    description: 'Finish the quarterly project proposal for the team meeting',
    categoryId: 'work',
    completed: false,
    createdAt: new Date().toISOString(),
    dueDate: new Date(Date.now() + 86400000 * 2).toISOString(),
  },
  {
    id: '2',
    title: 'Morning yoga session',
    description: '30 minutes of stretching and meditation',
    categoryId: 'health',
    completed: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '3',
    title: 'Buy groceries',
    description: 'Milk, eggs, bread, fruits, vegetables',
    categoryId: 'shopping',
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Plan weekend trip',
    description: 'Research destinations and book accommodations',
    categoryId: 'personal',
    completed: false,
    createdAt: new Date().toISOString(),
    dueDate: new Date(Date.now() + 86400000 * 5).toISOString(),
  },
  {
    id: '5',
    title: 'App redesign concept',
    description: 'Sketch out new ideas for the mobile app interface',
    categoryId: 'ideas',
    completed: false,
    createdAt: new Date().toISOString(),
  },
]
