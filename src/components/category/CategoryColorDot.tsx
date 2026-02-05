const CATEGORY_COLORS: Record<string, string> = {
  'category-work': '#a855f7',
  'category-personal': '#ec4899',
  'category-health': '#10b981',
  'category-shopping': '#f97316',
  'category-ideas': '#06b6d4',
}

interface CategoryColorDotProps {
  colorClass: string
  size?: string
}

export function CategoryColorDot({ colorClass, size = 'w-4 h-4' }: CategoryColorDotProps) {
  return (
    <div
      className={`${size} rounded-[100px]`}
      style={{ backgroundColor: CATEGORY_COLORS[colorClass] || '#06b6d4' }}
    />
  )
}
