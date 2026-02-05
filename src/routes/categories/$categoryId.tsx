import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { useCategoryStore } from '../../stores/categoryStore'
import { useTodoStore } from '../../stores/todoStore'
import { TodoCard } from '../../components/todo/TodoCard'
import { EmptyState } from '../../components/todo/EmptyState'

// Create the route for "/categories/:categoryId"
export const Route = createFileRoute('/categories/$categoryId')({
  component: CategoryDetailPage,
})

function CategoryDetailPage() {
  const navigate = useNavigate()
  const { categoryId } = Route.useParams()
  const { getCategoryById } = useCategoryStore()
  const { getTodosByCategory, toggleTodo } = useTodoStore()

  const category = getCategoryById(categoryId)
  const todos = getTodosByCategory(categoryId)

  // Handle case where category doesn't exist
  if (!category) {
    return (
      <div className="page-transition min-h-screen pb-24">
        <header className="sticky top-0 z-10 glass-card rounded-none border-x-0 border-t-0 p-4">
          <button
            onClick={() => navigate({ to: '/categories' })}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Categories
          </button>
        </header>
        <main className="p-4">
          <EmptyState
            title="Category not found"
            description="This category may have been deleted"
          />
        </main>
      </div>
    )
  }

  // Separate incomplete and completed todos
  const incompleteTodos = todos.filter((t) => !t.completed)
  const completedTodos = todos.filter((t) => t.completed)

  return (
    <div className="page-transition min-h-screen pb-24">
      {/* Header */}
      <header className="sticky top-0 z-10 glass-card rounded-none border-x-0 border-t-0 p-4">
        {/* Back button */}
        <button
          onClick={() => navigate({ to: '/categories' })}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-3"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        {/* Category title with color indicator */}
        <div className="flex items-center gap-3">
          <div
            className="w-4 h-4 rounded-full"
            style={{
              backgroundColor:
                category.color === 'category-work'
                  ? 'hsl(270 70% 60%)'
                  : category.color === 'category-personal'
                    ? 'hsl(330 70% 65%)'
                    : category.color === 'category-health'
                      ? 'hsl(160 60% 50%)'
                      : category.color === 'category-shopping'
                        ? 'hsl(30 80% 60%)'
                        : 'hsl(200 80% 55%)',
            }}
          />
          <h1 className="text-2xl font-bold gradient-text">{category.name}</h1>
        </div>
        <p className="text-muted-foreground text-sm mt-1">
          {todos.length} {todos.length === 1 ? 'task' : 'tasks'}
        </p>
      </header>

      {/* Todos list */}
      <main className="p-4 space-y-4">
        {todos.length === 0 ? (
          <EmptyState
            title="No tasks in this category"
            description="Tasks you add to this category will appear here"
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
                      category={category}
                      onToggle={() => toggleTodo(todo.id)}
                      onClick={() =>
                        navigate({ to: '/todos/$todoId', params: { todoId: todo.id } })
                      }
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
                    category={category}
                    onToggle={() => toggleTodo(todo.id)}
                    onClick={() =>
                      navigate({ to: '/todos/$todoId', params: { todoId: todo.id } })
                    }
                  />
                ))}
              </section>
            )}
          </>
        )}
      </main>
    </div>
  )
}
