import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Bell, Shield, HelpCircle, Info, Sun, Moon, LogOut } from "lucide-react";
import { useThemeStore } from "../stores/themeStore";
import { useAuthStore } from "../stores/authStore";
import { cn } from "../lib/utils";

// Create the route for "/settings"
export const Route = createFileRoute("/settings")({
  component: SettingsPage,
});

// Settings items configuration
const settingsItems = [
  {
    icon: Bell,
    label: "Notifications",
    description: "Manage notification preferences",
  },
  { icon: Shield, label: "Privacy", description: "Data and privacy settings" },
  {
    icon: HelpCircle,
    label: "Help & Support",
    description: "Get help and contact us",
  },
  { icon: Info, label: "About", description: "App version and info" },
];

function SettingsPage() {
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useThemeStore();
  const { logout } = useAuthStore();

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate({ to: "/welcome", replace: true });
  };

  return (
    <div className="page-transition min-h-screen pb-24">
      {/* Header */}
      <header className="sticky top-0 z-10 glass-card rounded-none border-x-0 border-t-0 p-4">
        <h1 className="text-2xl font-bold gradient-text">Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Customize your experience
        </p>
      </header>

      <main className="p-4 space-y-4">
        {/* Appearance Section - Dark Mode Toggle */}
        <div className="glass-card-elevated p-5 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground">Appearance</h3>
              <p className="text-sm text-muted-foreground">Dark / Light mode</p>
            </div>
            <DarkModeToggle isDarkMode={isDarkMode} onToggle={toggleDarkMode} />
          </div>
        </div>

        {/* Other Settings */}
        <div className="space-y-2">
          {settingsItems.map((item, index) => (
            <button
              key={item.label}
              className="glass-card p-4 w-full flex items-center gap-4 transition-all duration-300 hover:scale-[1.02] animate-fade-in"
              style={{ animationDelay: `${(index + 1) * 80}ms` }}
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-medium text-foreground">{item.label}</p>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Logout Button */}
        <div
          className="animate-fade-in"
          style={{ animationDelay: "400ms" }}
        >
          <button
            onClick={handleLogout}
            className="glass-card p-4 w-full flex items-center gap-4 transition-all duration-300 hover:scale-[1.02] hover:bg-destructive/10"
          >
            <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
              <LogOut className="w-5 h-5 text-destructive" />
            </div>
            <div className="text-left">
              <p className="font-medium text-destructive">Logout</p>
              <p className="text-sm text-muted-foreground">
                Sign out of your account
              </p>
            </div>
          </button>
        </div>

        {/* App Info */}
        <div
          className="text-center py-8 animate-fade-in"
          style={{ animationDelay: "480ms" }}
        >
          <p className="text-sm text-muted-foreground">Aurora Todo App v1.0</p>
        </div>
      </main>
    </div>
  );
}

// Beautiful Dark Mode Toggle Component
function DarkModeToggle({
  isDarkMode,
  onToggle,
}: {
  isDarkMode: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="relative w-20 h-10 rounded-full p-1 transition-all duration-500 glass-card overflow-hidden group"
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {/* Background gradient */}
      <div
        className={cn(
          "absolute inset-0 transition-all duration-500",
          isDarkMode
            ? "bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900"
            : "bg-gradient-to-r from-amber-200 via-orange-200 to-amber-200",
        )}
      />

      {/* Stars for dark mode */}
      {isDarkMode && (
        <>
          <div className="absolute top-2 left-3 w-1 h-1 bg-white rounded-full animate-glow-pulse" />
          <div
            className="absolute top-4 left-6 w-0.5 h-0.5 bg-white/80 rounded-full animate-glow-pulse"
            style={{ animationDelay: "100ms" }}
          />
          <div
            className="absolute bottom-3 left-4 w-0.5 h-0.5 bg-white/60 rounded-full animate-glow-pulse"
            style={{ animationDelay: "200ms" }}
          />
        </>
      )}

      {/* Toggle knob */}
      <div
        className={cn(
          "relative w-8 h-8 rounded-full transition-all duration-500 flex items-center justify-center",
          isDarkMode
            ? "translate-x-10 bg-slate-800"
            : "translate-x-0 bg-amber-400",
        )}
        style={{
          boxShadow: isDarkMode
            ? "0 0 20px rgba(147, 51, 234, 0.5), inset 0 0 10px rgba(255, 255, 255, 0.1)"
            : "0 0 20px rgba(251, 191, 36, 0.5), 0 0 40px rgba(251, 191, 36, 0.3)",
        }}
      >
        {isDarkMode ? (
          <Moon className="w-4 h-4 text-purple-300" />
        ) : (
          <Sun className="w-4 h-4 text-amber-800" />
        )}
      </div>
    </button>
  );
}
