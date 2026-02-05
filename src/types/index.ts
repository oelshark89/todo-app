export interface Todo {
  id: string
  title: string
  description: string
  categoryId: string
  completed: boolean
  createdAt: string
  dueDate?: string
}

export interface Category {
  id: string
  name: string
  color: string
}

export type TagColor = 'tag-purple' | 'tag-pink' | 'tag-green' | 'tag-orange' | 'tag-cyan' | 'tag-blue'

export const TAG_COLORS: { id: TagColor; label: string; preview: string }[] = [
  { id: 'tag-purple', label: 'Purple', preview: '#7e22ce' },
  { id: 'tag-pink', label: 'Pink', preview: '#be185d' },
  { id: 'tag-green', label: 'Green', preview: '#047857' },
  { id: 'tag-orange', label: 'Orange', preview: '#c2410c' },
  { id: 'tag-cyan', label: 'Cyan', preview: '#0e7490' },
  { id: 'tag-blue', label: 'Blue', preview: '#1d4ed8' },
]

export interface UserProfile {
  name: string
  avatar: string
  about: string
  tag: string
  tagColor: TagColor
}

export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'work', name: 'Work', color: 'category-work' },
  { id: 'personal', name: 'Personal', color: 'category-personal' },
  { id: 'health', name: 'Health', color: 'category-health' },
  { id: 'shopping', name: 'Shopping', color: 'category-shopping' },
  { id: 'ideas', name: 'Ideas', color: 'category-ideas' },
]

export const DEFAULT_PROFILE: UserProfile = {
  name: 'Alex Johnson',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
  about: 'Productivity enthusiast and design lover. Building beautiful things one task at a time.',
  tag: 'Productivity Enthusiast',
  tagColor: 'tag-cyan',
}

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
