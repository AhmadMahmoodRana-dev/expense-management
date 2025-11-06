"use client";

import React, { useEffect, useState } from "react";
import {ChevronLeft,ChevronRight,Save,X,Lightbulb,TrendingUp,Calendar,DollarSign,AlertCircle,Copy,Utensils,Car,Zap,Film,Home,ShoppingCart,Heart,Book,Plane,Gift,Coffee,Wifi,CheckCircle,Phone,Briefcase,Dumbbell,Music,Palette,Wrench,Baby,PawPrint,Smartphone,Gamepad2,Pizza,GraduationCap,Stethoscope,Bus,Shirt,Building2,TrendingDown,Tag,Folder,FolderOpen} from "lucide-react";
import getCategoryColor from "@/color/getCategoryColor";
import api from "@/lib/axios";
import { toast } from "react-toastify";

const BudgetForm = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [applyToFuture, setApplyToFuture] = useState(false);
  const [rolloverUnused, setRolloverUnused] = useState(false);
  const [savingsAllocation, setSavingsAllocation] = useState(10);
  const [monthlyIncome, setMonthlyIncome] = useState(5000);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const iconMap = {Utensils,Car,Zap,Film,Home,ShoppingCart,Heart,Book,Plane,Gift,Coffee,Wifi,Phone,Briefcase,Dumbbell,Music,Palette,Wrench,Baby,PawPrint,Smartphone,Gamepad2,Pizza,GraduationCap,Stethoscope,Bus,Shirt,Building2,TrendingUp,TrendingDown,Tag,Folder,FolderOpen};
  const [categories, setCategories] = useState([]);

  console.log("CURRENT MONTH",currentMonth.getMonth() + 1)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await api.get("/categories/expense"); 
        console.log("categoryExpense", data);
        const merged = data.data?.map((item, index) => {
          const config = iconMap[item.name] || {};
          return {
            id: index + 1,
            name: item._id,
            icon: config.icon || <Gift size={20} />, 
            color: config.color || "gray",
            amount: 0, // user will set
            enabled: true,
            average: 0,
            categoryName:item?.name
          };
        });
        setCategories(merged);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } 
    };

    fetchCategories();
  }, []);

  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.setMonth(currentMonth.getMonth() - 1))
    );
  };
  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.setMonth(currentMonth.getMonth() + 1))
    );
  };

  const totalBudget = categories
    .filter((c) => c.enabled)
    .reduce((sum, c) => sum + c.amount, 0);
  const percentageOfIncome = (totalBudget / monthlyIncome) * 100;
  const remaining = monthlyIncome - totalBudget;

  const updateCategoryAmount = (id, amount) => {
    setCategories(
      categories.map((c) =>
        c.id === id ? { ...c, amount: parseFloat(amount) || 0 } : c
      )
    );
    // Clear error for this category when user updates
    if (errors[`category_${id}`]) {
      setErrors({ ...errors, [`category_${id}`]: undefined });
    }
  };

  const toggleCategory = (id) => {
    setCategories(
      categories.map((c) => (c.id === id ? { ...c, enabled: !c.enabled } : c))
    );
    // Clear categories error when user toggles
    if (errors.categories) {
      setErrors({ ...errors, categories: undefined });
    }
  };

  const applyPercentage = (id, percentage) => {
    const amount = (monthlyIncome * percentage) / 100;
    updateCategoryAmount(id, amount);
  };

  const applyAverageToAll = () => {
    setCategories(
      categories.map((c) => ({ ...c, amount: c.average, enabled: true }))
    );
    setErrors({});
  };

  const apply50_30_20Rule = () => {
    const needs = monthlyIncome * 0.5;
    const wants = monthlyIncome * 0.3;
    const needsCategories = [1, 2, 3, 5, 7, 12];
    const wantsCategories = [4, 6, 8, 9, 10, 11];
    const needsPerCategory = needs / needsCategories.length;
    const wantsPerCategory = wants / wantsCategories.length;

    setCategories(
      categories.map((c) => {
        if (needsCategories.includes(c.id)) {
          return { ...c, amount: Math.round(needsPerCategory), enabled: true };
        } else if (wantsCategories.includes(c.id)) {
          return { ...c, amount: Math.round(wantsPerCategory), enabled: true };
        }
        return c;
      })
    );

    setSavingsAllocation(20);
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};

    if (monthlyIncome <= 0) {
      newErrors.income = "Monthly income must be greater than 0";
    }

    const enabledCategories = categories.filter((c) => c.enabled);
    if (enabledCategories.length === 0) {
      newErrors.categories = "Please enable at least one category";
    }

    enabledCategories.forEach((cat) => {
      if (cat.amount < 0) {
        newErrors[`category_${cat.id}`] = "Amount cannot be negative";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const formData = {
    name: `${monthNames[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`,
    month: currentMonth.getMonth() + 1, 
    year: currentMonth.getFullYear(),
    totalBudget,
    rolloverUnused,
    alertThreshold: 80,
    applyToFuture,
    categories: categories
    .filter((c) => c.enabled)
    .map((c) => ({
      category: c.name,
      budgetAmount: c.amount,
      spentAmount: 0,
      isActive: true,
    })),
};
console.log("FORM DATA",formData);
    try {
      const {data} = await api.post(`/add_budget`,formData);
      console.log(data,"send budget")
      toast.success("Budget saved successfully!");
    } catch (error) {
      toast.error(error?.response?.data?.message)
      console.error(error)
    }
    console.log("Budget Form Submitted:", formData);

    // setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleCancel = () => {
    if (
      confirm(
        "Are you sure you want to cancel? All unsaved changes will be lost."
      )
    ) {
      setCategories(
        categories.map((c) => ({ ...c, amount: c.average, enabled: c.id <= 8 }))
      );
      setMonthlyIncome(5000);
      setApplyToFuture(false);
      setRolloverUnused(false);
      setSavingsAllocation(10);
      setErrors({});
    }
  };

  const handleSaveTemplate = () => {
    const name = prompt("Enter a name for this template:");
    if (name) {
      const template = {
        name,
        categories: categories.map((c) => ({
          id: c.id,
          name: c.name,
          amount: c.amount,
          enabled: c.enabled,
          color: c.color,
        })),
        rolloverUnused,
        savingsAllocation,
        createdAt: new Date().toISOString(),
      };
      console.log("Template Saved:", template);
      alert(`Template "${name}" saved successfully!`);
    }
  };

  console.log("CATEGORIES",categories)

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* Success Message */}
        {showSuccess && (
          <div className="fixed top-6 right-6 bg-green-500 text-white px-6 py-4 rounded-xl shadow-lg flex items-center gap-3 z-50">
            <CheckCircle size={24} />
            <div>
              <p className="font-semibold">Budget Saved Successfully!</p>
              <p className="text-sm">Your budget has been created.</p>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Create Budget
              </h1>
              <p className="text-purple-200">
                Set spending limits for your categories
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleCancel}
                className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all border border-white/20"
              >
                <X size={20} />
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-purple-500/50"
              >
                <Save size={20} />
                Save Budget
              </button>
            </div>
          </div>

          {/* Month Navigation */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={handlePrevMonth}
                className="p-2 rounded-lg bg-white/5 border border-white/20 text-white hover:bg-white/10 transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="flex items-center gap-3">
                <Calendar className="text-purple-400" size={24} />
                <h2 className="text-2xl font-bold text-white">
                  {monthNames[currentMonth.getMonth()]}{" "}
                  {currentMonth.getFullYear()}
                </h2>
              </div>
              <button
                onClick={handleNextMonth}
                className="p-2 rounded-lg bg-white/5 border border-white/20 text-white hover:bg-white/10 transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="applyFuture"
                checked={applyToFuture}
                onChange={(e) => setApplyToFuture(e.target.checked)}
                className="w-4 h-4 rounded border-white/20 bg-white/5 text-purple-600 focus:ring-purple-500"
              />
              <label
                htmlFor="applyFuture"
                className="text-purple-200 text-sm cursor-pointer"
              >
                Apply this budget to all future months
              </label>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Budget Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Smart Suggestions */}
            <div className="bg-gradient-to-r from-blue-600/30 to-purple-600/30 backdrop-blur-lg rounded-2xl p-6 border-2 border-blue-500/50 shadow-xl shadow-blue-500/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-white/10 rounded-xl">
                  <Lightbulb className="text-yellow-400" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-white">
                  Smart Suggestions
                </h2>
              </div>
              <p className="text-purple-200 mb-4">
                Let AI help you create a balanced budget
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={applyAverageToAll}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl p-4 text-left transition-all group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp
                      className="text-blue-400 group-hover:scale-110 transition-transform"
                      size={20}
                    />
                    <span className="text-white font-semibold">
                      3-Month Average
                    </span>
                  </div>
                  <p className="text-purple-200 text-sm">
                    Based on your spending history
                  </p>
                </button>
                <button
                  onClick={apply50_30_20Rule}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl p-4 text-left transition-all group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <DollarSign
                      className="text-green-400 group-hover:scale-110 transition-transform"
                      size={20}
                    />
                    <span className="text-white font-semibold">
                      50/30/20 Rule
                    </span>
                  </div>
                  <p className="text-purple-200 text-sm">
                    Needs / Wants / Savings
                  </p>
                </button>
              </div>
            </div>

            {/* Category Budget Settings */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6">
                Category Budgets
              </h2>
              {errors.categories && (
                <div className="mb-4 bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-red-400 text-sm flex items-center gap-2">
                  <AlertCircle size={16} />
                  {errors.categories}
                </div>
              )}
              <div className="space-y-4">
                {categories.map((category) => {
                  const colors = getCategoryColor(category.color);
                  return (
                    <div
                      key={category.id}
                      className={`bg-white/5 rounded-xl p-4 border transition-all ${
                        category.enabled
                          ? "border-white/20"
                          : "border-white/10 opacity-60"
                      }`}
                    >
                      <div className="flex items-center gap-4 mb-3">
                        <input
                          type="checkbox"
                          checked={category.enabled}
                          onChange={() => toggleCategory(category.id)}
                          className="w-5 h-5 rounded border-white/20 bg-white/5 text-purple-600 focus:ring-purple-500"
                        />
                        <div
                          className={`p-3 rounded-xl border ${colors.bg} ${colors.border}`}
                        >
                          <div className={colors.text}>{category.icon}</div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-semibold">
                            {category.categoryName}
                          </h3>
                          <p className="text-purple-300 text-xs">
                            3-month avg: ${category.average}
                          </p>
                        </div>
                      </div>

                      {category.enabled && (
                        <div className="ml-12 space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="flex-1">
                              <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                  $
                                </span>
                                <input
                                  type="number"
                                  value={category.amount}
                                  onChange={(e) =>
                                    updateCategoryAmount(
                                      category.id,
                                      e.target.value
                                    )
                                  }
                                  min="0"
                                  step="0.01"
                                  className="w-full bg-white/5 border border-white/20 rounded-lg pl-8 pr-4 py-2 text-white focus:outline-none focus:border-purple-500"
                                  placeholder="0.00"
                                />
                              </div>
                              {errors[`category_${category.id}`] && (
                                <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                                  <AlertCircle size={12} />
                                  {errors[`category_${category.id}`]}
                                </p>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => applyPercentage(category.id, 10)}
                                className="px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg text-purple-300 text-sm transition-colors"
                              >
                                10%
                              </button>
                              <button
                                onClick={() => applyPercentage(category.id, 20)}
                                className="px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg text-purple-300 text-sm transition-colors"
                              >
                                20%
                              </button>
                              <button
                                onClick={() => applyPercentage(category.id, 30)}
                                className="px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg text-purple-300 text-sm transition-colors"
                              >
                                30%
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-purple-300">
                              {(
                                (category.amount / monthlyIncome) *
                                100
                              ).toFixed(1)}
                              % of income
                            </span>
                            <span
                              className={`font-semibold ${
                                category.amount > category.average
                                  ? "text-yellow-400"
                                  : "text-green-400"
                              }`}
                            >
                              {category.amount > category.average ? "+" : "-"}$
                              {Math.abs(
                                category.amount - category.average
                              ).toFixed(0)}{" "}
                              vs avg
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Rollover Settings */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-4">
                Rollover Settings
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="rollover"
                    checked={rolloverUnused}
                    onChange={(e) => setRolloverUnused(e.target.checked)}
                    className="w-5 h-5 rounded border-white/20 bg-white/5 text-purple-600 focus:ring-purple-500 mt-1"
                  />
                  <div className="flex-1">
                    <label
                      htmlFor="rollover"
                      className="text-white font-semibold cursor-pointer block mb-1"
                    >
                      Roll unused budget to next month
                    </label>
                    <p className="text-purple-300 text-sm">
                      Any unspent budget will be automatically added to next
                      month's allocation
                    </p>
                  </div>
                </div>

                {rolloverUnused && (
                  <div className="ml-8 bg-white/5 rounded-lg p-4 border border-white/10">
                    <label className="text-white font-semibold block mb-2">
                      Savings Allocation: {savingsAllocation}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={savingsAllocation}
                      onChange={(e) =>
                        setSavingsAllocation(parseInt(e.target.value))
                      }
                      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-600"
                    />
                    <div className="flex justify-between text-xs text-purple-300 mt-2">
                      <span>0% (All to budget)</span>
                      <span>100% (All to savings)</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Summary */}
          <div className="space-y-6">
            {/* Monthly Income */}
            <div className="bg-gradient-to-r from-green-600/30 to-emerald-600/30 backdrop-blur-lg rounded-2xl p-6 border-2 border-green-500/50 shadow-xl shadow-green-500/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-white/10 rounded-xl">
                  <DollarSign className="text-green-400" size={24} />
                </div>
                <h3 className="text-xl font-bold text-white">Monthly Income</h3>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
                  $
                </span>
                <input
                  type="number"
                  value={monthlyIncome}
                  onChange={(e) => {
                    setMonthlyIncome(parseFloat(e.target.value) || 0);
                    if (errors.income) {
                      setErrors({ ...errors, income: undefined });
                    }
                  }}
                  min="0"
                  step="0.01"
                  className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-3 text-white text-2xl font-bold focus:outline-none focus:border-green-500"
                  placeholder="0.00"
                />
              </div>
              {errors.income && (
                <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.income}
                </p>
              )}
            </div>

            {/* Total Budget Summary */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">
                Budget Summary
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                  <span className="text-purple-200">Total Budget</span>
                  <span className="text-2xl font-bold text-white">
                    ${totalBudget.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                  <span className="text-purple-200">Monthly Income</span>
                  <span className="text-xl font-semibold text-green-400">
                    ${monthlyIncome.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                  <span className="text-purple-200">Remaining</span>
                  <span
                    className={`text-xl font-semibold ${
                      remaining >= 0 ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    ${Math.abs(remaining).toFixed(2)}
                  </span>
                </div>
                <div className="pt-2">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-purple-200 text-sm">
                      Budget Usage
                    </span>
                    <span
                      className={`font-semibold ${
                        percentageOfIncome > 100 ? "text-red-400" : "text-white"
                      }`}
                    >
                      {percentageOfIncome.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        percentageOfIncome > 100
                          ? "bg-red-500"
                          : percentageOfIncome > 90
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                      style={{ width: `${Math.min(percentageOfIncome, 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {percentageOfIncome > 100 && (
                <div className="mt-4 bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-start gap-3">
                  <AlertCircle
                    className="text-red-400 flex-shrink-0 mt-0.5"
                    size={20}
                  />
                  <div>
                    <p className="text-red-400 font-semibold mb-1">
                      Budget Exceeds Income
                    </p>
                    <p className="text-red-300 text-sm">
                      Your budget is ${(totalBudget - monthlyIncome).toFixed(2)}{" "}
                      over your monthly income.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Category Breakdown */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">
                Active Categories
              </h3>
              <div className="space-y-3">
                {categories
                  .filter((c) => c.enabled)
                  .map((category) => {
                    const colors = getCategoryColor(category.color);
                    const percentage = (category.amount / totalBudget) * 100;
                    return (
                      <div
                        key={category.id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <div className={`p-2 rounded-lg ${colors.bg}`}>
                            <div className={colors.text}>{category.icon}</div>
                          </div>
                          <span className="text-white text-sm">
                            {category.categoryName}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-semibold">
                            ${category.amount}
                          </div>
                          <div className="text-purple-300 text-xs">
                            {percentage.toFixed(1)}%
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Save as Template */}
            <button
              onClick={handleSaveTemplate}
              className="w-full bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl p-4 text-white flex items-center justify-center gap-2 transition-all group"
            >
              <Copy
                className="group-hover:scale-110 transition-transform"
                size={20}
              />
              <span className="font-semibold">Save as Template</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetForm;
