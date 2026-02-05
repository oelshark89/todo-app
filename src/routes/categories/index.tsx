import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useCategoryStore } from "../../stores/categoryStore";
import { useTodoStore } from "../../stores/todoStore";
import { SearchBar } from "../../components/todo/SearchBar";
import { EmptyState } from "../../components/todo/EmptyState";
import { ConfirmDialog } from "../../components/ui/ConfirmDialog";
import { AddCategoryForm } from "../../components/category/AddCategoryForm";
import { CategoryListItem } from "../../components/category/CategoryListItem";
import { toast } from "sonner";

export const Route = createFileRoute("/categories/")({
  component: CategoriesPage,
});

function CategoriesPage() {
  const navigate = useNavigate();
  const categories = useCategoryStore((state) => state.categories);
  const addCategory = useCategoryStore((state) => state.addCategory);
  const updateCategory = useCategoryStore((state) => state.updateCategory);
  const deleteCategory = useCategoryStore((state) => state.deleteCategory);
  const getTodosByCategory = useTodoStore((state) => state.getTodosByCategory);

  const [search, setSearch] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<{
    id: string;
    name: string;
  } | null>(null);

  // Filter categories based on search
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase()),
  );

  // Handle creating a new category
  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      addCategory(newCategoryName.trim());
      toast.success("Category created successfully!");
      setNewCategoryName("");
    }
  };

  // Handle updating a category
  const handleUpdateCategory = (id: string) => {
    if (editingName.trim()) {
      updateCategory(id, editingName.trim());
      toast.success("Category updated successfully!");
      setEditingId(null);
      setEditingName("");
    }
  };

  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    if (deleteConfirm) {
      deleteCategory(deleteConfirm.id);
      toast.success("Category deleted successfully");
      setDeleteConfirm(null);
    }
  };

  return (
    <div className="page-transition min-h-screen pb-24">
      {/* Header */}
      <header className="sticky top-0 z-10 glass-card rounded-none border-x-0 border-t-0 p-4">
        <h1 className="text-2xl font-bold gradient-text mb-4">Categories</h1>
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search categories..."
        />
      </header>

      <main className="p-4 space-y-4">
        <AddCategoryForm
          value={newCategoryName}
          onChange={setNewCategoryName}
          onSubmit={handleAddCategory}
        />

        {filteredCategories.length === 0 ? (
          <EmptyState
            title={search ? "No categories found" : "No categories yet"}
            description={
              search
                ? "Try a different search term"
                : "Create your first category to organize your tasks"
            }
          />
        ) : (
          <div className="space-y-3">
            {filteredCategories.map((category, index) => (
              <CategoryListItem
                key={category.id}
                category={category}
                todoCount={getTodosByCategory(category.id).length}
                isEditing={editingId === category.id}
                editingName={editingName}
                onEditingNameChange={setEditingName}
                onSave={() => handleUpdateCategory(category.id)}
                onCancel={() => setEditingId(null)}
                onEdit={() => {
                  setEditingId(category.id);
                  setEditingName(category.name);
                }}
                onDelete={() =>
                  setDeleteConfirm({ id: category.id, name: category.name })
                }
                onClick={() =>
                  navigate({
                    to: "/categories/$categoryId",
                    params: { categoryId: category.id },
                  })
                }
                index={index}
              />
            ))}
          </div>
        )}
      </main>

      {/* Delete confirmation dialog */}
      {deleteConfirm && (
        <ConfirmDialog
          title="Delete Category"
          message={`Are you sure you want to delete "${deleteConfirm.name}"? This will also delete all tasks in this category.`}
          confirmLabel="Delete"
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteConfirm(null)}
          variant="danger"
        />
      )}
    </div>
  );
}
