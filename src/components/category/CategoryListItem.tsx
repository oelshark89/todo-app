import { Pencil, Trash2, ChevronRight } from "lucide-react";
import { CategoryColorDot } from "./CategoryColorDot";
import type { Category } from "../../types";

interface CategoryListItemProps {
  category: Category;
  todoCount: number;
  isEditing: boolean;
  editingName: string;
  onEditingNameChange: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onClick: () => void;
  index: number;
}

export function CategoryListItem({
  category,
  todoCount,
  isEditing,
  editingName,
  onEditingNameChange,
  onSave,
  onCancel,
  onEdit,
  onDelete,
  onClick,
  index,
}: CategoryListItemProps) {
  if (isEditing) {
    return (
      <div
        className="glass-card p-4 animate-fade-in"
        style={{ animationDelay: `${index * 50}ms` }}
      >
        <div className="flex gap-3">
          <input
            type="text"
            value={editingName}
            onChange={(e) => onEditingNameChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSave();
              if (e.key === "Escape") onCancel();
            }}
            className="input-modern flex-1"
            autoFocus
          />
          <button onClick={onSave} className="btn-primary">
            Save
          </button>
          <button onClick={onCancel} className="btn-secondary">
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="glass-card p-4 animate-fade-in"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-center gap-4">
        <div
          className="flex-1 flex items-center gap-3 cursor-pointer group"
          onClick={onClick}
        >
          <CategoryColorDot colorClass={category.color} />

          <div className="flex-1">
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {category.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {todoCount} {todoCount === 1 ? "task" : "tasks"}
            </p>
          </div>

          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>

        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
            aria-label="Edit category"
          >
            <Pencil className="w-4 h-4 text-muted-foreground" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 rounded-lg hover:bg-destructive/10 transition-colors"
            aria-label="Delete category"
          >
            <Trash2 className="w-4 h-4 text-destructive" />
          </button>
        </div>
      </div>
    </div>
  );
}
