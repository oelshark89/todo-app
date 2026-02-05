import { Plus } from "lucide-react";

interface AddCategoryFormProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export function AddCategoryForm({
  value,
  onChange,
  onSubmit,
}: AddCategoryFormProps) {
  return (
    <div className="glass-card p-4 animate-fade-in">
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="New category name..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSubmit()}
          className="input-modern flex-1"
        />
        <button
          onClick={onSubmit}
          disabled={!value.trim()}
          className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-5 h-5" />
          Add
        </button>
      </div>
    </div>
  );
}
