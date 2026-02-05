import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useTodoStore } from "../../../stores/todoStore";
import { useCategoryStore } from "../../../stores/categoryStore";
import { EmptyState } from "../../../components/todo/EmptyState";
import { PageHeader } from "../../../components/layout/PageHeader";
import { TodoFormFields } from "../../../components/todo/TodoFormFields";
import { TodoFormActions } from "../../../components/todo/TodoFormActions";
import { toast } from "sonner";

export const Route = createFileRoute("/todos/$todoId/edit")({
  component: EditTodoPage,
});

function EditTodoPage() {
  const navigate = useNavigate();
  const { todoId } = Route.useParams();
  const getTodoById = useTodoStore((state) => state.getTodoById);
  const updateTodo = useTodoStore((state) => state.updateTodo);
  const categories = useCategoryStore((state) => state.categories);

  const todo = getTodoById(todoId);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [errors, setErrors] = useState<{ title?: string }>({});

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description || "");
      setCategoryId(todo.categoryId);
      setDueDate(todo.dueDate ? todo.dueDate.split("T")[0] : "");
    }
  }, [todo]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setErrors({ title: "Title is required" });
      return;
    }

    updateTodo(todoId, {
      title: title.trim(),
      description: description.trim(),
      categoryId,
      dueDate: dueDate || undefined,
    });

    toast.success("Task updated successfully!");
    navigate({ to: "/todos/$todoId", params: { todoId } });
  };

  return (
    <div className="page-transition min-h-screen pb-24">
      <PageHeader
        title="Edit Task"
        subtitle="Update your task details"
        onBack={() => navigate({ to: "/todos/$todoId", params: { todoId } })}
      />

      <main className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <TodoFormFields
            title={title}
            description={description}
            categoryId={categoryId}
            dueDate={dueDate}
            errors={errors}
            categories={categories}
            onTitleChange={setTitle}
            onDescriptionChange={setDescription}
            onCategoryChange={setCategoryId}
            onDueDateChange={setDueDate}
            onErrorsClear={() => setErrors({})}
          />

          <TodoFormActions
            onCancel={() =>
              navigate({ to: "/todos/$todoId", params: { todoId } })
            }
            submitLabel="Save Changes"
          />
        </form>
      </main>
    </div>
  );
}
