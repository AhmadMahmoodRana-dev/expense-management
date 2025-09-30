"use client";

import React, { useState } from 'react';
import { X, Calendar, DollarSign, Upload, Tag, CreditCard, FileText, Plus, Save, Repeat, Clock, ChevronDown, Trash2, ArrowRight, Home, Car, Utensils, Film, Zap, ShoppingCart, Heart, Book, Plane, Gift } from 'lucide-react';

const TransactionFormPage = () => {
  const [formData, setFormData] = useState({
    type: 'expense',
    title: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0, 5),
    category: '',
    subCategory: '',
    tags: [],
    fromAccount: '',
    toAccount: '',
    paymentMethod: '',
    notes: '',
    isRecurring: false,
    frequency: 'monthly',
    endDate: '',
    attachments: []
  });

  const [tagInput, setTagInput] = useState('');
  const [showModal, setShowModal] = useState(false);

  const categories = {
    expense: [
      { name: 'Food & Dining', icon: <Utensils size={18} />, color: 'orange', subs: ['Groceries', 'Restaurant', 'Fast Food', 'Coffee & Tea'] },
      { name: 'Transport', icon: <Car size={18} />, color: 'blue', subs: ['Gas', 'Public Transport', 'Taxi', 'Parking'] },
      { name: 'Utilities', icon: <Zap size={18} />, color: 'yellow', subs: ['Electricity', 'Water', 'Internet', 'Phone'] },
      { name: 'Entertainment', icon: <Film size={18} />, color: 'pink', subs: ['Movies', 'Games', 'Music', 'Sports'] },
      { name: 'Housing', icon: <Home size={18} />, color: 'purple', subs: ['Rent', 'Maintenance', 'Furniture', 'Decor'] },
      { name: 'Shopping', icon: <ShoppingCart size={18} />, color: 'red', subs: ['Clothing', 'Electronics', 'Accessories', 'Other'] },
      { name: 'Healthcare', icon: <Heart size={18} />, color: 'green', subs: ['Doctor', 'Pharmacy', 'Insurance', 'Gym'] },
      { name: 'Education', icon: <Book size={18} />, color: 'indigo', subs: ['Tuition', 'Books', 'Courses', 'Supplies'] },
      { name: 'Travel', icon: <Plane size={18} />, color: 'teal', subs: ['Flights', 'Hotels', 'Activities', 'Food'] },
      { name: 'Gifts', icon: <Gift size={18} />, color: 'rose', subs: ['Birthday', 'Anniversary', 'Holiday', 'Other'] }
    ],
    income: [
      { name: 'Salary', icon: <DollarSign size={18} />, color: 'green', subs: ['Primary Job', 'Bonus', 'Commission'] },
      { name: 'Freelance', icon: <FileText size={18} />, color: 'blue', subs: ['Projects', 'Consulting', 'Gigs'] },
      { name: 'Business', icon: <ShoppingCart size={18} />, color: 'purple', subs: ['Sales', 'Services', 'Products'] },
      { name: 'Investment', icon: <DollarSign size={18} />, color: 'yellow', subs: ['Dividends', 'Interest', 'Capital Gains'] },
      { name: 'Other', icon: <Plus size={18} />, color: 'gray', subs: ['Gifts', 'Refunds', 'Cashback'] }
    ]
  };

  const accounts = ['Cash', 'Bank Account', 'Credit Card', 'Debit Card', 'Digital Wallet', 'Savings Account'];
  const paymentMethods = ['Cash', 'Credit Card', 'Debit Card', 'UPI', 'Bank Transfer', 'Digital Wallet', 'Cheque'];

  const getCategoryColor = (color) => {
    const colors = {
      orange: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      blue: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      yellow: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      pink: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
      purple: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      red: 'bg-red-500/20 text-red-400 border-red-500/30',
      green: 'bg-green-500/20 text-green-400 border-green-500/30',
      indigo: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
      teal: 'bg-teal-500/20 text-teal-400 border-teal-500/30',
      rose: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
      gray: 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    };
    return colors[color] || colors.gray;
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData({...formData, tags: [...formData.tags, tagInput.trim()]});
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData({...formData, tags: formData.tags.filter(tag => tag !== tagToRemove)});
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newAttachments = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file)
    }));
    setFormData({...formData, attachments: [...formData.attachments, ...newAttachments]});
  };

  const handleRemoveAttachment = (id) => {
    setFormData({...formData, attachments: formData.attachments.filter(att => att.id !== id)});
  };

  const handleSubmit = (saveAndAddAnother = false) => {
    console.log('Form submitted:', formData);
    if (saveAndAddAnother) {
      setFormData({
        type: formData.type,
        title: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        time: new Date().toTimeString().slice(0, 5),
        category: '',
        subCategory: '',
        tags: [],
        fromAccount: '',
        toAccount: '',
        paymentMethod: '',
        notes: '',
        isRecurring: false,
        frequency: 'monthly',
        endDate: '',
        attachments: []
      });
    } else {
      setShowModal(true);
    }
  };

  const selectedCategory = categories[formData.type]?.find(cat => cat.name === formData.category);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-bold text-white">Add Transaction</h1>
            <button className="text-gray-400 hover:text-white transition-colors">
              <X size={28} />
            </button>
          </div>
          <p className="text-purple-200">Fill in the details to record your transaction</p>
        </div>

        <div className="space-y-6">
          {/* Transaction Type Selector */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
              <DollarSign size={20} />
              Transaction Type
            </h2>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setFormData({...formData, type: 'expense', category: '', subCategory: ''})}
                className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
                  formData.type === 'expense'
                    ? 'bg-red-600 text-white shadow-lg shadow-red-500/50'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                Expense
              </button>
              <button
                type="button"
                onClick={() => setFormData({...formData, type: 'income', category: '', subCategory: ''})}
                className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
                  formData.type === 'income'
                    ? 'bg-green-600 text-white shadow-lg shadow-green-500/50'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                Income
              </button>
              <button
                type="button"
                onClick={() => setFormData({...formData, type: 'transfer', category: '', subCategory: ''})}
                className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
                  formData.type === 'transfer'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                Transfer
              </button>
            </div>
          </div>

          {/* Basic Information */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
              <FileText size={20} />
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="text-gray-300 text-sm block mb-2">Title/Description *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="e.g., Grocery shopping at Walmart"
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                  required
                />
              </div>
              <div>
                <label className="text-gray-300 text-sm block mb-2">Amount *</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="number"
                    step="0.01"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    placeholder="0.00"
                    className="w-full bg-white/5 border border-white/20 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-gray-300 text-sm block mb-2">Date *</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full bg-white/5 border border-white/20 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-purple-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-gray-300 text-sm block mb-2">Time (Optional)</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                    className="w-full bg-white/5 border border-white/20 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Categorization */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Tag size={20} />
              Categorization
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-gray-300 text-sm block mb-2">Category *</label>
                <div className="grid grid-cols-2 gap-2">
                  {categories[formData.type]?.map((cat) => (
                    <button
                      key={cat.name}
                      type="button"
                      onClick={() => setFormData({...formData, category: cat.name, subCategory: ''})}
                      className={`flex items-center gap-2 p-3 rounded-xl border transition-all ${
                        formData.category === cat.name
                          ? getCategoryColor(cat.color) + ' border-2'
                          : 'bg-white/5 text-gray-400 border-white/20 hover:bg-white/10'
                      }`}
                    >
                      {cat.icon}
                      <span className="text-sm font-medium">{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-gray-300 text-sm block mb-2">Sub-category</label>
                <select
                  value={formData.subCategory}
                  onChange={(e) => setFormData({...formData, subCategory: e.target.value})}
                  disabled={!formData.category}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 disabled:opacity-50"
                >
                  <option value="">Select sub-category</option>
                  {selectedCategory?.subs.map(sub => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="text-gray-300 text-sm block mb-2">Tags</label>
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="Type and press Enter to add tags"
                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
              />
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.tags.map(tag => (
                  <span key={tag} className="bg-purple-600/30 text-purple-300 px-3 py-1 rounded-full text-sm flex items-center gap-2 border border-purple-500/30">
                    {tag}
                    <button type="button" onClick={() => handleRemoveTag(tag)} className="hover:text-white">
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Account Section */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
              <CreditCard size={20} />
              Account Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-gray-300 text-sm block mb-2">
                  {formData.type === 'transfer' ? 'From Account *' : 'Account *'}
                </label>
                <select
                  value={formData.fromAccount}
                  onChange={(e) => setFormData({...formData, fromAccount: e.target.value})}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                  required
                >
                  <option value="">Select account</option>
                  {accounts.map(acc => (
                    <option key={acc} value={acc}>{acc}</option>
                  ))}
                </select>
              </div>
              {formData.type === 'transfer' && (
                <div>
                  <label className="text-gray-300 text-sm block mb-2">To Account *</label>
                  <select
                    value={formData.toAccount}
                    onChange={(e) => setFormData({...formData, toAccount: e.target.value})}
                    className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                    required
                  >
                    <option value="">Select account</option>
                    {accounts.map(acc => (
                      <option key={acc} value={acc}>{acc}</option>
                    ))}
                  </select>
                </div>
              )}
              <div>
                <label className="text-gray-300 text-sm block mb-2">Payment Method</label>
                <select
                  value={formData.paymentMethod}
                  onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="">Select method</option>
                  {paymentMethods.map(method => (
                    <option key={method} value={method}>{method}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
              <FileText size={20} />
              Additional Details
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-gray-300 text-sm block mb-2">Notes/Description</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  placeholder="Add any additional notes or details..."
                  rows="4"
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none"
                />
              </div>
              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isRecurring}
                    onChange={(e) => setFormData({...formData, isRecurring: e.target.checked})}
                    className="w-5 h-5 rounded border-white/20"
                  />
                  <span className="text-white font-medium flex items-center gap-2">
                    <Repeat size={18} />
                    Recurring Transaction
                  </span>
                </label>
              </div>
              {formData.isRecurring && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-8 p-4 bg-white/5 rounded-xl border border-white/10">
                  <div>
                    <label className="text-gray-300 text-sm block mb-2">Frequency</label>
                    <select
                      value={formData.frequency}
                      onChange={(e) => setFormData({...formData, frequency: e.target.value})}
                      className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-gray-300 text-sm block mb-2">End Date (Optional)</label>
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                      className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Attachments */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Upload size={20} />
              Attachments
            </h2>
            <div className="space-y-4">
              <label className="block cursor-pointer">
                <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-purple-500 hover:bg-white/5 transition-all">
                  <Upload className="mx-auto mb-3 text-purple-400" size={32} />
                  <p className="text-white font-medium mb-1">Drop files here or click to upload</p>
                  <p className="text-gray-400 text-sm">Supports: Images, PDFs (Max 10MB)</p>
                </div>
                <input
                  type="file"
                  multiple
                  accept="image/*,.pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              {formData.attachments.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {formData.attachments.map(att => (
                    <div key={att.id} className="relative group">
                      <div className="bg-white/5 rounded-xl border border-white/20 p-3 hover:bg-white/10 transition-all">
                        {att.type.startsWith('image/') ? (
                          <img src={att.url} alt={att.name} className="w-full h-24 object-cover rounded-lg mb-2" />
                        ) : (
                          <div className="w-full h-24 flex items-center justify-center bg-purple-600/20 rounded-lg mb-2">
                            <FileText className="text-purple-400" size={32} />
                          </div>
                        )}
                        <p className="text-white text-xs truncate">{att.name}</p>
                        <p className="text-gray-400 text-xs">{(att.size / 1024).toFixed(1)} KB</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveAttachment(att.id)}
                        className="absolute -top-2 -right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => handleSubmit(false)}
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-500/50"
              >
                <Save size={20} />
                Save Transaction
              </button>
              <button
                type="button"
                onClick={() => handleSubmit(true)}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all"
              >
                <Plus size={20} />
                Save & Add Another
              </button>
              <button
                type="button"
                className="px-8 bg-gray-600 hover:bg-gray-700 text-white py-4 rounded-xl font-semibold transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-slate-800 to-purple-900 rounded-2xl p-8 max-w-md w-full border border-white/20 shadow-2xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-500">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Transaction Saved!</h3>
              <p className="text-purple-200 mb-6">Your transaction has been successfully recorded.</p>
              <button
                onClick={() => setShowModal(false)}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionFormPage;