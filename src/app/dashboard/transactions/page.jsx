"use client";

import React, { useState } from 'react';
import { Search, Filter, Download, Upload, Plus, Edit2, Trash2, FileText, ChevronLeft, ChevronRight, X, Calendar, DollarSign, TrendingUp, TrendingDown, ShoppingCart, Home, Car, Utensils, Film, Zap } from 'lucide-react';

const page = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, date: '2025-09-30', title: 'Grocery Shopping', category: 'Food', account: 'Cash', type: 'expense', amount: 125.50, hasReceipt: true },
    { id: 2, date: '2025-09-29', title: 'Monthly Salary', category: 'Income', account: 'Bank', type: 'income', amount: 3500.00, hasReceipt: false },
    { id: 3, date: '2025-09-28', title: 'Electricity Bill', category: 'Utilities', account: 'Bank', type: 'expense', amount: 85.30, hasReceipt: true },
    { id: 4, date: '2025-09-27', title: 'Restaurant Dinner', category: 'Food', account: 'Credit Card', type: 'expense', amount: 67.20, hasReceipt: false },
    { id: 5, date: '2025-09-26', title: 'Gas Station', category: 'Transport', account: 'Cash', type: 'expense', amount: 45.00, hasReceipt: true },
    { id: 6, date: '2025-09-25', title: 'Freelance Payment', category: 'Income', account: 'Bank', type: 'income', amount: 800.00, hasReceipt: false },
    { id: 7, date: '2025-09-24', title: 'Movie Tickets', category: 'Entertainment', account: 'Credit Card', type: 'expense', amount: 35.00, hasReceipt: false },
    { id: 8, date: '2025-09-23', title: 'Rent Payment', category: 'Housing', account: 'Bank', type: 'expense', amount: 1200.00, hasReceipt: true },
    { id: 9, date: '2025-09-22', title: 'Coffee Shop', category: 'Food', account: 'Cash', type: 'expense', amount: 12.50, hasReceipt: false },
    { id: 10, date: '2025-09-21', title: 'Online Sale', category: 'Income', account: 'Bank', type: 'income', amount: 250.00, hasReceipt: false },
  ]);

  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    category: 'all',
    type: 'all',
    minAmount: '',
    maxAmount: '',
    search: ''
  });

  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const [bulkDeleteMode, setBulkDeleteMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  const categories = ['all', 'Food', 'Transport', 'Utilities', 'Entertainment', 'Housing', 'Income'];
  
  const getCategoryIcon = (category) => {
    const icons = {
      Food: <Utensils size={16} />,
      Transport: <Car size={16} />,
      Utilities: <Zap size={16} />,
      Entertainment: <Film size={16} />,
      Housing: <Home size={16} />,
      Income: <TrendingUp size={16} />
    };
    return icons[category] || <ShoppingCart size={16} />;
  };

  const getCategoryColor = (category) => {
    const colors = {
      Food: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      Transport: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      Utilities: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      Entertainment: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
      Housing: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      Income: 'bg-green-500/20 text-green-400 border-green-500/30'
    };
    return colors[category] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.title.toLowerCase().includes(filters.search.toLowerCase());
    const matchesCategory = filters.category === 'all' || transaction.category === filters.category;
    const matchesType = filters.type === 'all' || transaction.type === filters.type;
    const matchesDateFrom = !filters.dateFrom || transaction.date >= filters.dateFrom;
    const matchesDateTo = !filters.dateTo || transaction.date <= filters.dateTo;
    const matchesMinAmount = !filters.minAmount || transaction.amount >= parseFloat(filters.minAmount);
    const matchesMaxAmount = !filters.maxAmount || transaction.amount <= parseFloat(filters.maxAmount);

    return matchesSearch && matchesCategory && matchesType && matchesDateFrom && matchesDateTo && matchesMinAmount && matchesMaxAmount;
  });

  const totalIncome = filteredTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = filteredTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const netAmount = totalIncome - totalExpense;

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedTransactions(paginatedTransactions.map(t => t.id));
    } else {
      setSelectedTransactions([]);
    }
  };

  const handleSelectTransaction = (id) => {
    if (selectedTransactions.includes(id)) {
      setSelectedTransactions(selectedTransactions.filter(tid => tid !== id));
    } else {
      setSelectedTransactions([...selectedTransactions, id]);
    }
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const handleBulkDelete = () => {
    setTransactions(transactions.filter(t => !selectedTransactions.includes(t.id)));
    setSelectedTransactions([]);
    setBulkDeleteMode(false);
  };

  const clearFilters = () => {
    setFilters({
      dateFrom: '',
      dateTo: '',
      category: 'all',
      type: 'all',
      minAmount: '',
      maxAmount: '',
      search: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br bg-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Transactions</h1>
          <p className="text-purple-200">View, search, and manage all your transactions</p>
        </div>

        {/* Search Bar */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 mb-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search transactions..."
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
                className="w-full bg-white/5 border border-white/20 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
            </div>
            <button
              onClick={() => setShowFilterPanel(!showFilterPanel)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-colors"
            >
              <Filter size={20} />
              Filters
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilterPanel && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="text-gray-300 text-sm block mb-2">Date From</label>
                <input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => setFilters({...filters, dateFrom: e.target.value})}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="text-gray-300 text-sm block mb-2">Date To</label>
                <input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => setFilters({...filters, dateTo: e.target.value})}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="text-gray-300 text-sm block mb-2">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({...filters, category: e.target.value})}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-gray-300 text-sm block mb-2">Type</label>
                <select
                  value={filters.type}
                  onChange={(e) => setFilters({...filters, type: e.target.value})}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="all">All Types</option>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>
              <div>
                <label className="text-gray-300 text-sm block mb-2">Min Amount</label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={filters.minAmount}
                  onChange={(e) => setFilters({...filters, minAmount: e.target.value})}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="text-gray-300 text-sm block mb-2">Max Amount</label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={filters.maxAmount}
                  onChange={(e) => setFilters({...filters, maxAmount: e.target.value})}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={clearFilters}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-xl transition-colors"
              >
                Clear Filters
              </button>
              <button
                onClick={() => setShowFilterPanel(false)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-xl transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 mb-4">
          <div className="flex flex-wrap gap-3 justify-between items-center">
            <div className="flex flex-wrap gap-3">
              <a href='/dashboard/transactions/Form' className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl flex items-center gap-2 transition-colors">
                <Plus size={20} />
                Add Transaction
              </a>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl flex items-center gap-2 transition-colors">
                <Upload size={20} />
                Import CSV
              </button>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-xl flex items-center gap-2 transition-colors">
                <Download size={20} />
                Export
              </button>
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-white cursor-pointer">
                <input
                  type="checkbox"
                  checked={bulkDeleteMode}
                  onChange={(e) => {
                    setBulkDeleteMode(e.target.checked);
                    if (!e.target.checked) setSelectedTransactions([]);
                  }}
                  className="w-4 h-4 rounded"
                />
                Bulk Delete Mode
              </label>
              {bulkDeleteMode && selectedTransactions.length > 0 && (
                <button
                  onClick={handleBulkDelete}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-colors"
                >
                  <Trash2 size={18} />
                  Delete ({selectedTransactions.length})
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden mb-4">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  {bulkDeleteMode && (
                    <th className="px-4 py-4 text-left">
                      <input
                        type="checkbox"
                        onChange={handleSelectAll}
                        checked={selectedTransactions.length === paginatedTransactions.length && paginatedTransactions.length > 0}
                        className="w-4 h-4 rounded"
                      />
                    </th>
                  )}
                  <th className="px-4 py-4 text-left text-gray-300 font-semibold">Date</th>
                  <th className="px-4 py-4 text-left text-gray-300 font-semibold">Title</th>
                  <th className="px-4 py-4 text-left text-gray-300 font-semibold">Category</th>
                  <th className="px-4 py-4 text-left text-gray-300 font-semibold">Account</th>
                  <th className="px-4 py-4 text-left text-gray-300 font-semibold">Type</th>
                  <th className="px-4 py-4 text-right text-gray-300 font-semibold">Amount</th>
                  <th className="px-4 py-4 text-center text-gray-300 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-t border-white/10 hover:bg-white/5 transition-colors">
                    {bulkDeleteMode && (
                      <td className="px-4 py-4">
                        <input
                          type="checkbox"
                          checked={selectedTransactions.includes(transaction.id)}
                          onChange={() => handleSelectTransaction(transaction.id)}
                          className="w-4 h-4 rounded"
                        />
                      </td>
                    )}
                    <td className="px-4 py-4 text-gray-300">{transaction.date}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-lg ${getCategoryColor(transaction.category)}`}>
                          {getCategoryIcon(transaction.category)}
                        </div>
                        <span className="text-white font-medium">{transaction.title}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(transaction.category)}`}>
                        {transaction.category}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-gray-300">{transaction.account}</td>
                    <td className="px-4 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        transaction.type === 'income' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {transaction.type === 'income' ? 'Income' : 'Expense'}
                      </span>
                    </td>
                    <td className={`px-4 py-4 text-right font-bold ${
                      transaction.type === 'income' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-2">
                        {transaction.hasReceipt && (
                          <button className="text-blue-400 hover:text-blue-300 transition-colors">
                            <FileText size={18} />
                          </button>
                        )}
                        <button className="text-purple-400 hover:text-purple-300 transition-colors">
                          <Edit2 size={18} />
                        </button>
                        <button 
                          onClick={() => handleDeleteTransaction(transaction.id)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 mb-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-gray-300">
              <span>Show</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="bg-white/5 border border-white/20 rounded-lg px-3 py-1 text-white focus:outline-none focus:border-purple-500"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <span>per page</span>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-white/5 border border-white/20 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentPage === i + 1
                      ? 'bg-purple-600 text-white'
                      : 'bg-white/5 border border-white/20 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg bg-white/5 border border-white/20 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="text-gray-300">
              Total: {filteredTransactions.length} transactions
            </div>
          </div>
        </div>

        {/* Summary Footer */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-2">Total Income</p>
              <p className="text-3xl font-bold text-green-400">+${totalIncome.toFixed(2)}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-2">Total Expenses</p>
              <p className="text-3xl font-bold text-red-400">-${totalExpense.toFixed(2)}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-2">Net Amount</p>
              <p className={`text-3xl font-bold ${netAmount >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {netAmount >= 0 ? '+' : ''}${netAmount.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;