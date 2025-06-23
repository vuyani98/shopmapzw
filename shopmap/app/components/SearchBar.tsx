"use client"

import { Search, X } from "lucide-react"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  function clearSearch() {
    onChange("")
  }

  return (
    <div className="bar-container relative max-w-2xl mx-auto">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-primary-dark opacity-50" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search shops, products, or locations..."
        className="bar-input block w-full pl-12 pr-12 py-3 border border-accent-blue bg-white text-primary-dark rounded-xl text-base placeholder-primary-dark placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent transition-all"
      />
      {value && (
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
          <button
            onClick={clearSearch}
            className="text-primary-dark opacity-50 hover:opacity-75 p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  )
}
