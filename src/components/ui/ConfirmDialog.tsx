import { cn } from '../../lib/utils'

interface ConfirmDialogProps {
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  onConfirm: () => void
  onCancel: () => void
  variant?: 'default' | 'danger'
}

export function ConfirmDialog({
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  variant = 'default',
}: ConfirmDialogProps) {
  return (
    // Backdrop
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onCancel}
    >
      {/* Dialog */}
      <div
        className="glass-card-elevated p-6 max-w-sm w-full animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title */}
        <h2 className="text-xl font-bold text-foreground mb-2">{title}</h2>

        {/* Message */}
        <p className="text-muted-foreground mb-6">{message}</p>

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <button onClick={onCancel} className="btn-secondary">
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={cn(
              variant === 'danger' ? 'btn-danger' : 'btn-primary'
            )}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
