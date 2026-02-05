# Todo App

A beautiful, modern Todo application built with React, TanStack Router, and glassmorphism design.

## 🚀 Live Demo

The app is deployed and accessible at: [https://todo-app-deploy-peach.vercel.app/](https://todo-app-deploy-peach.vercel.app/)

## Features

- **PIN Authentication**: Welcome screen with 4-digit PIN login (PIN: 1234)
- **Tab-based Navigation**: Home, Categories, Profile, and Settings tabs
- **Todo Management**: Create, read, update, and delete todos
- **Task Repeat**: Set tasks to repeat on specific days of the week
- **Date Filtering**: View tasks by Today, Tomorrow, This Week, Upcoming, or Overdue
- **Category Organization**: Organize todos by category with cascade delete
- **Editable Profile**: Customize name, about section, avatar, and tag with colors
- **Dark/Light Mode**: Beautiful theme toggle with animated sun/moon
- **Data Persistence**: All data persists in localStorage
- **Search**: Filter todos and categories instantly
- **Glassmorphism UI**: Modern frosted glass design aesthetic
- **Smooth Animations**: Page transitions and micro-interactions

## Tech Stack

| Technology | Purpose |
|------------|---------|
| [React](https://react.dev) | UI Framework |
| [TanStack Router](https://tanstack.com/router) | File-based routing |
| [Zustand](https://zustand-demo.pmnd.rs/) | State management |
| [Tailwind CSS](https://tailwindcss.com) | Styling |
| [Lucide React](https://lucide.dev) | Icons |
| [date-fns](https://date-fns.org) | Date formatting |
| [Vite](https://vite.dev) | Build tool |

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd todo-app

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
todo-app/
├── src/
│   ├── routes/                    # File-based routing (TanStack Router)
│   │   ├── __root.tsx             # Root layout with auth check
│   │   ├── welcome.tsx            # Welcome/PIN login page (/welcome)
│   │   ├── index.tsx              # Home page (/)
│   │   ├── profile.tsx            # Profile page (/profile)
│   │   ├── settings.tsx           # Settings page (/settings)
│   │   ├── todos/
│   │   │   ├── new.tsx            # Create todo (/todos/new)
│   │   │   └── $todoId/
│   │   │       ├── index.tsx      # Todo details (/todos/:id)
│   │   │       └── edit.tsx       # Edit todo (/todos/:id/edit)
│   │   └── categories/
│   │       ├── index.tsx          # Categories list (/categories)
│   │       └── $categoryId.tsx    # Category detail (/categories/:id)
│   │
│   ├── stores/                    # Zustand state management
│   │   ├── authStore.ts           # Authentication state & PIN validation
│   │   ├── todoStore.ts           # Todo state & actions
│   │   ├── categoryStore.ts       # Category state & actions
│   │   ├── profileStore.ts        # User profile state & actions
│   │   └── themeStore.ts          # Theme (dark/light) state
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   └── BottomNav.tsx      # Tab navigation component
│   │   ├── todo/
│   │   │   ├── TodoCard.tsx       # Todo list item
│   │   │   ├── SearchBar.tsx      # Search input component
│   │   │   └─��� EmptyState.tsx     # Empty state placeholder
│   │   └── ui/
│   │       └── ConfirmDialog.tsx  # Confirmation modal
│   │
│   ├── types/
│   │   └── index.ts               # TypeScript interfaces
│   │
│   ├── lib/
│   │   └── utils.ts               # Utility functions (cn)
│   │
│   ├── index.css                  # Global styles theme
│   ├── main.tsx                   # App entry point
│   └── routeTree.gen.ts           # Auto-generated route tree
│
├── vite.config.ts                 # Vite configuration
└── package.json
```

## Routing Structure

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | List all todos with search |
| `/todos/new` | New Todo | Create a new todo |
| `/todos/:id` | Todo Detail | View todo details |
| `/todos/:id/edit` | Edit Todo | Edit existing todo |
| `/categories` | Categories | List all categories |
| `/categories/:id` | Category Detail | View todos in category |
| `/profile` | Profile | User profile info |
| `/settings` | Settings | App settings & theme |

## State Management

### Auth Store
- `isAuthenticated`: Whether user has entered correct PIN
- `validatePin(pin)`: Validate PIN against hardcoded value (1234)
- `logout()`: Log out and return to welcome screen

### Todo Store
- `todos`: Array of all todos
- `addTodo()`: Create a new todo
- `updateTodo()`: Update existing todo
- `deleteTodo()`: Delete a todo
- `toggleTodo()`: Toggle completion status
- `getTodosByCategory()`: Filter by category

### Category Store
- `categories`: Array of all categories
- `addCategory()`: Create a new category
- `updateCategory()`: Update category name
- `deleteCategory()`: Delete category (cascade deletes todos)

### Profile Store
- `profile`: User profile data (name, avatar, about, tag, tagColor)
- `updateProfile()`: Update profile fields
- `resetProfile()`: Reset to defaults

### Theme Store
- `isDarkMode`: Current theme state
- `toggleDarkMode()`: Switch between themes

## Design System

###Theme Colors

| Color | Light Mode | Dark Mode |
|-------|------------|-----------|
| Primary | `hsl(270 70% 60%)` | `hsl(270 70% 65%)` |
| Background | Purple-tinted white | Deep purple-black |
| Cards | White + glass effect | Dark purple + glass |

### Category Colors

- **Work**: Purple
- **Personal**: Pink
- **Health**: Emerald
- **Shopping**: Orange
- **Ideas**: Cyan

## Assumptions Made

1. **User Profile**: Editable user information with customizable tag and color
2. **Categories**: Pre-defined with 5 default categories (can add more)
3. **Data Storage**: localStorage only (no backend)
4. **Mobile-first**: Designed for mobile with bottom navigation
5. **Mock Authentication**: PIN-based login (hardcoded PIN: 1234) for demo purposes

## Libraries Used

| Library | Why Used |
|---------|----------|
| `@tanstack/react-router` | Type-safe file-based routing |
| `@tanstack/router-plugin` | Vite plugin for route generation |
| `zustand` | Simple, performant state management with persistence |
| `lucide-react` | Modern, tree-shakeable icon library |
| `date-fns` | Lightweight date formatting |
| `clsx` + `tailwind-merge` | Conditional class merging |
| `uuid` | Generate unique IDs for todos/categories |

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```
