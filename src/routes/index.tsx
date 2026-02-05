import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Plus } from "lucide-react";
import { useTodoStore } from "../stores/todoStore";
import { useCategoryStore } from "../stores/categoryStore";
import { SearchBar } from "../components/todo/SearchBar";
import { TodoList } from "../components/todo/TodoList";
import { EmptyState } from "../components/todo/EmptyState";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const navigate = useNavigate();
  const todos = useTodoStore((state) => state.todos);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const getCategoryById = useCategoryStore((state) => state.getCategoryById);
  const [search, setSearch] = useState("");

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="page-transition min-h-screen pb-24">
      {/* Header with title and search */}
      <header className="sticky top-0 z-10 glass-card rounded-none border-x-0 border-t-0 p-4">
        <h1 className="text-2xl font-bold gradient-text mb-4">My Tasks</h1>
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search tasks..."
        />
      </header>

      {/* Main content */}
      <main className="p-4 space-y-4">
        {filteredTodos.length === 0 ? (
          <EmptyState
            title={search ? "No tasks found" : "No tasks yet"}
            description={
              search
                ? "Try a different search term"
                : "Tap the + button to create your first task"
            }
          />
        ) : (
          <TodoList
            todos={filteredTodos}
            getCategory={(todo) => getCategoryById(todo.categoryId)}
            onToggle={(todoId) => {
              const todo = todos.find((t) => t.id === todoId);
              toggleTodo(todoId);
              toast.success(
                todo?.completed
                  ? "Task marked as incomplete"
                  : "Task completed!",
              );
            }}
            onTodoClick={(todoId) =>
              navigate({ to: "/todos/$todoId", params: { todoId } })
            }
          />
        )}
      </main>

      {/* Floating Action Button */}
      <button
        onClick={() => navigate({ to: "/todos/new" })}
        className="fab-button fixed bottom-24 right-6 z-40"
        aria-label="Add new todo"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}
