interface TodoFormActionsProps {
  onCancel: () => void;
  submitLabel: string;
}

export function TodoFormActions({
  onCancel,
  submitLabel,
}: TodoFormActionsProps) {
  return (
    <div
      className="flex gap-3 pt-4 animate-fade-in"
      style={{ animationDelay: "200ms" }}
    >
      <button type="button" onClick={onCancel} className="btn-secondary flex-1">
        Cancel
      </button>
      <button type="submit" className="btn-primary flex-1">
        {submitLabel}
      </button>
    </div>
  );
}
