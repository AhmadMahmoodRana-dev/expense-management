"use client";

import React, { useEffect, useState } from "react";
import api from "@/lib/axios";
import {BarChart3,Calendar,Target,ChevronLeft,AlertTriangle,Plus,Edit2,Trash2,Tag,TrendingUp,TrendingDown,Utensils,Car,Zap,Film,Home,ShoppingCart,Heart,Book,Plane,Gift,Coffee,Wifi,Phone,Briefcase,Dumbbell,Music,Palette,Wrench,Baby,PawPrint,Smartphone,Gamepad2,Pizza,GraduationCap,Stethoscope,Bus,Shirt,Building2,ChevronRight,Folder,FolderOpen,Bell,X} from "lucide-react";
import BudgetCard from "../../../components/budget/BudgetCard";

const BudgetsPage = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentMonthBudgetData, setCurrentMonthBudgetData] = useState([]);
  const [currentMonthSummaryData, setCurrentMonthSummaryData] = useState({});
  const [alerts, setAlerts] = useState([]);
  const [showAlerts, setShowAlerts] = useState(false);
  const [loading, setLoading] = useState(true);
  const iconMap = {Utensils,Car,Zap,Film,Home,ShoppingCart,Heart,Book,Plane,Gift,Coffee,Wifi,Phone,Briefcase,Dumbbell,Music,Palette,Wrench,Baby,PawPrint,Smartphone,Gamepad2,Pizza,GraduationCap,Stethoscope,Bus,Shirt,Building2,TrendingUp,TrendingDown,Tag,Folder,FolderOpen};
  const [budgetId,setBudgetId] = useState("")

  const renderIcon = (iconName) => {
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent size={20} /> : <Tag size={20} />;
  };

  const currentMonthIndex = currentMonth.getMonth() + 1;
  const currentYear = currentMonth.getFullYear();

  const fetchCurrentMonthBudget = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(
        `/get_by_month?month=${currentMonthIndex}&year=${currentYear}`
      );
      console.log("Fetched current month budget data:", data);
      setCurrentMonthBudgetData(data?.data?.budgets || []);
      setBudgetId(data?.data?.budgets[0]?._id || "")
      setCurrentMonthSummaryData(data?.data?.summary || {});
    } catch (error) {
      console.error("Error fetching current month budget:", error);
      setCurrentMonthBudgetData([]);
      setCurrentMonthSummaryData({});
    } finally {
      setLoading(false);
    }
  };

  const fetchBudgetAlerts = async (budgetId) => {
    try {
      const { data } = await api.get(`/${budgetId}/alerts`);
      if (data.success && data.data.hasAlerts) {
        setAlerts(data.data.alerts);
        setShowAlerts(true);
      }
    } catch (error) {
      console.error("Error fetching budget alerts:", error);
    }
  };

 

  useEffect(() => {
    fetchCurrentMonthBudget();
  }, [currentMonth]);

  useEffect(() => {
    // Check for alerts when budgets are loaded
    if (currentMonthBudgetData.length > 0) {
      fetchBudgetAlerts(currentMonthBudgetData[0]._id);
    }
  }, [currentMonthBudgetData]);

  const getCategoryColor = (color) => {
    const colors = {
      orange: {
        bg: "bg-orange-500/20",
        text: "text-orange-400",
        border: "border-orange-500/30",
        progress: "bg-orange-500",
      },
      blue: {
        bg: "bg-blue-500/20",
        text: "text-blue-400",
        border: "border-blue-500/30",
        progress: "bg-blue-500",
      },
      yellow: {
        bg: "bg-yellow-500/20",
        text: "text-yellow-400",
        border: "border-yellow-500/30",
        progress: "bg-yellow-500",
      },
      pink: {
        bg: "bg-pink-500/20",
        text: "text-pink-400",
        border: "border-pink-500/30",
        progress: "bg-pink-500",
      },
      purple: {
        bg: "bg-purple-500/20",
        text: "text-purple-400",
        border: "border-purple-500/30",
        progress: "bg-purple-500",
      },
      red: {
        bg: "bg-red-500/20",
        text: "text-red-400",
        border: "border-red-500/30",
        progress: "bg-red-500",
      },
      green: {
        bg: "bg-green-500/20",
        text: "text-green-400",
        border: "border-green-500/30",
        progress: "bg-green-500",
      },
      indigo: {
        bg: "bg-indigo-500/20",
        text: "text-indigo-400",
        border: "border-indigo-500/30",
        progress: "bg-indigo-500",
      },
    };
    return colors[color] || colors.purple;
  };

  const getProgressBarColor = (percentage) => {
    if (percentage >= 100) return "bg-red-500";
    if (percentage >= 90) return "bg-yellow-500";
    if (percentage >= 75) return "bg-orange-500";
    return "bg-green-500";
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

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

  const categories = currentMonthBudgetData[0]?.categories || [];

  const underBudgetCount = categories.filter((c) => {
    const percentage = (c.spentAmount / c.budgetAmount) * 100;
    return percentage < 90;
  }).length;

  const nearLimitCount = categories.filter((c) => {
    const percentage = (c.spentAmount / c.budgetAmount) * 100;
    return percentage >= 90 && percentage < 100;
  }).length;

  const overBudgetCount = categories.filter((c) => {
    const percentage = (c.spentAmount / c.budgetAmount) * 100;
    return percentage >= 100;
  }).length;

  const maxValue = Math.max(
    ...categories.map((b) => Math.max(b.budgetAmount || 0, b.spentAmount || 0)),
    1
  );

  const overallPercentage =
    currentMonthSummaryData?.totalBudget > 0
      ? (currentMonthSummaryData?.totalSpent /
          currentMonthSummaryData?.totalBudget) *
        100
      : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading budgets...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* Alerts Modal */}
        {showAlerts && alerts.length > 0 && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-black border-2 border-yellow-500/50 rounded-2xl p-6 max-w-md w-full shadow-2xl shadow-yellow-500/20">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-black rounded-xl">
                    <Bell className="text-yellow-400" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    Budget Alerts
                  </h3>
                </div>
                <button
                  onClick={() => setShowAlerts(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="text-gray-400" size={20} />
                </button>
              </div>
              <div className="space-y-3">
                {alerts.map((alert, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl border ${
                      alert.severity === "high"
                        ? "bg-red-500/10 border-red-500/30"
                        : "bg-yellow-500/10 border-yellow-500/30"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <AlertTriangle
                        className={
                          alert.severity === "high"
                            ? "text-red-400"
                            : "text-yellow-400"
                        }
                        size={20}
                      />
                      <div className="flex-1">
                        <p
                          className={`font-medium ${
                            alert.severity === "high"
                              ? "text-red-300"
                              : "text-yellow-300"
                          }`}
                        >
                          {alert.type === "overall"
                            ? "Overall Budget"
                            : alert.category}
                        </p>
                        <p className="text-gray-300 text-sm mt-1">
                          {alert.message}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Budget Management
              </h1>
              <p className="text-purple-200">
                Track and manage your spending limits
              </p>
            </div>
            <div className="flex gap-3">
              {alerts.length > 0 && (
                <button
                  onClick={() => setShowAlerts(true)}
                  className="bg-yellow-600/20 hover:bg-yellow-600/30 border border-yellow-500/50 text-yellow-400 px-6 py-3 rounded-xl flex items-center gap-2 transition-all relative"
                >
                  <Bell size={20} />
                  <span className="font-medium">Alerts</span>
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                    {alerts.length}
                  </span>
                </button>
              )}
              <a
                href="/dashboard/budget/form"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-purple-500/50"
              >
                <Plus size={20} />
                Create New Budget
              </a>
            </div>
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
          </div>
        </div>

        {/* Overall Budget Summary Card */}
        <div className="bg-gradient-to-r from-purple-600/30 to-blue-600/30 backdrop-blur-lg rounded-2xl p-6 border-2 border-purple-500/50 mb-6 shadow-xl shadow-purple-500/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-white/10 rounded-xl">
              <Target className="text-purple-300" size={28} />
            </div>
            <h2 className="text-2xl font-bold text-white">
              Overall Budget Summary
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            <div>
              <p className="text-purple-200 text-sm mb-1">Total Budgeted</p>
              <p className="text-3xl font-bold text-white">
                ${(currentMonthSummaryData?.totalBudget || 0).toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-purple-200 text-sm mb-1">Total Spent</p>
              <p className="text-3xl font-bold text-orange-400">
                ${(currentMonthSummaryData?.totalSpent || 0).toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-purple-200 text-sm mb-1">Remaining</p>
              <p
                className={`text-3xl font-bold ${
                  (currentMonthSummaryData?.remaining || 0) >= 0
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                ${(currentMonthSummaryData?.remaining || 0).toFixed(2)}
              </p>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-purple-200 text-sm">Overall Progress</span>
              <span className="text-white font-semibold">
                {overallPercentage.toFixed(0)}%
              </span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden">
              <div
                className={`h-full ${getProgressBarColor(
                  overallPercentage
                )} transition-all duration-500 rounded-full`}
                style={{ width: `${Math.min(overallPercentage, 100)}%` }}
              />
            </div>
            {overallPercentage >= 90 && (
              <div className="flex items-center gap-2 mt-3 text-yellow-400">
                <AlertTriangle size={16} />
                <span className="text-sm">
                  You've used {overallPercentage.toFixed(0)}% of your total
                  budget
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Budget Cards Grid */}
        <div>
          {categories.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-400 text-lg">
                No budgets found for this month
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Create a new budget to get started
              </p>
            </div>
          ) : (
            <BudgetCard mockBudget={categories} renderIcon={renderIcon} budgetId={budgetId} fetchCurrentMonthBudget={fetchCurrentMonthBudget} />
          )}
        </div>

        {/* Budget Analytics Section */}
        {categories.length > 0 && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-purple-600/20 rounded-xl">
                <BarChart3 className="text-purple-400" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-white">
                Budget Analytics
              </h2>
            </div>

            {/* Bar Chart */}
            <div className="mb-6">
              <h3 className="text-white font-semibold mb-4">
                Budgeted vs Actual Spending
              </h3>
              <div className="space-y-4">
                {categories.map((data, index) => {
                  const budgetBar = (data.budgetAmount / maxValue) * 100;
                  const spentBar = (data.spentAmount / maxValue) * 100;
                  const isOver = data.spentAmount > data.budgetAmount;

                  return (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-300 text-sm font-medium w-24">
                          {data.category?.name}
                        </span>
                        <div className="flex-1 mx-4">
                          <div className="relative h-8">
                            <div
                              className="absolute top-0 bg-white/10 rounded-lg h-8 flex items-center justify-end px-2"
                              style={{ width: `${budgetBar}%` }}
                            >
                              <span className="text-white text-xs font-semibold">
                                ${data.budgetAmount}
                              </span>
                            </div>
                            <div
                              className={`absolute top-0 ${
                                isOver ? "bg-red-500" : "bg-green-500"
                              } rounded-lg h-8 flex items-center justify-end px-2 transition-all duration-500`}
                              style={{ width: `${spentBar}%` }}
                            >
                              <span className="text-white text-xs font-semibold">
                                ${data.spentAmount}
                              </span>
                            </div>
                          </div>
                        </div>
                        <span
                          className={`text-sm font-semibold w-16 text-right ${
                            isOver ? "text-red-400" : "text-green-400"
                          }`}
                        >
                          {(
                            (data.spentAmount / data.budgetAmount) *
                            100
                          ).toFixed(0)}
                          %
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
              <h3 className="text-white font-semibold mb-4">
                Spending Insights
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingDown className="text-green-400" size={20} />
                    <span className="text-green-400 font-semibold">
                      Under Budget
                    </span>
                  </div>
                  <p className="text-white text-2xl font-bold">
                    {underBudgetCount}
                  </p>
                  <p className="text-green-300 text-sm">categories</p>
                </div>
                <div className="bg-yellow-500/10 rounded-xl p-4 border border-yellow-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="text-yellow-400" size={20} />
                    <span className="text-yellow-400 font-semibold">
                      Near Limit
                    </span>
                  </div>
                  <p className="text-white text-2xl font-bold">
                    {nearLimitCount}
                  </p>
                  <p className="text-yellow-300 text-sm">categories</p>
                </div>
                <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="text-red-400" size={20} />
                    <span className="text-red-400 font-semibold">
                      Over Budget
                    </span>
                  </div>
                  <p className="text-white text-2xl font-bold">
                    {overBudgetCount}
                  </p>
                  <p className="text-red-300 text-sm">categories</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Budget History */}
        {categories.length > 0 && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-600/20 rounded-xl">
                <Calendar className="text-blue-400" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-white">
                Category Breakdown
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-4 py-3 text-left text-gray-300 font-semibold">
                      Category
                    </th>
                    <th className="px-4 py-3 text-right text-gray-300 font-semibold">
                      Budgeted
                    </th>
                    <th className="px-4 py-3 text-right text-gray-300 font-semibold">
                      Spent
                    </th>
                    <th className="px-4 py-3 text-right text-gray-300 font-semibold">
                      Difference
                    </th>
                    <th className="px-4 py-3 text-center text-gray-300 font-semibold">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((budget) => {
                    const difference = budget.budgetAmount - budget.spentAmount;
                    const percentage =
                      (budget.spentAmount / budget.budgetAmount) * 100;
                    const colors = getCategoryColor(budget.category?.color);

                    return (
                      <tr
                        key={budget._id}
                        className="border-t border-white/10 hover:bg-white/5 transition-colors"
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className={`p-2 rounded-lg ${colors.bg}`}>
                              <div className={colors.text}>
                                {renderIcon(budget.category?.icon)}
                              </div>
                            </div>
                            <span className="text-white font-medium">
                              {budget.category?.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right text-gray-300">
                          ${budget.budgetAmount.toFixed(2)}
                        </td>
                        <td className="px-4 py-3 text-right text-white font-semibold">
                          ${budget.spentAmount.toFixed(2)}
                        </td>
                        <td
                          className={`px-4 py-3 text-right font-semibold ${
                            difference >= 0 ? "text-green-400" : "text-red-400"
                          }`}
                        >
                          {difference >= 0 ? "+" : ""}${difference.toFixed(2)}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {percentage >= 100 ? (
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-400 border border-red-500/30">
                              Over
                            </span>
                          ) : percentage >= 90 ? (
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
        )}
      </div>
    </div>
  );
};

export default BudgetsPage;