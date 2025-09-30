"use client";

import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Lock, Tag, TrendingUp, TrendingDown, Utensils, Car, Zap, Film, Home, ShoppingCart, Heart, Book, Plane, Gift, Coffee, Wifi, Phone, Briefcase, Dumbbell, Music, Palette, Wrench, Baby, PawPrint, Smartphone, Gamepad2, Pizza, GraduationCap, Stethoscope, Bus, Shirt, Building2 } from 'lucide-react';

const CategoriesPage = () => {
  const [activeTab, setActiveTab] = useState('expense');
  const [showAddModal, setShowAddModal] = useState(false);

  const expenseCategories = [
    // Default Categories
    { id: 1, name: 'Food & Dining', icon: 'Utensils', color: 'orange', isDefault: true, transactions: 45, totalSpent: 425.50, isExpense: true },
    { id: 2, name: 'Transport', icon: 'Car', color: 'blue', isDefault: true, transactions: 28, totalSpent: 245.00, isExpense: true },
    { id: 3, name: 'Utilities', icon: 'Zap', color: 'yellow', isDefault: true, transactions: 12, totalSpent: 185.30, isExpense: true },
    { id: 4, name: 'Entertainment', icon: 'Film', color: 'pink', isDefault: true, transactions: 18, totalSpent: 102.20, isExpense: true },
    { id: 5, name: 'Housing', icon: 'Home', color: 'purple', isDefault: true, transactions: 8, totalSpent: 1200.00, isExpense: true },
    { id: 6, name: 'Shopping', icon: 'ShoppingCart', color: 'red', isDefault: true, transactions: 32, totalSpent: 465.80, isExpense: true },
    { id: 7, name: 'Healthcare', icon: 'Heart', color: 'green', isDefault: true, transactions: 6, totalSpent: 180.00, isExpense: true },
    { id: 8, name: 'Education', icon: 'Book', color: 'indigo', isDefault: true, transactions: 15, totalSpent: 250.00, isExpense: true },
    
    // Custom Categories
    { id: 9, name: 'Gym & Fitness', icon: 'Dumbbell', color: 'cyan', isDefault: false, transactions: 12, totalSpent: 120.00, isExpense: true },
    { id: 10, name: 'Coffee Shops', icon: 'Coffee', color: 'amber', isDefault: false, transactions: 24, totalSpent: 85.50, isExpense: true },
    { id: 11, name: 'Pet Care', icon: 'PawPrint', color: 'rose', isDefault: false, transactions: 8, totalSpent: 95.00, isExpense: true },
    { id: 12, name: 'Gaming', icon: 'Gamepad2', color: 'violet', isDefault: false, transactions: 5, totalSpent: 150.00, isExpense: true },
    { id: 13, name: 'Internet', icon: 'Wifi', color: 'teal', isDefault: false, transactions: 1, totalSpent: 75.00, isExpense: true },
    { id: 14, name: 'Phone Bill', icon: 'Phone', color: 'slate', isDefault: false, transactions: 1, totalSpent: 50.00, isExpense: true },
  ];

  const incomeCategories = [
    // Default Categories
    { id: 101, name: 'Salary', icon: 'Briefcase', color: 'green', isDefault: true, transactions: 2, totalSpent: 5000.00, isExpense: false },
    { id: 102, name: 'Freelance', icon: 'Palette', color: 'purple', isDefault: true, transactions: 8, totalSpent: 1200.00, isExpense: false },
    { id: 103, name: 'Investments', icon: 'TrendingUp', color: 'blue', isDefault: true, transactions: 3, totalSpent: 450.00, isExpense: false },
    
    // Custom Categories
    { id: 104, name: 'Side Projects', icon: 'Wrench', color: 'orange', isDefault: false, transactions: 5, totalSpent: 800.00, isExpense: false },
    { id: 105, name: 'Gifts Received', icon: 'Gift', color: 'pink', isDefault: false, transactions: 4, totalSpent: 250.00, isExpense: false },
  ];

  const iconMap = {
    Utensils, Car, Zap, Film, Home, ShoppingCart, Heart, Book, Plane, Gift, 
    Coffee, Wifi, Phone, Briefcase, Dumbbell, Music, Palette, Wrench, Baby, 
    PawPrint, Smartphone, Gamepad2, Pizza, GraduationCap, Stethoscope, Bus, 
    Shirt, Building2, TrendingUp, TrendingDown
  };

  const getCategoryColor = (color) => {
    const colors = {
      orange: { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/30', solid: 'bg-orange-500' },
      blue: { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30', solid: 'bg-blue-500' },
      yellow: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/30', solid: 'bg-yellow-500' },
      pink: { bg: 'bg-pink-500/20', text: 'text-pink-400', border: 'border-pink-500/30', solid: 'bg-pink-500' },
      purple: { bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-500/30', solid: 'bg-purple-500' },
      red: { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30', solid: 'bg-red-500' },
      green: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30', solid: 'bg-green-500' },
      indigo: { bg: 'bg-indigo-500/20', text: 'text-indigo-400', border: 'border-indigo-500/30', solid: 'bg-indigo-500' },
      cyan: { bg: 'bg-cyan-500/20', text: 'text-cyan-400', border: 'border-cyan-500/30', solid: 'bg-cyan-500' },
      rose: { bg: 'bg-rose-500/20', text: 'text-rose-400', border: 'border-rose-500/30', solid: 'bg-rose-500' },
      amber: { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/30', solid: 'bg-amber-500' },
      teal: { bg: 'bg-teal-500/20', text: 'text-teal-400', border: 'border-teal-500/30', solid: 'bg-teal-500' },
      violet: { bg: 'bg-violet-500/20', text: 'text-violet-400', border: 'border-violet-500/30', solid: 'bg-violet-500' },
      slate: { bg: 'bg-slate-500/20', text: 'text-slate-400', border: 'border-slate-500/30', solid: 'bg-slate-500' },
    };
    return colors[color] || colors.purple;
  };

  const renderIcon = (iconName) => {
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent size={20} /> : <Tag size={20} />;
  };

  const currentCategories = activeTab === 'expense' ? expenseCategories : incomeCategories;
  const defaultCategories = currentCategories.filter(c => c.isDefault);
  const customCategories = currentCategories.filter(c => !c.isDefault);

  const totalTransactions = currentCategories.reduce((sum, c) => sum + c.transactions, 0);
  const totalAmount = currentCategories.reduce((sum, c) => sum + c.totalSpent, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Categories</h1>
              <p className="text-purple-200">Manage your expense and income categories</p>
            </div>
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-purple-500/50"
            >
              <Plus size={20} />
              Add Category
            </button>
          </div>

          {/* Tab Switcher */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-2 border border-white/20 inline-flex gap-2">
            <button
              onClick={() => setActiveTab('expense')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'expense'
                  ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg'
                  : 'text-purple-200 hover:text-white hover:bg-white/5'
              }`}
            >
              <TrendingDown size={20} />
              Expense Categories
            </button>
            <button
              onClick={() => setActiveTab('income')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'income'
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
                  : 'text-purple-200 hover:text-white hover:bg-white/5'
              }`}
            >
              <TrendingUp size={20} />
              Income Categories
            </button>
          </div>
        </div>

        {/* Statistics Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-purple-600/20 rounded-xl">
                <Tag className="text-purple-400" size={24} />
              </div>
              <div>
                <p className="text-purple-200 text-sm">Total Categories</p>
                <p className="text-3xl font-bold text-white">{currentCategories.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-blue-600/20 rounded-xl">
                <TrendingUp className="text-blue-400" size={24} />
              </div>
              <div>
                <p className="text-purple-200 text-sm">Total Transactions</p>
                <p className="text-3xl font-bold text-white">{totalTransactions}</p>
              </div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-3 rounded-xl ${activeTab === 'expense' ? 'bg-orange-600/20' : 'bg-green-600/20'}`}>
                {activeTab === 'expense' ? (
                  <TrendingDown className="text-orange-400" size={24} />
                ) : (
                  <TrendingUp className="text-green-400" size={24} />
                )}
              </div>
              <div>
                <p className="text-purple-200 text-sm">This Month</p>
                <p className={`text-3xl font-bold ${activeTab === 'expense' ? 'text-orange-400' : 'text-green-400'}`}>
                  ${totalAmount.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Default Categories Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-600/20 rounded-lg">
              <Lock className="text-purple-400" size={20} />
            </div>
            <h2 className="text-2xl font-bold text-white">Default Categories</h2>
            <span className="text-purple-300 text-sm">({defaultCategories.length} categories)</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {defaultCategories.map((category) => {
              const colors = getCategoryColor(category.color);
              return (
                <div
                  key={category.id}
                  className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 border border-white/20 hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/20"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl border ${colors.bg} ${colors.border}`}>
                      <div className={colors.text}>
                        {renderIcon(category.icon)}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-purple-400 hover:text-purple-300 transition-colors">
                        <Edit2 size={16} />
                      </button>
                      <div className="p-2 rounded-lg bg-white/5 text-gray-500 cursor-not-allowed" title="Cannot delete default category">
                        <Lock size={16} />
                      </div>
                    </div>
                  </div>

                  {/* Category Name */}
                  <h3 className="text-white font-semibold mb-3">{category.name}</h3>

                  {/* Color Indicator */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className={`w-4 h-4 rounded-full ${colors.solid}`}></div>
                    <span className="text-gray-400 text-xs capitalize">{category.color}</span>
                  </div>

                  {/* Stats */}
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Transactions</span>
                      <span className="text-white font-semibold">{category.transactions}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">This Month</span>
                      <span className={`font-semibold ${activeTab === 'expense' ? 'text-orange-400' : 'text-green-400'}`}>
                        ${category.totalSpent.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Default Badge */}
                  <div className="flex items-center gap-2 px-3 py-2 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                    <Lock size={14} className="text-purple-400" />
                    <span className="text-xs font-medium text-purple-300">Default Category</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Custom Categories Section */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-600/20 rounded-lg">
              <Tag className="text-blue-400" size={20} />
            </div>
            <h2 className="text-2xl font-bold text-white">Custom Categories</h2>
            <span className="text-purple-300 text-sm">({customCategories.length} categories)</span>
          </div>
          
          {customCategories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {customCategories.map((category) => {
                const colors = getCategoryColor(category.color);
                const hasTransactions = category.transactions > 0;
                
                return (
                  <div
                    key={category.id}
                    className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 border border-white/20 hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-blue-500/20"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl border ${colors.bg} ${colors.border}`}>
                        <div className={colors.text}>
                          {renderIcon(category.icon)}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-blue-400 hover:text-blue-300 transition-colors">
                          <Edit2 size={16} />
                        </button>
                        {hasTransactions ? (
                          <div className="p-2 rounded-lg bg-white/5 text-gray-500 cursor-not-allowed" title="Cannot delete - has transactions">
                            <Trash2 size={16} />
                          </div>
                        ) : (
                          <button className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors">
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Category Name */}
                    <h3 className="text-white font-semibold mb-3">{category.name}</h3>

                    {/* Color Indicator */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className={`w-4 h-4 rounded-full ${colors.solid}`}></div>
                      <span className="text-gray-400 text-xs capitalize">{category.color}</span>
                    </div>

                    {/* Stats */}
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Transactions</span>
                        <span className="text-white font-semibold">{category.transactions}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">This Month</span>
                        <span className={`font-semibold ${activeTab === 'expense' ? 'text-orange-400' : 'text-green-400'}`}>
                          ${category.totalSpent.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Custom Badge */}
                    <div className="flex items-center gap-2 px-3 py-2 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                      <Tag size={14} className="text-blue-400" />
                      <span className="text-xs font-medium text-blue-300">Custom Category</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-12 border-2 border-dashed border-white/20 text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="p-4 bg-blue-600/20 rounded-full">
                  <Tag className="text-blue-400" size={48} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">No Custom Categories Yet</h3>
                  <p className="text-purple-200 mb-4">Create your first custom category to get started</p>
                  <button 
                    onClick={() => setShowAddModal(true)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl inline-flex items-center gap-2 transition-all shadow-lg shadow-blue-500/50"
                  >
                    <Plus size={20} />
                    Add Your First Category
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Category Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-2xl border border-white/20 max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Add New Category</h2>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              >
                <Plus className="rotate-45" size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-purple-200 text-sm mb-2 block">Category Name</label>
                <input 
                  type="text" 
                  placeholder="e.g., Coffee Shops"
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                />
              </div>
              
              <div>
                <label className="text-purple-200 text-sm mb-2 block">Category Type</label>
                <div className="grid grid-cols-2 gap-3">
                  <button className="px-4 py-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 hover:bg-red-500/30 transition-all">
                    Expense
                  </button>
                  <button className="px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white hover:bg-white/10 transition-all">
                    Income
                  </button>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-white/5 hover:bg-white/10 border border-white/20 text-white px-6 py-3 rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl transition-all shadow-lg shadow-purple-500/50">
                  Create Category
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;