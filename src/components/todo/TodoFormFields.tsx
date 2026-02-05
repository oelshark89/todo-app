import { cn } from "../../lib/utils";
import type { Category } from "../../types";

interface TodoFormFieldsProps {
  title: string;
  description: string;
  categoryId: string;
  dueDate: string;
  errors: { title?: string };
  categories: Category[];
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onDueDateChange: (value: string) => void;
  onErrorsClear: () => void;
}

export function TodoFormFields({
  title,
  description,
  categoryId,
  dueDate,
  errors,
  categories,
  onTitleChange,
  onDescriptionChange,
  onCategoryChange,
  onDueDateChange,
  onErrorsClear,
}: TodoFormFieldsProps) {
  return (
    <>
      <div className="animate-fade-in">
        <label className="block text-sm font-medium text-foreground mb-2">
          Title <span className="text-destructive">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => {
            onTitleChange(e.target.value);
            if (errors.title) onErrorsClear();
          }}
          placeholder="What needs to be done?"
          className={cn(
            "input-modern",
            errors.title && "ring-2 ring-destructive/50",
          )}
        />
        {errors.title && (
          <p className="text-sm text-destructive mt-1">{errors.title}</p>
        )}
      </div>

      <div className="animate-fade-in" style={{ animationDelay: "50ms" }}>
        <label className="block text-sm font-medium text-foreground mb-2">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="Add more details..."
          rows={4}
          className="input-modern resize-none"
        />
      </div>

      <div className="animate-fade-in" style={{ animationDelay: "100ms" }}>
        <label className="block text-sm font-medium text-foreground mb-2">
          Category
        </label>
        <select
          value={categoryId}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="input-modern"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="animate-fade-in" style={{ animationDelay: "150ms" }}>
        <label className="block text-sm font-medium text-foreground mb-2">
          Due Date
        </label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => onDueDateChange(e.target.value)}
          className="input-modern"
        />
      </div>
    </>
  );
}
