import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useCategoryStore } from "../../stores/categoryStore";
import { useTodoStore } from "../../stores/todoStore";
import { TodoList } from "../../components/todo/TodoList";
import { EmptyState } from "../../components/todo/EmptyState";
import { CategoryColorDot } from "../../components/category/CategoryColorDot";
import { toast } from "sonner";

export const Route = createFileRoute("/categories/$categoryId")({
  component: CategoryDetailPage,
});

function CategoryDetailPage() {
  const navigate = useNavigate();
  const { categoryId } = Route.useParams();
  const getCategoryById = useCategoryStore((state) => state.getCategoryById);
  const getTodosByCategory = useTodoStore((state) => state.getTodosByCategory);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);

  const category = getCategoryById(categoryId);
  const todos = getTodosByCategory(categoryId);

  // Handle case where category doesn't exist
  if (!category) {
    return (
      <div className="page-transition min-h-screen pb-24">
        <header className="sticky top-0 z-10 glass-card rounded-none border-x-0 border-t-0 p-4">
          <button
            onClick={() => navigate({ to: "/categories" })}
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
    );
  }

  return (
    <div className="page-transition min-h-screen pb-24">
      {/* Header */}
      <header className="sticky top-0 z-10 glass-card rounded-none border-x-0 border-t-0 p-4">
        <button
          onClick={() => navigate({ to: "/categories" })}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-3"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="flex items-center gap-3">
          <CategoryColorDot colorClass={category.color} />
          <h1 className="text-2xl font-bold gradient-text">{category.name}</h1>
        </div>
        <p className="text-muted-foreground text-sm mt-1">
          {todos.length} {todos.length === 1 ? "task" : "tasks"}
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
          <TodoList
            todos={todos}
            getCategory={() => category}
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
    </div>
  );
}
