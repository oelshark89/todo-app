import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Pencil, Check, X, Camera } from "lucide-react";
import { useProfileStore } from "../stores/profileStore";
import { useTodoStore } from "../stores/todoStore";
import type { TagColor } from "../types";
import { TAG_COLORS } from "../types";
import { cn } from "../lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const profile = useProfileStore((state) => state.profile);
  const updateProfile = useProfileStore((state) => state.updateProfile);
  const todos = useTodoStore((state) => state.todos);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(profile.name);
  const [editAbout, setEditAbout] = useState(profile.about);
  const [editAvatar, setEditAvatar] = useState(profile.avatar);
  const [editTag, setEditTag] = useState(profile.tag);
  const [editTagColor, setEditTagColor] = useState<TagColor>(profile.tagColor);

  const totalTasks = todos.length;
  const completedTasks = todos.filter((t) => t.completed).length;

  const handleSave = () => {
    if (editName.trim()) {
      updateProfile({
        name: editName.trim(),
        about: editAbout.trim(),
        avatar:
          editAvatar.trim() ||
          `https://api.dicebear.com/7.x/avataaars/svg?seed=${editName}`,
        tag: editTag.trim() || "Productivity Enthusiast",
        tagColor: editTagColor,
      });
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    setEditName(profile.name);
    setEditAbout(profile.about);
    setEditAvatar(profile.avatar);
    setEditTag(profile.tag);
    setEditTagColor(profile.tagColor);
    setIsEditing(false);
  };

  // Generate new avatar
  const generateNewAvatar = () => {
    const seed = Math.random().toString(36).substring(7);
    setEditAvatar(`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`);
  };

  return (
    <div className="page-transition min-h-screen pb-24">
      {/* Header */}
      <header className="sticky top-0 z-10 glass-card rounded-none border-x-0 border-t-0 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold gradient-text">Profile</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Your personal information
            </p>
          </div>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
              aria-label="Edit profile"
            >
              <Pencil className="w-5 h-5 text-primary" />
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleCancel}
                className="p-2 rounded-lg hover:bg-destructive/10 transition-colors"
                aria-label="Cancel"
              >
                <X className="w-5 h-5 text-destructive" />
              </button>
              <button
                onClick={handleSave}
                className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
                aria-label="Save"
              >
                <Check className="w-5 h-5 text-primary" />
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Profile content */}
      <main className="p-4 space-y-6">
        {/* Profile card */}
        <div className="glass-card-elevated p-6 animate-fade-in">
          <div className="flex flex-col items-center text-center">
            {/* Avatar */}
            <div className="relative mb-4">
              <img
                src={isEditing ? editAvatar : profile.avatar}
                alt={profile.name}
                className="w-28 h-28 rounded-[100px] border-4 border-primary/20 shadow-lg"
              />
              {/* Glow effect behind avatar */}
              <div className="absolute inset-0 rounded-[100px] aurora-glow opacity-50 -z-10 scale-110" />

              {/* Change avatar button */}
              {isEditing && (
                <button
                  onClick={generateNewAvatar}
                  className="absolute bottom-0 right-0 p-2 rounded-[100px] bg-primary text-white shadow-lg hover:scale-110 transition-transform"
                  aria-label="Change avatar"
                >
                  <Camera className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Name */}
            {isEditing ? (
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="input-modern text-center text-xl font-bold mb-2"
                placeholder="Your name"
              />
            ) : (
              <h2 className="text-2xl font-bold text-foreground mb-1">
                {profile.name}
              </h2>
            )}

            {/* Status badge */}
            {isEditing ? (
              <div className="flex flex-col items-center gap-3 mb-4">
                <input
                  type="text"
                  value={editTag}
                  onChange={(e) => setEditTag(e.target.value)}
                  className="input-modern text-center text-sm max-w-[200px]"
                  placeholder="Your tag"
                />
                {/* Color picker */}
                <div className="flex gap-2">
                  {TAG_COLORS.map((color) => (
                    <button
                      key={color.id}
                      type="button"
                      onClick={() => setEditTagColor(color.id)}
                      className={cn(
                        "w-8 h-8 rounded-[100px] transition-all duration-200 border-2",
                        editTagColor === color.id
                          ? "border-foreground scale-110"
                          : "border-transparent hover:scale-105",
                      )}
                      style={{ backgroundColor: color.preview }}
                      title={color.label}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <span className={cn("category-badge mb-4", profile.tagColor)}>
                {profile.tag}
              </span>
            )}
          </div>
        </div>

        {/* About section */}
        <div
          className="glass-card p-5 animate-fade-in"
          style={{ animationDelay: "100ms" }}
        >
          <h3 className="font-semibold text-foreground mb-3">About</h3>
          {isEditing ? (
            <textarea
              value={editAbout}
              onChange={(e) => setEditAbout(e.target.value)}
              className="input-modern resize-none"
              rows={4}
              placeholder="Tell us about yourself..."
            />
          ) : (
            <p className="text-muted-foreground leading-relaxed">
              {profile.about}
            </p>
          )}
        </div>

        {/* Avatar URL (only in edit mode) */}
        {isEditing && (
          <div
            className="glass-card p-5 animate-fade-in"
            style={{ animationDelay: "150ms" }}
          >
            <h3 className="font-semibold text-foreground mb-3">Avatar URL</h3>
            <input
              type="text"
              value={editAvatar}
              onChange={(e) => setEditAvatar(e.target.value)}
              className="input-modern"
              placeholder="Enter image URL or click camera to generate"
            />
            <p className="text-xs text-muted-foreground mt-2">
              Click the camera icon on your avatar to generate a new one
            </p>
          </div>
        )}

        {/* Stats section */}
        <div
          className="grid grid-cols-3 gap-3 animate-fade-in"
          style={{ animationDelay: "200ms" }}
        >
          <StatCard label="Tasks" value={totalTasks.toString()} />
          <StatCard label="Completed" value={completedTasks.toString()} />
          <StatCard
            label="Pending"
            value={(totalTasks - completedTasks).toString()}
          />
        </div>
      </main>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass-card p-4 text-center">
      <p className="text-2xl font-bold gradient-text">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
