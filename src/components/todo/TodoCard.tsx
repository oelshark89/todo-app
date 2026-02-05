import { format } from "date-fns";
import { Calendar, Check } from "lucide-react";
import type { Todo, Category } from "../../types";
import { cn } from "../../lib/utils";

interface TodoCardProps {
  todo: Todo;
  category?: Category;
  onToggle: () => void;
  onClick: () => void;
}

export function TodoCard({ todo, category, onToggle, onClick }: TodoCardProps) {
  return (
    <div
      className={cn(
        "glass-card p-4 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group",
        todo.completed && "opacity-70",
      )}
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        {/* Custom checkbox */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
        >
          <div className={cn("todo-checkbox", todo.completed && "checked")}>
            {todo.completed && (
              <Check className="w-4 h-4 text-white animate-check" />
            )}
          </div>
        </div>

        {/* Todo content */}
        <div className="flex-1 min-w-0">
          {/* Title */}
          <h3
            className={cn(
              "font-semibold text-foreground mb-1 truncate transition-all",
              todo.completed && "line-through text-muted-foreground",
            )}
          >
            {todo.title}
          </h3>

          {/* Category badge and due date */}
          <div className="flex items-center gap-3 flex-wrap">
            {category && (
              <span className={cn("category-badge", category.color)}>
                {category.name}
              </span>
            )}
            {todo.dueDate && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="w-3 h-3" />
                {format(new Date(todo.dueDate), "MMM d")}
              </span>
            )}{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
