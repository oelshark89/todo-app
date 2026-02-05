import { ArrowLeft } from "lucide-react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  backLabel?: string;
  children?: React.ReactNode;
}

export function PageHeader({
  title,
  subtitle,
  onBack,
  backLabel = "Back",
  children,
}: PageHeaderProps) {
  return (
    <header className="sticky top-0 z-10 glass-card rounded-none border-x-0 border-t-0 p-4">
      {onBack && (
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-3"
        >
          <ArrowLeft className="w-5 h-5" />
          {backLabel}
        </button>
      )}
      <h1 className="text-2xl font-bold gradient-text">{title}</h1>
      {subtitle && (
        <p className="text-muted-foreground text-sm mt-1">{subtitle}</p>
      )}
      {children}
    </header>
  );
}
