import { useState, useEffect } from 'react'
import { X, AlertCircle, CheckCircle } from "lucide-react"
import * as LucideIcons from 'lucide-react'
import api from '@/lib/axios'

const InactiveCategoriesModal = ({setOpen,open,loading, inactiveCategories,setInactiveCategories}) => {
  const [error, setError] = useState(null)
  const [activating, setActivating] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)





  const handleActivate = async (categoryId) => {
    try {
      setActivating(categoryId)
      setSuccessMessage(null)
      
      // Replace with your actual API endpoint for activating categories
      const response = await api.put(`/activateCategory/${categoryId}`)
      console.log("response",response)
      
      if (response.status) {
        // Remove the activated category from the list
        setInactiveCategories(inactiveCategories.filter(cat => cat._id !== categoryId))
        setSuccessMessage('Category activated successfully!')
        
        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMessage(null), 3000)
      } else {
        setError('Failed to activate category')
      }
    } catch (err) {
      setError('Error activating category: ' + err.message)
    } finally {
      setActivating(null)
    }
  }

  const getColorClass = (color) => {
    const colorMap = {
      amber: 'bg-amber-500',
      blue: 'bg-blue-500',
      red: 'bg-red-500',
      green: 'bg-green-500',
      purple: 'bg-purple-500',
      pink: 'bg-pink-500',
      indigo: 'bg-indigo-500',
      yellow: 'bg-yellow-500',
      teal: 'bg-teal-500',
      cyan: 'bg-cyan-500',
    }
    return colorMap[color] || 'bg-gray-500'
  }

  const renderIcon = (iconName) => {
    const IconComponent = LucideIcons[iconName]
    if (!IconComponent) return null
    return <IconComponent className="w-5 h-5 text-white" />
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm bg-opacity-50 transition-opacity"
          onClick={() => setOpen(false)}
        />
        
        {/* Modal */}
        <div className="relative w-full max-w-2xl transform overflow-hidden rounded-lg border border-white/20 shadow-xl transition-all">
          <div className=" px-6 py-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Inactive Categories</h2>
                <p className="mt-1 text-sm text-white">
                  Activate categories to make them available again
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md text-white hover:text-gray-500 focus:outline-none"
              >
                <span className="sr-only">Close</span>
                <X className="h-6 w-6" />
              </button>
            </div>

            {successMessage && (
              <div className="mt-4 flex items-center gap-2 rounded-md bg-green-50 p-3 text-sm text-green-800">
                <CheckCircle className="h-5 w-5" />
                {successMessage}
              </div>
            )}

            {error && (
              <div className="mt-4 flex items-center gap-2 rounded-md bg-red-50 p-3 text-sm text-red-800">
                <AlertCircle className="h-5 w-5" />
                {error}
              </div>
            )}

            <div className="mt-6">
              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-600"></div>
                </div>
              ) : inactiveCategories.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-white">No inactive categories found</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {inactiveCategories.map((category) => (
                    <div
                      key={category._id}
                      className="flex items-center justify-between rounded-lg border border-white/20 p-4 hover:border-gray-300 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${getColorClass(category.color)}`}>
                          {renderIcon(category.icon)}
                        </div>
                        <div>
                          <h3 className="font-medium text-white">{category.name}</h3>
                          <div className="mt-1 flex items-center gap-2 text-xs text-white">
                            <span className={`inline-flex items-center rounded-full px-2 py-0.5 ${
                              category.type === 'income' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {category.type}
                            </span>
                            {category.description && (
                              <span>• {category.description}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleActivate(category._id)}
                        disabled={activating === category._id}
                        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {activating === category._id ? (
                          <span className="flex items-center gap-2">
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                            Activating...
                          </span>
                        ) : (
                          'Activate'
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InactiveCategoriesModal