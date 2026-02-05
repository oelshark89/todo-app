import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { format } from "date-fns";
import { ArrowLeft, Calendar, Pencil, Trash2, Check } from "lucide-react";
import { useTodoStore } from "../../../stores/todoStore";
import { useCategoryStore } from "../../../stores/categoryStore";
import { ConfirmDialog } from "../../../components/ui/ConfirmDialog";
import { EmptyState } from "../../../components/todo/EmptyState";
import { cn } from "../../../lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/todos/$todoId/")({
  component: TodoDetailPage,
});

function TodoDetailPage() {
  const navigate = useNavigate();
  const { todoId } = Route.useParams();
  const getTodoById = useTodoStore((state) => state.getTodoById);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const getCategoryById = useCategoryStore((state) => state.getCategoryById);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const todo = getTodoById(todoId);
  const category = todo ? getCategoryById(todo.categoryId) : undefined;

  const handleDelete = () => {
    deleteTodo(todoId);
    toast.success("Task deleted successfully");
    navigate({ to: "/" });
  };

  // Handle case where todo doesn't exist
  if (!todo) {
    return (
      <div className="page-transition min-h-screen pb-24">
        <header className="sticky top-0 z-10 glass-card rounded-none border-x-0 border-t-0 p-4">
          <button
            onClick={() => navigate({ to: "/" })}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Tasks
          </button>
        </header>
        <main className="p-4">
          <EmptyState
            title="Task not found"
            description="This task may have been deleted"
          />
        </main>
      </div>
    );
  }

  return (
    <div className="page-transition min-h-screen pb-24">
      {/* Header */}
      <header className="sticky top-0 z-10 glass-card rounded-none border-x-0 border-t-0 p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate({ to: "/" })}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>

          {/* Action buttons */}
          <div className="flex gap-2">
            <button
              onClick={() =>
                navigate({ to: "/todos/$todoId/edit", params: { todoId } })
              }
              className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
              aria-label="Edit task"
            >
              <Pencil className="w-5 h-5 text-primary" />
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="p-2 rounded-lg hover:bg-destructive/10 transition-colors"
              aria-label="Delete task"
            >
              <Trash2 className="w-5 h-5 text-destructive" />
            </button>
          </div>
        </div>
      </header>

      {/* Todo details */}
      <main className="p-4 space-y-4">
        {/* Main card */}
        <div className="glass-card-elevated p-6 animate-fade-in">
          {/* Completion toggle */}
          <div className="flex items-start gap-4 mb-4">
            <button
              onClick={() => {
                toggleTodo(todoId);
                toast.success(
                  todo.completed
                    ? "Task marked as incomplete"
                    : "Task completed!",
                );
              }}
              className={cn("todo-checkbox mt-1", todo.completed && "checked")}
            >
              {todo.completed && <Check className="w-4 h-4 text-white" />}
            </button>

            <div className="flex-1">
              {/* Title */}
              <h1
                className={cn(
                  "text-2xl font-bold text-foreground",
                  todo.completed && "line-through text-muted-foreground",
                )}
              >
                {todo.title}
              </h1>

              {/* Category and date */}
              <div className="flex items-center gap-3 mt-2 flex-wrap">
                {category && (
                  <span className={cn("category-badge", category.color)}>
                    {category.name}
                  </span>
                )}

                {todo.dueDate && (
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    Due {format(new Date(todo.dueDate), "MMMM d, yyyy")}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          {todo.description && (
            <div className="mt-6 pt-6 border-t border-border">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Description
              </h3>
              <p className="text-foreground whitespace-pre-wrap">
                {todo.description}
              </p>
            </div>
          )}

          {/* Created date */}
          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Created {format(new Date(todo.createdAt), "MMMM d, yyyy")}
            </p>
          </div>
        </div>

        {/* Quick actions */}
        <div
          className="flex gap-3 animate-fade-in"
          style={{ animationDelay: "100ms" }}
        >
          <button
            onClick={() => {
              toggleTodo(todoId);
              toast.success(
                todo.completed
                  ? "Task marked as incomplete"
                  : "Task completed!",
              );
            }}
            className={cn(
              "flex-1",
              todo.completed ? "btn-secondary" : "btn-primary",
            )}
          >
            {todo.completed ? "Mark Incomplete" : "Mark Complete"}
          </button>
        </div>
      </main>

      {/* Delete confirmation dialog */}
      {showDeleteConfirm && (
        <ConfirmDialog
          title="Delete Task"
          message={`Are you sure you want to delete "${todo.title}"? This action cannot be undone.`}
          confirmLabel="Delete"
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteConfirm(false)}
          variant="danger"
        />
      )}
    </div>
  );
}
