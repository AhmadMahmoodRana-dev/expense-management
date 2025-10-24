"use client";

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Edit2, Trash2, TrendingUp, TrendingDown, AlertTriangle, DollarSign, Target, Calendar, BarChart3, Utensils, Car, Zap, Film, Home, ShoppingCart, Heart, Book, Plane, Gift } from 'lucide-react';

const BudgetsPage = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedHistory, setSelectedHistory] = useState('current');

  const budgets = [
    { id: 1, category: 'Food & Dining', icon: <Utensils size={20} />, color: 'orange', budgeted: 500, spent: 425.50, percentage: 85 },
    { id: 2, category: 'Transport', icon: <Car size={20} />, color: 'blue', budgeted: 300, spent: 245.00, percentage: 82 },
    { id: 3, category: 'Utilities', icon: <Zap size={20} />, color: 'yellow', budgeted: 200, spent: 185.30, percentage: 93 },
    { id: 4, category: 'Entertainment', icon: <Film size={20} />, color: 'pink', budgeted: 150, spent: 102.20, percentage: 68 },
    { id: 5, category: 'Housing', icon: <Home size={20} />, color: 'purple', budgeted: 1500, spent: 1200.00, percentage: 80 },
    { id: 6, category: 'Shopping', icon: <ShoppingCart size={20} />, color: 'red', budgeted: 400, spent: 465.80, percentage: 116 },
    { id: 7, category: 'Healthcare', icon: <Heart size={20} />, color: 'green', budgeted: 250, spent: 180.00, percentage: 72 },
    { id: 8, category: 'Education', icon: <Book size={20} />, color: 'indigo', budgeted: 300, spent: 250.00, percentage: 83 },
  ];

  const getCategoryColor = (color) => {
    const colors = {
      orange: { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/30', progress: 'bg-orange-500' },
      blue: { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30', progress: 'bg-blue-500' },
      yellow: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/30', progress: 'bg-yellow-500' },
      pink: { bg: 'bg-pink-500/20', text: 'text-pink-400', border: 'border-pink-500/30', progress: 'bg-pink-500' },
      purple: { bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-500/30', progress: 'bg-purple-500' },
      red: { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30', progress: 'bg-red-500' },
      green: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30', progress: 'bg-green-500' },
      indigo: { bg: 'bg-indigo-500/20', text: 'text-indigo-400', border: 'border-indigo-500/30', progress: 'bg-indigo-500' },
    };
    return colors[color] || colors.purple;
  };

  const getProgressBarColor = (percentage) => {
    if (percentage >= 100) return 'bg-red-500';
    if (percentage >= 90) return 'bg-yellow-500';
    if (percentage >= 75) return 'bg-orange-500';
    return 'bg-green-500';
  };

  const totalBudgeted = budgets.reduce((sum, b) => sum + b.budgeted, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
  const totalRemaining = totalBudgeted - totalSpent;
  const overallPercentage = (totalSpent / totalBudgeted) * 100;

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)));
  };

  const chartData = budgets.map(b => ({
    category: b.category.split(' ')[0],
    budgeted: b.budgeted,
    spent: b.spent
  }));

  const maxValue = Math.max(...budgets.map(b => Math.max(b.budgeted, b.spent)));

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Budget Management</h1>
              <p className="text-purple-200">Track and manage your spending limits</p>
            </div>
            <a href='/dashboard/budget/form'  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-purple-500/50">
              <Plus size={20} />
              Create New Budget
            </a>
          </div>

          {/* Month Navigation */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
            <div className="flex items-center justify-between">
              <button
                onClick={handlePrevMonth}
                className="p-2 rounded-lg bg-white/5 border border-white/20 text-white hover:bg-white/10 transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="flex items-center gap-3">
                <Calendar className="text-purple-400" size={24} />
                <h2 className="text-2xl font-bold text-white">
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h2>
              </div>
              <button
                onClick={handleNextMonth}
                className="p-2 rounded-lg bg-white/5 border border-white/20 text-white hover:bg-white/10 transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Overall Budget Summary Card */}
        <div className="bg-gradient-to-r from-purple-600/30 to-blue-600/30 backdrop-blur-lg rounded-2xl p-6 border-2 border-purple-500/50 mb-6 shadow-xl shadow-purple-500/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-white/10 rounded-xl">
              <Target className="text-purple-300" size={28} />
            </div>
            <h2 className="text-2xl font-bold text-white">Overall Budget Summary</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            <div>
              <p className="text-purple-200 text-sm mb-1">Total Budgeted</p>
              <p className="text-3xl font-bold text-white">${totalBudgeted.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-purple-200 text-sm mb-1">Total Spent</p>
              <p className="text-3xl font-bold text-orange-400">${totalSpent.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-purple-200 text-sm mb-1">Remaining</p>
              <p className={`text-3xl font-bold ${totalRemaining >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                ${Math.abs(totalRemaining).toFixed(2)}
              </p>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-purple-200 text-sm">Overall Progress</span>
              <span className="text-white font-semibold">{overallPercentage.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden">
              <div
                className={`h-full ${getProgressBarColor(overallPercentage)} transition-all duration-500 rounded-full`}
                style={{ width: `${Math.min(overallPercentage, 100)}%` }}
              />
            </div>
            {overallPercentage >= 90 && (
              <div className="flex items-center gap-2 mt-3 text-yellow-400">
                <AlertTriangle size={16} />
                <span className="text-sm">You've used {overallPercentage.toFixed(0)}% of your total budget</span>
              </div>
            )}
          </div>
        </div>

        {/* Budget Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
          {budgets.map((budget) => {
            const colors = getCategoryColor(budget.color);
            const remaining = budget.budgeted - budget.spent;
            
            return (
              <div
                key={budget.id}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 border border-white/20 hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/20"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl border ${colors.bg} ${colors.border}`}>
                    <div className={colors.text}>
                      {budget.icon}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-purple-400 hover:text-purple-300 transition-colors">
                      <Edit2 size={16} />
                    </button>
                    <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-red-400 hover:text-red-300 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <h3 className="text-white font-semibold mb-4">{budget.category}</h3>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Budgeted</span>
                    <span className="text-white font-semibold">${budget.budgeted.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Spent</span>
                    <span className={`font-semibold ${budget.percentage >= 100 ? 'text-red-400' : 'text-orange-400'}`}>
                      ${budget.spent.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Remaining</span>
                    <span className={`font-semibold ${remaining >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      ${Math.abs(remaining).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400 text-xs">Progress</span>
                    <span className={`text-xs font-semibold ${
                      budget.percentage >= 100 ? 'text-red-400' : 
                      budget.percentage >= 90 ? 'text-yellow-400' : 
                      'text-green-400'
                    }`}>
                      {budget.percentage.toFixed(0)}%
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full ${getProgressBarColor(budget.percentage)} transition-all duration-500`}
                      style={{ width: `${Math.min(budget.percentage, 100)}%` }}
                    />
                  </div>
                </div>

                {budget.percentage >= 100 && (
                  <div className="flex items-center gap-2 mt-3 text-red-400 bg-red-500/10 px-3 py-2 rounded-lg">
                    <AlertTriangle size={14} />
                    <span className="text-xs font-medium">Budget exceeded!</span>
                  </div>
                )}
                {budget.percentage >= 90 && budget.percentage < 100 && (
                  <div className="flex items-center gap-2 mt-3 text-yellow-400 bg-yellow-500/10 px-3 py-2 rounded-lg">
                    <AlertTriangle size={14} />
                    <span className="text-xs font-medium">Nearing limit</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Budget Analytics Section */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-purple-600/20 rounded-xl">
              <BarChart3 className="text-purple-400" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-white">Budget Analytics</h2>
          </div>

          {/* Bar Chart */}
          <div className="mb-6">
            <h3 className="text-white font-semibold mb-4">Budgeted vs Actual Spending</h3>
            <div className="space-y-4">
              {chartData.map((data, index) => {
                const budgetBar = (data.budgeted / maxValue) * 100;
                const spentBar = (data.spent / maxValue) * 100;
                const isOver = data.spent > data.budgeted;
                
                return (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-300 text-sm font-medium w-24">{data.category}</span>
                      <div className="flex-1 mx-4">
                        <div className="relative h-8">
                          {/* Budgeted bar (background) */}
                          <div
                            className="absolute top-0 bg-white/10 rounded-lg h-8 flex items-center justify-end px-2"
                            style={{ width: `${budgetBar}%` }}
                          >
                            <span className="text-white text-xs font-semibold">${data.budgeted}</span>
                          </div>
                          {/* Spent bar (foreground) */}
                          <div
                            className={`absolute top-0 ${isOver ? 'bg-red-500' : 'bg-green-500'} rounded-lg h-8 flex items-center justify-end px-2 transition-all duration-500`}
                            style={{ width: `${spentBar}%` }}
                          >
                            <span className="text-white text-xs font-semibold">${data.spent}</span>
                          </div>
                        </div>
                      </div>
                      <span className={`text-sm font-semibold w-16 text-right ${isOver ? 'text-red-400' : 'text-green-400'}`}>
                        {((data.spent / data.budgeted) * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-6 justify-center">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-white/10 rounded"></div>
              <span className="text-gray-300 text-sm">Budgeted</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-gray-300 text-sm">Spent (Under)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span className="text-gray-300 text-sm">Spent (Over)</span>
            </div>
          </div>

          {/* Spending Trends */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <h3 className="text-white font-semibold mb-4">Spending Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingDown className="text-green-400" size={20} />
                  <span className="text-green-400 font-semibold">Under Budget</span>
                </div>
                <p className="text-white text-2xl font-bold">
                  {budgets.filter(b => b.percentage < 90).length}
                </p>
                <p className="text-green-300 text-sm">categories</p>
              </div>
              <div className="bg-yellow-500/10 rounded-xl p-4 border border-yellow-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="text-yellow-400" size={20} />
                  <span className="text-yellow-400 font-semibold">Near Limit</span>
                </div>
                <p className="text-white text-2xl font-bold">
                  {budgets.filter(b => b.percentage >= 90 && b.percentage < 100).length}
                </p>
                <p className="text-yellow-300 text-sm">categories</p>
              </div>
              <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="text-red-400" size={20} />
                  <span className="text-red-400 font-semibold">Over Budget</span>
                </div>
                <p className="text-white text-2xl font-bold">
                  {budgets.filter(b => b.percentage >= 100).length}
                </p>
                <p className="text-red-300 text-sm">categories</p>
              </div>
            </div>
          </div>
        </div>

        {/* Budget History */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-600/20 rounded-xl">
                <Calendar className="text-blue-400" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-white">Budget History</h2>
            </div>
            <select
              value={selectedHistory}
              onChange={(e) => setSelectedHistory(e.target.value)}
              className="bg-white/5 border border-white/20 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-purple-500"
            >
              <option value="current">Current Month</option>
              <option value="last1">Last Month</option>
              <option value="last2">2 Months Ago</option>
              <option value="last3">3 Months Ago</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-4 py-3 text-left text-gray-300 font-semibold">Category</th>
                  <th className="px-4 py-3 text-right text-gray-300 font-semibold">Budgeted</th>
                  <th className="px-4 py-3 text-right text-gray-300 font-semibold">Spent</th>
                  <th className="px-4 py-3 text-right text-gray-300 font-semibold">Difference</th>
                  <th className="px-4 py-3 text-center text-gray-300 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {budgets.slice(0, 5).map((budget) => {
                  const difference = budget.budgeted - budget.spent;
                  return (
                    <tr key={budget.id} className="border-t border-white/10 hover:bg-white/5 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className={`p-2 rounded-lg ${getCategoryColor(budget.color).bg}`}>
                            <div className={getCategoryColor(budget.color).text}>
                              {budget.icon}
                            </div>
                          </div>
                          <span className="text-white font-medium">{budget.category}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right text-gray-300">${budget.budgeted.toFixed(2)}</td>
                      <td className="px-4 py-3 text-right text-white font-semibold">${budget.spent.toFixed(2)}</td>
                      <td className={`px-4 py-3 text-right font-semibold ${difference >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {difference >= 0 ? '+' : ''}${difference.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {budget.percentage >= 100 ? (
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-400 border border-red-500/30">
                            Over
                          </span>
                        ) : budget.percentage >= 90 ? (
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                            Warning
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400 border border-green-500/30">
                            Good
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetsPage;