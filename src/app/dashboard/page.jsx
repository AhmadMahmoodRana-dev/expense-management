"use client";

import React, { useState } from 'react';
import {TrendingUp, TrendingDown, PieChart, Calendar, Plus, X, Receipt, ArrowRightLeft, Wallet, PiggyBank, Bell } from 'lucide-react';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([
    { id: 1, title: 'Groceries', amount: 125.50, category: 'Food', date: '2025-09-28', type: 'expense' },
    { id: 2, title: 'Salary', amount: 3500, category: 'Income', date: '2025-09-25', type: 'income' },
    { id: 3, title: 'Electricity Bill', amount: 85.30, category: 'Utilities', date: '2025-09-26', type: 'expense' },
    { id: 4, title: 'Restaurant', amount: 67.20, category: 'Food', date: '2025-09-27', type: 'expense' },
    { id: 5, title: 'Gas', amount: 45.00, category: 'Transport', date: '2025-09-29', type: 'expense' },
    { id: 6, title: 'Freelance Work', amount: 800, category: 'Income', date: '2025-09-28', type: 'income' },
    { id: 7, title: 'Coffee Shop', amount: 12.50, category: 'Food', date: '2025-09-30', type: 'expense' },
  ]);

  const [budgets, setBudgets] = useState([
    { category: 'Food', budget: 300, spent: 205.20 },
    { category: 'Utilities', budget: 150, spent: 85.30 },
    { category: 'Transport', budget: 200, spent: 45.00 },
    { category: 'Entertainment', budget: 100, spent: 0 },
  ]);

  const [upcomingBills, setUpcomingBills] = useState([
    { id: 1, title: 'Internet Bill', amount: 59.99, dueDate: '2025-10-05', paid: false },
    { id: 2, title: 'Water Bill', amount: 42.50, dueDate: '2025-10-03', paid: false },
    { id: 3, title: 'Phone Bill', amount: 35.00, dueDate: '2025-10-07', paid: false },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('expense');
  const [newTransaction, setNewTransaction] = useState({
    title: '',
    amount: '',
    category: 'Food',
    date: '',
    type: 'expense'
  });

  const totalIncome = expenses.filter(e => e.type === 'income').reduce((sum, e) => sum + e.amount, 0);
  const totalExpense = expenses.filter(e => e.type === 'expense').reduce((sum, e) => sum + e.amount, 0);
  const balance = totalIncome - totalExpense;
  const savings = balance;

  const categoryTotals = expenses
    .filter(e => e.type === 'expense')
    .reduce((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + e.amount;
      return acc;
    }, {});

  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  const handleMarkAsPaid = (billId) => {
    setUpcomingBills(upcomingBills.map(bill => 
      bill.id === billId ? { ...bill, paid: true } : bill
    ));
  };

  const getBudgetStatus = (spent, budget) => {
    const percentage = (spent / budget) * 100;
    if (percentage >= 100) return 'exceeded';
    if (percentage >= 80) return 'warning';
    return 'safe';
  };

  const openModal = (type) => {
    setModalType(type);
    setNewTransaction({
      title: '',
      amount: '',
      category: 'Food',
      date: new Date().toISOString().split('T')[0],
      type: type
    });
    setShowModal(true);
  };

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Financial Dashboard</h1>
            <p className="text-purple-200">Complete overview of your financial health</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl px-4 py-2 border border-white/20">
            <p className="text-gray-300 text-sm">September 2025</p>
          </div>
        </div>

        {/* Summary Cards - 4 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-500/20 p-3 rounded-xl">
                <Wallet className="text-blue-400" size={24} />
              </div>
              <span className={`text-sm font-semibold ${balance >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {balance >= 0 ? '↑' : '↓'}
              </span>
            </div>
            <h3 className="text-gray-300 text-sm mb-1">Total Balance</h3>
            <p className={`text-3xl font-bold ${balance >= 0 ? 'text-white' : 'text-red-400'}`}>
              ${Math.abs(balance).toFixed(2)}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-500/20 p-3 rounded-xl">
                <TrendingUp className="text-green-400" size={24} />
              </div>
              <span className="text-green-400 text-sm font-semibold">+12.5%</span>
            </div>
            <h3 className="text-gray-300 text-sm mb-1">Total Income</h3>
            <p className="text-3xl font-bold text-white">${totalIncome.toFixed(2)}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-red-500/20 p-3 rounded-xl">
                <TrendingDown className="text-red-400" size={24} />
              </div>
              <span className="text-red-400 text-sm font-semibold">-8.3%</span>
            </div>
            <h3 className="text-gray-300 text-sm mb-1">Total Expenses</h3>
            <p className="text-3xl font-bold text-white">${totalExpense.toFixed(2)}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-500/20 p-3 rounded-xl">
                <PiggyBank className="text-purple-400" size={24} />
              </div>
              <span className={`text-sm font-semibold ${savings >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                This Month
              </span>
            </div>
            <h3 className="text-gray-300 text-sm mb-1">Savings</h3>
            <p className={`text-3xl font-bold ${savings >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              ${Math.abs(savings).toFixed(2)}
            </p>
          </div>
        </div>

        {/* Quick Actions Bar */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 mb-6">
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <button 
              onClick={() => openModal('income')}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition-all hover:scale-105"
            >
              <Plus size={20} />
              Add Income
            </button>
            <button 
              onClick={() => openModal('expense')}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl transition-all hover:scale-105"
            >
              <Plus size={20} />
              Add Expense
            </button>
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-all hover:scale-105">
              <ArrowRightLeft size={20} />
              Add Transfer
            </button>
            <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl transition-all hover:scale-105">
              <Receipt size={20} />
              Scan Receipt
            </button>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Income vs Expense Chart Placeholder */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4">Income vs Expense Trend</h2>
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="mb-4">
                  <TrendingUp size={48} className="mx-auto text-purple-400" />
                </div>
                <p className="text-gray-300 mb-2">6-Month Financial Trend</p>
                <p className="text-sm text-gray-500">Line chart showing income and expense patterns</p>
              </div>
            </div>
          </div>

          {/* Expense by Category Chart */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-2 mb-4">
              <PieChart className="text-purple-400" size={24} />
              <h2 className="text-2xl font-bold text-white">Expenses by Category</h2>
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

        {/* Middle Row: Recent Transactions & Budget Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Recent Transactions */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Recent Transactions</h2>
              <button className="text-purple-400 hover:text-purple-300 text-sm font-semibold transition-colors">
                View All →
              </button>
            </div>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {expenses.slice(-7).reverse().map((expense) => (
                <div
                  key={expense.id}
                  className="bg-white/5 rounded-xl p-4 flex items-center justify-between hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${expense.type === 'income' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                      {expense.type === 'income' ? (
                        <TrendingUp className="text-green-400" size={16} />
                      ) : (
                        <TrendingDown className="text-red-400" size={16} />
                      )}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-sm">{expense.title}</h3>
                      <p className="text-gray-400 text-xs">{expense.category} • {expense.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className={`text-sm font-bold ${expense.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                      {expense.type === 'income' ? '+' : '-'}${expense.amount.toFixed(2)}
                    </p>
                    <button
                      onClick={() => handleDeleteExpense(expense.id)}
                      className="text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Budget Overview */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6">Budget Overview</h2>
            <div className="space-y-5">
              {budgets.map((budget) => {
                const percentage = (budget.spent / budget.budget) * 100;
                const status = getBudgetStatus(budget.spent, budget.budget);
                const statusColors = {
                  safe: 'from-green-500 to-emerald-500',
                  warning: 'from-yellow-500 to-orange-500',
                  exceeded: 'from-red-500 to-pink-500'
                };
                const textColors = {
                  safe: 'text-green-400',
                  warning: 'text-yellow-400',
                  exceeded: 'text-red-400'
                };
                
                return (
                  <div key={budget.category}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-semibold">{budget.category}</span>
                      <span className={`text-sm font-bold ${textColors[status]}`}>
                        ${budget.spent.toFixed(2)} / ${budget.budget.toFixed(2)}
                      </span>
                    </div>
                    <div className="bg-white/10 rounded-full h-3 overflow-hidden">
                      <div
                        className={`bg-gradient-to-r ${statusColors[status]} h-full rounded-full transition-all`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-gray-400 text-xs">{percentage.toFixed(1)}% used</span>
                      <span className={`text-xs font-semibold ${textColors[status]}`}>
                        ${(budget.budget - budget.spent).toFixed(2)} remaining
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Upcoming Bills Section */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="text-purple-400" size={24} />
            <h2 className="text-2xl font-bold text-white">Upcoming Bills</h2>
            <span className="text-gray-400 text-sm ml-2">(Next 7 days)</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {upcomingBills.filter(bill => !bill.paid).map((bill) => (
              <div
                key={bill.id}
                className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all border border-white/10"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-white font-semibold">{bill.title}</h3>
                    <p className="text-gray-400 text-sm">Due: {bill.dueDate}</p>
                  </div>
                  <span className="text-red-400 font-bold">${bill.amount.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => handleMarkAsPaid(bill.id)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white text-sm py-2 rounded-lg transition-all hover:scale-105"
                >
                  Mark as Paid
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>


    </div>
  );
}

export default Dashboard;