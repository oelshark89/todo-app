import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useTodoStore } from "../../stores/todoStore";
import { useCategoryStore } from "../../stores/categoryStore";
import { PageHeader } from "../../components/layout/PageHeader";
import { TodoFormFields } from "../../components/todo/TodoFormFields";
import { TodoFormActions } from "../../components/todo/TodoFormActions";
import { toast } from "sonner";

export const Route = createFileRoute("/todos/new")({
  component: NewTodoPage,
});

function NewTodoPage() {
  const navigate = useNavigate();
  const addTodo = useTodoStore((state) => state.addTodo);
  const categories = useCategoryStore((state) => state.categories);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState(categories[0]?.id || "");
  const [dueDate, setDueDate] = useState("");
  const [errors, setErrors] = useState<{ title?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setErrors({ title: "Title is required" });
      return;
    }

    addTodo({
      title: title.trim(),
      description: description.trim(),
      categoryId,
      dueDate: dueDate || undefined,
    });

    toast.success("Task created successfully!");
    navigate({ to: "/" });
  };

  return (
    <div className="page-transition min-h-screen pb-24">
      <PageHeader
        title="New Task"
        subtitle="Create a new task"
        onBack={() => navigate({ to: "/" })}
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
            onCancel={() => navigate({ to: "/" })}
            submitLabel="Create Task"
          />
        </form>
      </main>
    </div>
  );
}
