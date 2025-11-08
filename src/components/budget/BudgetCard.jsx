import React, { useState } from "react";
import { Edit2, Trash2, AlertTriangle, Check, X } from "lucide-react";
import axios from "axios";
import api from "@/lib/axios";

const BudgetCard = ({
  mockBudget,
  renderIcon,
  budgetId,
  fetchCurrentMonthBudget,
}) => {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ spendAmount: 0 });
  const [deletingId, setDeletingId] = useState(null);
  console.log("Mock Budget:", mockBudget);

  const getCategoryColor = (color) => {
    const colors = {
      blue: {
        bg: "bg-blue-500/10",
        border: "border-blue-500/30",
        text: "text-blue-400",
      },
      green: {
        bg: "bg-green-500/10",
        border: "border-green-500/30",
        text: "text-green-400",
      },
      purple: {
        bg: "bg-purple-500/10",
        border: "border-purple-500/30",
        text: "text-purple-400",
      },
      red: {
        bg: "bg-red-500/10",
        border: "border-red-500/30",
        text: "text-red-400",
      },
      yellow: {
        bg: "bg-yellow-500/10",
        border: "border-yellow-500/30",
        text: "text-yellow-400",
      },
    };
    return colors[color] || colors.blue;
  };

  const getProgressBarColor = (percentage) => {
    if (percentage >= 100) return "bg-red-500";
    if (percentage >= 90) return "bg-yellow-500";
    return "bg-green-500";
  };

  const handleEdit = (budget) => {
    setEditingId(budget._id);
    setEditForm({
      spendAmount: budget.spentAmount,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({ spendAmount: 0 });
  };

  const handleSaveEdit = async (categoryId) => {
    try {
      console.log("Saving budget:", budgetId, editForm);
      const { data } = await api.put(
        `/${budgetId}/categories/${categoryId}/spent`,
        {
          spentAmount: editForm.spendAmount,
        }
      );
      fetchCurrentMonthBudget();
      setEditingId(null);
    } catch (error) {
      console.error("Error updating budget:", error);
    }
  };

  const deleteBudget = async (categoryId) => {
    setDeletingId(categoryId);
    try {
      console.log("Deleting budget:", budgetId);
      const { data } = await api.delete(
        `/${budgetId}/categories/${categoryId}/delete`
      );
      fetchCurrentMonthBudget();
      console.log("Deleted budget data:", data);
    } catch (error) {
      console.error("Error deleting budget:", error);
    } finally {
      setDeletingId(null);
    }
  };

  const renderBudgetCard = (budget) => {
    const colors = getCategoryColor(budget?.category?.color);
    const remaining = budget.budgetAmount - budget.spentAmount;
    const percentage = (budget.spentAmount / budget.budgetAmount) * 100;
    const isEditing = editingId === budget._id;

    return (
      <div
        key={budget._id}
        className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 border border-white/20 hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/20"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div
            className={`p-3 rounded-xl border ${colors.bg} ${colors.border}`}
          >
            <div className={`${colors.text} text-2xl`}>
              {renderIcon(budget.category?.icon)}
            </div>
          </div>

          <div className="flex gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={() => handleSaveEdit(budget._id)}
                  className="p-2 rounded-lg bg-green-500/20 hover:bg-green-500/30 text-green-400 hover:text-green-300 transition-colors"
                >
                  <Check size={16} />
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 transition-colors"
                >
                  <X size={16} />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleEdit(budget)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-purple-400 hover:text-purple-300 transition-colors"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => deleteBudget(budget._id)}
                  disabled={deletingId === budget._id}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
                >
                  <Trash2 size={16} />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Content */}
        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-400 text-sm mb-2">
                Spent Amount
              </label>
              <input
                type="number"
                step="0.01"
                value={editForm.spendAmount}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    spendAmount: parseFloat(e.target.value) || 0,
                  })
                }
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500/50"
              />
            </div>

            <div className="bg-white/5 rounded-lg p-3 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Budgeted</span>
                <span className="text-orange-400 font-semibold">
                  ${budget.budgetAmount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">New Remaining</span>
                <span
                  className={`font-semibold ${
                    budget.budgetAmount - editForm.spendAmount >= 0
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  $
                  {Math.abs(budget.budgetAmount - editForm.spendAmount).toFixed(
                    2
                  )}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <>
            <h3 className="text-white font-semibold mb-4">
              {budget.category?.name}
            </h3>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Budgeted</span>
                <span className="text-white font-semibold">
                  ${budget?.budgetAmount?.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Spent</span>
                <span
                  className={`font-semibold ${
                    percentage >= 100 ? "text-red-400" : "text-orange-400"
                  }`}
                >
                  ${budget?.spentAmount?.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Remaining</span>
                <span
                  className={`font-semibold ${
                    remaining >= 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  ${Math.abs(remaining).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Progress */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400 text-xs">Progress</span>
                <span
                  className={`text-xs font-semibold ${
                    percentage >= 100
                      ? "text-red-400"
                      : percentage >= 90
                      ? "text-yellow-400"
                      : "text-green-400"
                  }`}
                >
                  {percentage.toFixed(0)}%
                </span>
              </div>

              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full ${getProgressBarColor(
                    percentage
                  )} transition-all duration-500`}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                />
              </div>
            </div>

            {/* Alerts */}
            {percentage >= 100 && (
              <div className="flex items-center gap-2 mt-3 text-red-400 bg-red-500/10 px-3 py-2 rounded-lg">
                <AlertTriangle size={14} />
                <span className="text-xs font-medium">Budget exceeded!</span>
              </div>
            )}
            {percentage >= 90 && percentage < 100 && (
              <div className="flex items-center gap-2 mt-3 text-yellow-400 bg-yellow-500/10 px-3 py-2 rounded-lg">
                <AlertTriangle size={14} />
                <span className="text-xs font-medium">Nearing limit</span>
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
      {mockBudget.map((budget) => renderBudgetCard(budget))}
    </div>
  );
};

export default BudgetCard;
