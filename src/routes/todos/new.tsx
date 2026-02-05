import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { ArrowLeft, Repeat } from 'lucide-react'
import { useTodoStore } from '../../stores/todoStore'
import { useCategoryStore } from '../../stores/categoryStore'
import type { DayOfWeek } from '../../types'
import { ALL_DAYS, DAY_SHORT_LABELS } from '../../types'
import { cn } from '../../lib/utils'

// Create the route for "/todos/new"
export const Route = createFileRoute('/todos/new')({
  component: NewTodoPage,
})

function NewTodoPage() {
  const navigate = useNavigate()
  const { addTodo } = useTodoStore()
  const { categories } = useCategoryStore()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [categoryId, setCategoryId] = useState(categories[0]?.id || '')
  const [dueDate, setDueDate] = useState('')
  const [repeatEnabled, setRepeatEnabled] = useState(false)
  const [repeatDays, setRepeatDays] = useState<DayOfWeek[]>([])
  const [errors, setErrors] = useState<{ title?: string }>({})

  // Toggle a day in repeat days
  const toggleDay = (day: DayOfWeek) => {
    setRepeatDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    )
  }

  // Validate and submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!title.trim()) {
      setErrors({ title: 'Title is required' })
      return
    }

    // Add todo
    addTodo({
      title: title.trim(),
      description: description.trim(),
      categoryId,
      dueDate: dueDate || undefined,
      repeat:
        repeatEnabled && repeatDays.length > 0
          ? { enabled: true, days: repeatDays }
          : undefined,
    })

    // Navigate back to home
    navigate({ to: '/' })
  }

  return (
    <div className="page-transition min-h-screen pb-24">
      {/* Header */}
      <header className="sticky top-0 z-10 glass-card rounded-none border-x-0 border-t-0 p-4">
        <button
          onClick={() => navigate({ to: '/' })}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-3"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        <h1 className="text-2xl font-bold gradient-text">New Task</h1>
        <p className="text-muted-foreground text-sm mt-1">Create a new task</p>
      </header>

      {/* Form */}
      <main className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div className="animate-fade-in">
            <label className="block text-sm font-medium text-foreground mb-2">
              Title <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
                if (errors.title) setErrors({})
              }}
              placeholder="What needs to be done?"
              className={cn(
                'input-modern',
                errors.title && 'ring-2 ring-destructive/50'
              )}
            />
            {errors.title && (
              <p className="text-sm text-destructive mt-1">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div className="animate-fade-in" style={{ animationDelay: '50ms' }}>
            <label className="block text-sm font-medium text-foreground mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add more details..."
              rows={4}
              className="input-modern resize-none"
            />
          </div>

          {/* Category */}
          <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
            <label className="block text-sm font-medium text-foreground mb-2">
              Category
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="input-modern"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Due Date */}
          <div className="animate-fade-in" style={{ animationDelay: '150ms' }}>
            <label className="block text-sm font-medium text-foreground mb-2">
              Due Date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="input-modern"
            />
          </div>

          {/* Repeat Option */}
          <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
            <div className="glass-card p-4">
              {/* Repeat Toggle */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Repeat className="w-5 h-5 text-primary" />
                  <span className="font-medium text-foreground">Repeat Weekly</span>
                </div>
                <button
                  type="button"
                  onClick={() => setRepeatEnabled(!repeatEnabled)}
                  className={cn(
                    'w-12 h-6 rounded-full transition-all duration-300 relative',
                    repeatEnabled ? 'bg-primary' : 'bg-muted-foreground/30'
                  )}
                >
                  <div
                    className={cn(
                      'w-5 h-5 rounded-full bg-white shadow-md absolute top-0.5 transition-all duration-300',
                      repeatEnabled ? 'left-6' : 'left-0.5'
                    )}
                  />
                </button>
              </div>

              {/* Day Selection */}
              {repeatEnabled && (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Select days to repeat:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {ALL_DAYS.map((day) => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => toggleDay(day)}
                        className={cn(
                          'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                          repeatDays.includes(day)
                            ? 'bg-primary text-white shadow-md'
                            : 'bg-muted-foreground/10 text-muted-foreground hover:bg-muted-foreground/20'
                        )}
                      >
                        {DAY_SHORT_LABELS[day]}
                      </button>
                    ))}
                  </div>
                  {repeatDays.length === 0 && (
                    <p className="text-xs text-muted-foreground">
                      Select at least one day
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Submit buttons */}
          <div
            className="flex gap-3 pt-4 animate-fade-in"
            style={{ animationDelay: '250ms' }}
          >
            <button
              type="button"
              onClick={() => navigate({ to: '/' })}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary flex-1">
              Create Task
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
