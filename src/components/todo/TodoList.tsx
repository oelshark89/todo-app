import type { Todo, Category } from '../../types'
import { TodoCard } from './TodoCard'

interface TodoListProps {
  todos: Todo[]
  getCategory: (todo: Todo) => Category | undefined
  onToggle: (todoId: string) => void
  onTodoClick: (todoId: string) => void
}

export function TodoList({ todos, getCategory, onToggle, onTodoClick }: TodoListProps) {
  const incompleteTodos = todos.filter((t) => !t.completed)
  const completedTodos = todos.filter((t) => t.completed)

  return (
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
                category={getCategory(todo)}
                onToggle={() => onToggle(todo.id)}
                onClick={() => onTodoClick(todo.id)}
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
              category={getCategory(todo)}
              onToggle={() => onToggle(todo.id)}
              onClick={() => onTodoClick(todo.id)}
            />
          ))}
        </section>
      )}
    </>
  )
}
