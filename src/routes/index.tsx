import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Plus, Calendar, Clock, AlertCircle } from 'lucide-react'
import { useTodoStore } from '../stores/todoStore'
import { useCategoryStore } from '../stores/categoryStore'
import { SearchBar } from '../components/todo/SearchBar'
import { TodoCard } from '../components/todo/TodoCard'
import { EmptyState } from '../components/todo/EmptyState'
import { cn } from '../lib/utils'

// Date filter types
type DateFilter = 'all' | 'today' | 'tomorrow' | 'this-week' | 'upcoming' | 'overdue'

// Date filter options
const DATE_FILTERS: { id: DateFilter; label: string; icon?: typeof Calendar }[] = [
  { id: 'all', label: 'All' },
  { id: 'today', label: 'Today', icon: Calendar },
  { id: 'tomorrow', label: 'Tomorrow', icon: Clock },
  { id: 'this-week', label: 'This Week' },
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'overdue', label: 'Overdue', icon: AlertCircle },
]

// Helper functions for date comparison
const getStartOfDay = (date: Date) => {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

const isToday = (dateStr: string) => {
  const date = getStartOfDay(new Date(dateStr))
  const today = getStartOfDay(new Date())
  return date.getTime() === today.getTime()
}

const isTomorrow = (dateStr: string) => {
  const date = getStartOfDay(new Date(dateStr))
  const tomorrow = getStartOfDay(new Date())
  tomorrow.setDate(tomorrow.getDate() + 1)
  return date.getTime() === tomorrow.getTime()
}

const isThisWeek = (dateStr: string) => {
  const date = getStartOfDay(new Date(dateStr))
  const today = getStartOfDay(new Date())
  const endOfWeek = getStartOfDay(new Date())
  endOfWeek.setDate(today.getDate() + (7 - today.getDay()))
  return date >= today && date <= endOfWeek
}

const isUpcoming = (dateStr: string) => {
  const date = getStartOfDay(new Date(dateStr))
  const today = getStartOfDay(new Date())
  return date > today
}

const isOverdue = (dateStr: string) => {
  const date = getStartOfDay(new Date(dateStr))
  const today = getStartOfDay(new Date())
  return date < today
}

// Create the route for "/" (Home page)
export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  const navigate = useNavigate()
  const { todos, toggleTodo } = useTodoStore()
  const { getCategoryById } = useCategoryStore()
  const [search, setSearch] = useState('')
  const [dateFilter, setDateFilter] = useState<DateFilter>('all')

  // Filter todos based on search query
  const searchFilteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(search.toLowerCase())
  )

  // Filter todos based on date filter
  const filteredTodos = searchFilteredTodos.filter((todo) => {
    if (dateFilter === 'all') return true
    if (!todo.dueDate) return false // Todos without due date only show in "all"

    switch (dateFilter) {
      case 'today':
        return isToday(todo.dueDate)
      case 'tomorrow':
        return isTomorrow(todo.dueDate)
      case 'this-week':
        return isThisWeek(todo.dueDate)
      case 'upcoming':
        return isUpcoming(todo.dueDate)
      case 'overdue':
        return isOverdue(todo.dueDate) && !todo.completed
      default:
        return true
    }
  })

  // Separate incomplete and completed todos
  const incompleteTodos = filteredTodos.filter((t) => !t.completed)
  const completedTodos = filteredTodos.filter((t) => t.completed)

  return (
    <div className="page-transition min-h-screen pb-24">
      {/* Header with title, search, and date filter */}
      <header className="sticky top-0 z-10 glass-card rounded-none border-x-0 border-t-0 p-4">
        <h1 className="text-2xl font-bold gradient-text mb-4">My Tasks</h1>
        <SearchBar value={search} onChange={setSearch} placeholder="Search tasks..." />

        {/* Date filter tabs */}
        <div className="mt-4 -mx-4 px-4 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 min-w-max pb-1">
            {DATE_FILTERS.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setDateFilter(filter.id)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap',
                  dateFilter === filter.id
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-muted-foreground/10 text-muted-foreground hover:bg-muted-foreground/20'
                )}
              >
                {filter.icon && <filter.icon className="w-4 h-4" />}
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="p-4 space-y-4">
        {filteredTodos.length === 0 ? (
          <EmptyState
            title={
              search
                ? 'No tasks found'
                : dateFilter === 'all'
                  ? 'No tasks yet'
                  : dateFilter === 'today'
                    ? 'No tasks for today'
                    : dateFilter === 'tomorrow'
                      ? 'No tasks for tomorrow'
                      : dateFilter === 'this-week'
                        ? 'No tasks this week'
                        : dateFilter === 'upcoming'
                          ? 'No upcoming tasks'
                          : dateFilter === 'overdue'
                            ? 'No overdue tasks'
                            : 'No tasks'
            }
            description={
              search
                ? 'Try a different search term'
                : dateFilter === 'all'
                  ? 'Tap the + button to create your first task'
                  : dateFilter === 'overdue'
                    ? "You're all caught up!"
                    : 'Tasks with due dates will appear here'
            }
          />
        ) : (
          <>
            {/* Incomplete todos */}
            {incompleteTodos.length > 0 && (
              <section className="space-y-3">
                {incompleteTodos.map((todo, index) => (
                  <div
                    key={todo.id}
                    style={{ animationDelay: `${index * 50}ms` }}
                    className="animate-fade-in"
                  >
                    <TodoCard
                      todo={todo}
                      category={getCategoryById(todo.categoryId)}
                      onToggle={() => toggleTodo(todo.id)}
                      onClick={() => navigate({ to: '/todos/$todoId', params: { todoId: todo.id } })}
                    />
                  </div>
                ))}
              </section>
            )}

            {/* Completed todos */}
            {completedTodos.length > 0 && (
              <section className="space-y-3 mt-6">
                <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider px-1">
                  Completed ({completedTodos.length})
                </h2>
                {completedTodos.map((todo) => (
                  <TodoCard
                    key={todo.id}
                    todo={todo}
                    category={getCategoryById(todo.categoryId)}
                    onToggle={() => toggleTodo(todo.id)}
                    onClick={() => navigate({ to: '/todos/$todoId', params: { todoId: todo.id } })}
                  />
                ))}
              </section>
            )}
          </>
        )}
      </main>

      {/* Floating Action Button */}
      <button
        onClick={() => navigate({ to: '/todos/new' })}
        className="fab-button fixed bottom-24 right-6 z-40"
        aria-label="Add new todo"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  )
}
