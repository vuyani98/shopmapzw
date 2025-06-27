"use client"

interface CategoryFilterProps {
  categories: string[]
  selected: string
  onSelect: (category: string) => void
}

export default function CategoryFilter({ categories, selected, onSelect }: CategoryFilterProps) {
  function getCategoryIcon(category: string) {
    const icons: Record<string, string> = {
      all: "🏪",
      clothing: "👕",
      electronics: "📱",
      food: "🍽️",
      beauty: "💄",
      accessories: "👜",
      services: "🔧",
      other: "📦",
    }
    return icons[category] || icons.other
  }

  function getCategoryLabel(category: string) {
    return category === "all" ? "All" : category.charAt(0).toUpperCase() + category.slice(1)
  }

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide catScrollBar">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all catBtn ${
            selected === category
              ? "bg-accent-blue text-white shadow-lg"
              : "bg-white bg-opacity-20 text-primary-light border border-accent-blue border-opacity-30 hover:bg-opacity-30 hover:border-opacity-50"
          }`}
        >
          <span>{getCategoryIcon(category)}</span>
          <span>{getCategoryLabel(category)}</span>
        </button>
      ))}
    </div>
  )
}
