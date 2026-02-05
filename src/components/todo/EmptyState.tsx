import { ClipboardList } from 'lucide-react'

interface EmptyStateProps {
  title?: string
  description?: string
}

export function EmptyState({
  title = 'No tasks yet',
  description = 'Create your first task to get started',
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 animate-fade-in">
      {/* Icon with floating animation */}
      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 animate-float">
        <ClipboardList className="w-10 h-10 text-primary" />
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-foreground mb-2 text-center">
        {title}
      </h3>

      {/* Description */}
      <p className="text-muted-foreground text-center max-w-xs">
        {description}
      </p>
    </div>
  )
}
