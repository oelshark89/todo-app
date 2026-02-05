import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Plus, Pencil, Trash2, ChevronRight } from 'lucide-react'
import { useCategoryStore } from '../../stores/categoryStore'
import { useTodoStore } from '../../stores/todoStore'
import { SearchBar } from '../../components/todo/SearchBar'
import { EmptyState } from '../../components/todo/EmptyState'
import { ConfirmDialog } from '../../components/ui/ConfirmDialog'
import { cn } from '../../lib/utils'

// Create the route for "/categories"
export const Route = createFileRoute('/categories/')({
  component: CategoriesPage,
})

function CategoriesPage() {
  const navigate = useNavigate()
  const { categories, addCategory, updateCategory, deleteCategory } = useCategoryStore()
  const { getTodosByCategory } = useTodoStore()

  const [search, setSearch] = useState('')
  const [newCategoryName, setNewCategoryName] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingName, setEditingName] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: string; name: string } | null>(null)

  // Filter categories based on search
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase())
  )

  // Handle creating a new category
  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      addCategory(newCategoryName.trim())
      setNewCategoryName('')
    }
  }

  // Handle updating a category
  const handleUpdateCategory = (id: string) => {
    if (editingName.trim()) {
      updateCategory(id, editingName.trim())
      setEditingId(null)
      setEditingName('')
    }
  }

  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    if (deleteConfirm) {
      deleteCategory(deleteConfirm.id)
      setDeleteConfirm(null)
    }
  }

  return (
    <div className="page-transition min-h-screen pb-24">
      {/* Header */}
      <header className="sticky top-0 z-10 glass-card rounded-none border-x-0 border-t-0 p-4">
        <h1 className="text-2xl font-bold gradient-text mb-4">Categories</h1>
        <SearchBar value={search} onChange={setSearch} placeholder="Search categories..." />
      </header>

      <main className="p-4 space-y-4">
        {/* Add new category form */}
        <div className="glass-card p-4 animate-fade-in">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="New category name..."
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
              className="input-modern flex-1"
            />
            <button
              onClick={handleAddCategory}
              disabled={!newCategoryName.trim()}
              className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-5 h-5" />
              Add
            </button>
          </div>
        </div>

        {/* Categories list */}
        {filteredCategories.length === 0 ? (
          <EmptyState
            title={search ? 'No categories found' : 'No categories yet'}
            description={
              search
                ? 'Try a different search term'
                : 'Create your first category to organize your tasks'
            }
          />
        ) : (
          <div className="space-y-3">
            {filteredCategories.map((category, index) => {
              const todoCount = getTodosByCategory(category.id).length
              const isEditing = editingId === category.id

              return (
                <div
                  key={category.id}
                  className="glass-card p-4 animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {isEditing ? (
                    // Edit mode
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleUpdateCategory(category.id)
                          if (e.key === 'Escape') setEditingId(null)
                        }}
                        className="input-modern flex-1"
                        autoFocus
                      />
                      <button
                        onClick={() => handleUpdateCategory(category.id)}
                        className="btn-primary"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="btn-secondary"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    // View mode
                    <div className="flex items-center gap-4">
                      {/* Category info - clickable */}
                      <div
                        className="flex-1 flex items-center gap-3 cursor-pointer group"
                        onClick={() =>
                          navigate({
                            to: '/categories/$categoryId',
                            params: { categoryId: category.id },
                          })
                        }
                      >
                        {/* Color indicator */}
                        <div
                          className={cn(
                            'w-4 h-4 rounded-full',
                            category.color.replace('category-', 'bg-').replace('-', '-500')
                          )}
                          style={{
                            backgroundColor:
                              category.color === 'category-work'
                                ? 'hsl(270 70% 60%)'
                                : category.color === 'category-personal'
                                  ? 'hsl(330 70% 65%)'
                                  : category.color === 'category-health'
                                    ? 'hsl(160 60% 50%)'
                                    : category.color === 'category-shopping'
                                      ? 'hsl(30 80% 60%)'
                                      : 'hsl(200 80% 55%)',
                          }}
                        />

                        {/* Name and count */}
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {category.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {todoCount} {todoCount === 1 ? 'task' : 'tasks'}
                          </p>
                        </div>

                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>

                      {/* Action buttons */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingId(category.id)
                            setEditingName(category.name)
                          }}
                          className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
                          aria-label="Edit category"
                        >
                          <Pencil className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <button
                          onClick={() =>
                            setDeleteConfirm({ id: category.id, name: category.name })
                          }
                          className="p-2 rounded-lg hover:bg-destructive/10 transition-colors"
                          aria-label="Delete category"
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
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
  )
}
