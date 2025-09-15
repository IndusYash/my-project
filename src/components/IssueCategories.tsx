import { IssueCategoriesProps } from '../types'
import { ISSUE_CATEGORIES } from '../utils/constants'
import { Check, Plus } from 'lucide-react'

const IssueCategories = ({ selectedCategories, onSelectionChange }: IssueCategoriesProps) => {
  const toggleCategory = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      onSelectionChange(selectedCategories.filter(id => id !== categoryId))
    } else {
      onSelectionChange([...selectedCategories, categoryId])
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 animate-slide-up border border-gray-100">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
          <Plus className="w-4 h-4 text-purple-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Select Issue Categories</h2>
      </div>
      <p className="text-gray-600 mb-6 leading-relaxed">
        Choose the types of civic issues present in your photo. You can select multiple categories:
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {ISSUE_CATEGORIES.map((category) => {
          const isSelected = selectedCategories.includes(category.id)
          
          return (
            <button
              key={category.id}
              onClick={() => toggleCategory(category.id)}
              className={`
                relative p-4 rounded-xl border-2 text-left transition-all duration-300 transform hover:scale-105 group
                ${isSelected 
                  ? `${category.color} border-current shadow-lg scale-105` 
                  : 'bg-gray-50 border-gray-200 hover:border-gray-300 hover:bg-gray-100 hover:shadow-md'
                }
              `}
            >
              <div className="flex items-start gap-3">
                <div className={`text-2xl transition-transform duration-300 ${isSelected ? 'scale-110' : 'group-hover:scale-110'}`}>
                  {category.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-semibold text-sm transition-colors duration-300 ${isSelected ? 'text-current' : 'text-gray-700 group-hover:text-gray-900'}`}>
                    {category.name}
                  </h3>
                  <p className={`text-xs mt-1 leading-relaxed transition-colors duration-300 ${isSelected ? 'opacity-90' : 'text-gray-500 group-hover:text-gray-600'}`}>
                    {category.description}
                  </p>
                </div>
                {isSelected && (
                  <div className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full p-1.5 shadow-lg animate-bounce-slow">
                    <Check className="w-3 h-3" />
                  </div>
                )}
              </div>
            </button>
          )
        })}
      </div>
      
      {selectedCategories.length > 0 && (
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl animate-fade-in">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping-slow"></div>
            <p className="text-sm text-blue-800 font-medium">
              <span className="font-bold text-blue-900">{selectedCategories.length}</span> categor{selectedCategories.length === 1 ? 'y' : 'ies'} selected
            </p>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {selectedCategories.map(categoryId => {
              const category = ISSUE_CATEGORIES.find(cat => cat.id === categoryId)
              return category ? (
                <span key={categoryId} className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-xs font-medium">
                  <span>{category.icon}</span>
                  {category.name}
                </span>
              ) : null
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default IssueCategories
