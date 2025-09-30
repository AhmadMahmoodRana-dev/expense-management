"use client";

import React, { useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown, PieChart, Calendar, Plus, X } from 'lucide-react';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([
    { id: 1, title: 'Groceries', amount: 125.50, category: 'Food', date: '2025-09-28', type: 'expense' },
    { id: 2, title: 'Salary', amount: 3500, category: 'Income', date: '2025-09-25', type: 'income' },
    { id: 3, title: 'Electricity Bill', amount: 85.30, category: 'Utilities', date: '2025-09-26', type: 'expense' },
    { id: 4, title: 'Restaurant', amount: 67.20, category: 'Food', date: '2025-09-27', type: 'expense' },
    { id: 5, title: 'Gas', amount: 45.00, category: 'Transport', date: '2025-09-29', type: 'expense' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newExpense, setNewExpense] = useState({
    title: '',
    amount: '',
    category: 'Food',
    date: '',
    type: 'expense'
  });


  const totalIncome = expenses.filter(e => e.type === 'income').reduce((sum, e) => sum + e.amount, 0);
  const totalExpense = expenses.filter(e => e.type === 'expense').reduce((sum, e) => sum + e.amount, 0);
  const balance = totalIncome - totalExpense;

  const categoryTotals = expenses
    .filter(e => e.type === 'expense')
    .reduce((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + e.amount;
      return acc;
    }, {});

 

  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Expense Manager</h1>
          <p className="text-purple-200">Track your income and expenses efficiently</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-500/20 p-3 rounded-xl">
                <TrendingUp className="text-green-400" size={24} />
              </div>
              <span className="text-green-400 text-sm font-semibold">+12.5%</span>
            </div>
            <h3 className="text-gray-300 text-sm mb-1">Total Income</h3>
            <p className="text-3xl font-bold text-white">${totalIncome.toFixed(2)}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-red-500/20 p-3 rounded-xl">
                <TrendingDown className="text-red-400" size={24} />
              </div>
              <span className="text-red-400 text-sm font-semibold">-8.3%</span>
            </div>
            <h3 className="text-gray-300 text-sm mb-1">Total Expenses</h3>
            <p className="text-3xl font-bold text-white">${totalExpense.toFixed(2)}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-500/20 p-3 rounded-xl">
                <DollarSign className="text-blue-400" size={24} />
              </div>
              <span className={`text-sm font-semibold ${balance >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {balance >= 0 ? 'Surplus' : 'Deficit'}
              </span>
            </div>
            <h3 className="text-gray-300 text-sm mb-1">Balance</h3>
            <p className={`text-3xl font-bold ${balance >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              ${Math.abs(balance).toFixed(2)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Transactions */}
          <div className="lg:col-span-2 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Recent Transactions</h2>
              <button
                onClick={() => setShowModal(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-colors"
              >
                <Plus size={20} />
                Add New
              </button>
            </div>

            <div className="space-y-3">
              {expenses.slice().reverse().map((expense) => (
                <div
                  key={expense.id}
                  className="bg-white/5 rounded-xl p-4 flex items-center justify-between hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${expense.type === 'income' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                      {expense.type === 'income' ? (
                        <TrendingUp className="text-green-400" size={20} />
                      ) : (
                        <TrendingDown className="text-red-400" size={20} />
                      )}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{expense.title}</h3>
                      <p className="text-gray-400 text-sm">{expense.category} • {expense.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className={`text-lg font-bold ${expense.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                      {expense.type === 'income' ? '+' : '-'}${expense.amount.toFixed(2)}
                    </p>
                    <button
                      onClick={() => handleDeleteExpense(expense.id)}
                      className="text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-2 mb-6">
              <PieChart className="text-purple-400" size={24} />
              <h2 className="text-2xl font-bold text-white">By Category</h2>
            </div>

            <div className="space-y-4">
              {Object.entries(categoryTotals).map(([category, amount]) => {
                const percentage = (amount / totalExpense) * 100;
                return (
                  <div key={category}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-300">{category}</span>
                      <span className="text-white font-semibold">${amount.toFixed(2)}</span>
                    </div>
                    <div className="bg-white/10 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-gray-400 text-xs">{percentage.toFixed(1)}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;