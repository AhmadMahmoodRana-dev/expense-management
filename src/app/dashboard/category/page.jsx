"use client";

import React, { useState, useEffect, useContext } from "react";
import {Plus,Edit2,Trash2,Lock,Tag,TrendingUp,TrendingDown,Utensils,Car,Zap,Film,Home,ShoppingCart,Heart,Book,Plane,Gift,Coffee,Wifi,Phone,Briefcase,Dumbbell,Music,Palette,Wrench,Baby,PawPrint,Smartphone,Gamepad2,Pizza,GraduationCap,Stethoscope,Bus,Shirt,Building2,X,Loader2,AlertCircle,CheckCircle,ChevronDown,ChevronRight,Folder,FolderOpen,ShieldOff} from "lucide-react";
import api from "@/lib/axios";
import CategoryDrawer from "@/components/drawers/CategoryDrawer";
import { darkBackground, darkTextColor } from "@/color/DarkMode";
import { lightBackground, lightTextColor } from "@/color/LightMode";
import { Context } from "@/context/Context"; 
import InactiveCategoriesModal from "@/components/category/InactiveCategoriesModal";
import getCategoryColor from "@/color/getCategoryColor";

const CategoriesPage = () => {
  const { themeColor } = useContext(Context);
  const [activeTab, setActiveTab] = useState("expense");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [open, setOpen] = useState(false)
  
  const [isEdit, setIsEdit] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState(new Set());
  const iconMap = {Utensils,Car,Zap,Film,Home,ShoppingCart,Heart,Book,Plane,Gift,Coffee,Wifi,Phone,Briefcase,Dumbbell,Music,Palette,Wrench,Baby,PawPrint,Smartphone,Gamepad2,Pizza,GraduationCap,Stethoscope,Bus,Shirt,Building2,TrendingUp,TrendingDown,Tag,Folder,FolderOpen};
  const [formData, setFormData] = useState({
    name: "",
    type: "expense",
    icon: "Tag",
    color: "purple",
    description: "",
    parentCategory: "",
  });
  const resetform = () => {
    setFormData({
      name: "",
      type: activeTab,
      icon: "Tag",
      color: "purple",
      description: "",
      parentCategory: "",
    });
    setIsEdit(null);
  };

  // Handle Edit

  const handleEdit = (data) => {
    console.log(data, "EDIT DATA");
    setFormData({
      name: data?.name,
      type: data?.type,
      icon: data?.icon,
      color: data?.color,
      description: data?.description,
      parentCategory: data?.parentCategory?._id,
    });
    setShowAddCategoryModal(!showAddCategoryModal);
    setIsEdit(data?._id);
  };

  // Fetch categories with tree structure
  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await api.get(`/categories/${activeTab}`);
      const categoryTree = buildCategoryTree(data.data || []);
      setCategories(categoryTree);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  // Build hierarchical category tree
  const buildCategoryTree = (categories) => {
    const categoryMap = {};
    const roots = [];
    // Create a map of all categories
    categories.forEach((category) => {
      categoryMap[category._id] = { ...category, subcategories: [] };
    });
    // Build the tree
    categories.forEach((category) => {
      if (category.parentCategory && categoryMap[category.parentCategory._id]) {
        categoryMap[category.parentCategory._id].subcategories.push(
          categoryMap[category._id]
        );
      } else {
        roots.push(categoryMap[category._id]);
      }
    });
    return roots;
  };
  useEffect(() => {
    fetchCategories();
  }, [activeTab]);

  // Sync formData.type with activeTab
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      type: activeTab,
    }));
  }, [activeTab]);

  // Toggle category expansion
  const toggleCategory = (categoryId) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  // Delete category
  const handleDeleteCategory = async () => {
    try {
      setError(null);
      const { data } = await api.delete(`/categories/${selectedCategory._id}`);
      setSuccess("Category deleted successfully!");
      setShowDeleteModal(false);
      setSelectedCategory(null);
      fetchCategories();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  const openDeleteModal = (category) => {
    setSelectedCategory(category);
    setShowDeleteModal(true);
  };

  const InactivateCategory = async (id) =>{
    try {
      const {data} = await api.put(`inactivateCategory/${id}`)
      console.log("Inactivate DATA",data)
      fetchCategories()
    } catch (error) {
      console.error(error)
    }
  }


  const renderIcon = (iconName) => {
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent size={20} /> : <Tag size={20} />;
  };

  // Recursive component to render categories with subcategories
  const CategoryItem = ({ category, level = 0, isDefault = false }) => {
    const hasSubcategories =
      category.subcategories && category.subcategories.length > 0;
    const isExpanded = expandedCategories.has(category._id);
    const colors = getCategoryColor(category.color);

    return (
      <div className="mb-2">
        <div
          className={` ${
            themeColor == "dark" ? `bg-white/10` : `bg-gray-200`
          } backdrop-blur-lg rounded-2xl p-5 border border-white/20 hover:border-${
            category.color
          }-500/50 transition-all hover:shadow-lg hover:shadow-${
            category.color
          }-500/20 ${level > 0 ? "ml-6" : ""}`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {hasSubcategories && (
                <button
                  onClick={() => toggleCategory(category._id)}
                  className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                >
                  {isExpanded ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </button>
              )}
              {!hasSubcategories && <div className="w-6" />}

              <div
                className={`p-3 rounded-xl border ${colors.bg} ${colors.border}`}
              >
                <div className={colors.text}>{renderIcon(category.icon)}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleEdit(category)}
                className={`p-2 rounded-lg bg-white/5 hover:bg-white/10 ${
                  isDefault
                    ? "text-purple-400 hover:text-purple-300"
                    : "text-blue-400 hover:text-blue-300"
                } transition-colors`}
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={() => InactivateCategory(category?._id)}
                className={`p-2 rounded-lg bg-white/5 hover:bg-white/10 ${
                  isDefault
                    ? "text-purple-400 hover:text-purple-300"
                    : "text-blue-400 hover:text-blue-300"
                } transition-colors`}
              >
                <ShieldOff  size={16} />
              </button>

              {isDefault ? (
                <div
                  className="p-2 rounded-lg bg-white/5 text-gray-500 cursor-not-allowed"
                  title="Cannot delete default category"
                >
                  <Lock size={16} />
                </div>
              ) : (
                <button
                  onClick={() => openDeleteModal(category)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          </div>

          <h3
            className={`${
              themeColor == "dark" ? `${darkTextColor}` : `${lightTextColor}`
            } font-semibold mb-3 flex items-center gap-2`}
          >
            {category.name}
            {hasSubcategories && (
              <span className="text-xs bg-white/20 text-white px-2 py-1 rounded-full">
                {category.subcategories.length} subcategories
              </span>
            )}
          </h3>

          <div className="flex items-center gap-2 mb-4">
            <div className={`w-4 h-4 rounded-full ${colors.solid}`}></div>
            <span className="text-gray-400 text-xs capitalize">
              {category.color}
            </span>
            {category.parentCategory && (
              <span className="text-gray-400 text-xs ml-2">
                Parent: {category.parentCategory.name}
              </span>
            )}
          </div>

          {category.description && (
            <p className="text-gray-400 text-sm mb-4">{category.description}</p>
          )}

          <div
            className={`flex items-center gap-2 px-3 py-2 ${
              isDefault
                ? "bg-purple-500/10 border border-purple-500/30"
                : "bg-blue-500/10 border border-blue-500/30"
            } rounded-lg`}
          >
            {isDefault ? (
              <>
                <Lock size={14} className="text-purple-400" />
                <span className="text-xs font-medium text-purple-300">
                  Default Category
                </span>
              </>
            ) : (
              <>
                <Tag size={14} className="text-blue-400" />
                <span className="text-xs font-medium text-blue-300">
                  Custom Category
                </span>
              </>
            )}
          </div>
        </div>

        {/* Render subcategories if expanded */}
        {hasSubcategories && isExpanded && (
          <div className="mt-2">
            {category.subcategories.map((subcategory) => (
              <CategoryItem
                key={subcategory._id}
                category={subcategory}
                level={level + 1}
                isDefault={subcategory.isDefault}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  // Separate categories into default and custom
  const defaultCategories = categories.filter((c) => c.isDefault);
  const customCategories = categories.filter((c) => !c.isDefault);

  return (
    <div
      className={`min-h-screen ${
        themeColor == "dark" ? darkBackground : lightBackground
      } p-6`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Success/Error Messages */}
        {success && (
          <div className="mb-4 bg-green-500/20 border border-green-500/50 rounded-xl p-4 flex items-center gap-3">
            <CheckCircle className="text-green-400" size={20} />
            <span className="text-green-300">{success}</span>
          </div>
        )}

        {error && (
          <div className="mb-4 bg-red-500/20 border border-red-500/50 rounded-xl p-4 flex items-center gap-3">
            <AlertCircle className="text-red-400" size={20} />
            <span className="text-red-300">{error}</span>
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1
                className={`text-4xl font-bold ${
                  themeColor == "dark"
                    ? `${darkTextColor}`
                    : `${lightTextColor}`
                } mb-2`}
              >
                Categories
              </h1>
              <p
                className={`${
                  themeColor == "dark"
                    ? `${darkTextColor}`
                    : `${lightTextColor}`
                }`}
              >
                Manage your expense and income categories with subcategories
              </p>
            </div>
            <button
              onClick={() => setShowAddCategoryModal(!showAddCategoryModal)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-purple-500/50"
            >
              <Plus size={20} />
              Add Category
            </button>
          </div>

          {/* Tab Switcher */}
          <div className="flex justify-between">
            <div
              className={`${
                themeColor == "dark"
                  ? `bg-white/10 border-white/20 `
                  : `bg-gray-200 text-gray-500`
              } backdrop-blur-lg rounded-2xl p-2 border border-white/20 inline-flex gap-2`}
            >
              <button
                onClick={() => setActiveTab("expense")}
                className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                  activeTab === "expense"
                    ? "bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg"
                    : `${
                        themeColor == "dark"
                          ? `${darkTextColor}`
                          : `${lightTextColor}`
                      }  hover:bg-white/5`
                }`}
              >
                <TrendingDown size={20} />
                Expense Categories
              </button>
              <button
                onClick={() => setActiveTab("income")}
                className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                  activeTab === "income"
                    ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg"
                    : `${
                        themeColor == "dark"
                          ? `${darkTextColor}`
                          : `${lightTextColor}`
                      }  hover:bg-white/5`
                }`}
              >
                <TrendingUp size={20} />
                Income Categories
              </button>
            </div>
            <button onClick={() => setOpen(!open)} className="text-white bg-white/10 border-white/20 border px-3 py-1 rounded-xl font-semibold">
              <a className="bg-gradient-to-r hover:from-red-600 hover:to-orange-600 transition-all ease-in-out duration-1000 text-white shadow-lg px-6 py-3 rounded-xl">All Inactive Categories</a>
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-purple-400" size={48} />
          </div>
        ) : (
          <>
            {/* Statistics Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div
                className={`${
                  themeColor == "dark" ? `bg-white/10` : `bg-gray-200`
                } backdrop-blur-lg rounded-2xl p-6 border border-white/20`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 bg-purple-600/20 rounded-xl">
                    <Tag className="text-purple-400" size={24} />
                  </div>
                  <div>
                    <p
                      className={`${
                        themeColor == "dark" ? `text-white` : `text-gray-500`
                      } text-sm`}
                    >
                      Total Categories
                    </p>
                    <p
                      className={`text-3xl font-bold ${
                        themeColor == "dark" ? `text-white` : `text-gray-500`
                      }`}
                    >
                      {categories.length}
                    </p>
                  </div>
                </div>
              </div>
              <div
                className={`${
                  themeColor == "dark" ? `bg-white/10` : `bg-gray-200`
                } backdrop-blur-lg rounded-2xl p-6 border border-white/20`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 bg-blue-600/20 rounded-xl">
                    <Lock className="text-blue-400" size={24} />
                  </div>
                  <div>
                    <p
                      className={`${
                        themeColor == "dark" ? `text-white` : `text-gray-500`
                      } text-sm`}
                    >
                      Default Categories
                    </p>
                    <p
                      className={`text-3xl font-bold ${
                        themeColor == "dark" ? `text-white` : `text-gray-500`
                      }`}
                    >
                      {defaultCategories.length}
                    </p>
                  </div>
                </div>
              </div>
              <div
                className={`${
                  themeColor == "dark" ? `bg-white/10` : `bg-gray-200`
                } backdrop-blur-lg rounded-2xl p-6 border border-white/20`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 bg-green-600/20 rounded-xl">
                    <Tag className="text-green-400" size={24} />
                  </div>
                  <div>
                    <p
                      className={`${
                        themeColor == "dark" ? `text-white` : `text-gray-500`
                      } text-sm`}
                    >
                      Custom Categories
                    </p>
                    <p
                      className={`text-3xl font-bold ${
                        themeColor == "dark" ? `text-white` : `text-gray-500`
                      }`}
                    >
                      {customCategories.length}
                    </p>
                  </div>
                </div>
              </div>
              <div
                className={`${
                  themeColor == "dark" ? `bg-white/10` : `bg-gray-200`
                } backdrop-blur-lg rounded-2xl p-6 border border-white/20`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 bg-orange-600/20 rounded-xl">
                    <Folder className="text-orange-400" size={24} />
                  </div>
                  <div>
                    <p
                      className={`${
                        themeColor == "dark" ? `text-white` : `text-gray-500`
                      } text-sm`}
                    >
                      Parent Categories
                    </p>
                    <p
                      className={`text-3xl font-bold ${
                        themeColor == "dark" ? `text-white` : `text-gray-500`
                      }`}
                    >
                      {
                        categories.filter(
                          (cat) =>
                            cat.subcategories && cat.subcategories.length > 0
                        ).length
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Default Categories Section */}
            {defaultCategories.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-600/20 rounded-lg">
                    <Lock className="text-purple-400" size={20} />
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    Default Categories
                  </h2>
                  <span className="text-purple-300 text-sm">
                    ({defaultCategories.length} categories)
                  </span>
                </div>
                <div>
                  {defaultCategories.map((category) => (
                    <CategoryItem
                      key={category._id}
                      category={category}
                      isDefault={true}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Custom Categories Section */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-600/20 rounded-lg">
                  <Tag className="text-blue-400" size={20} />
                </div>
                <h2
                  className={`text-2xl font-bold ${
                    themeColor == "dark" ? `text-white` : "text-black"
                  }`}
                >
                  Custom Categories
                </h2>
                <span className="text-purple-300 text-sm">
                  ({customCategories.length} categories)
                </span>
              </div>

              {customCategories.length > 0 ? (
                <div>
                  {customCategories.map((category) => (
                    <CategoryItem
                      key={category._id}
                      category={category}
                      isDefault={false}
                    />
                  ))}
                </div>
              ) : (
                <div
                  className={`${
                    themeColor == "dark" ? `bg-white/10` : `bg-gray-200`
                  } backdrop-blur-lg rounded-2xl p-12 border-2 border-dashed border-white/20 text-center`}
                >
                  <div className="flex flex-col items-center gap-4">
                    <div className="p-4 bg-blue-600/20 rounded-full">
                      <Tag className="text-blue-400" size={48} />
                    </div>
                    <div>
                      <h3
                        className={`text-xl font-bold ${
                          themeColor == "dark" ? `text-white` : "text-black"
                        }  mb-2`}
                      >
                        No Custom Categories Yet
                      </h3>
                      <p
                        className={` mb-4 ${
                          themeColor == "dark" ? `text-white` : "text-black"
                        }`}
                      >
                        Create your first custom category to get started
                      </p>
                      <button
                        onClick={() =>
                          setShowAddCategoryModal(!showAddCategoryModal)
                        }
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
          </>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedCategory && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div
            className={` rounded-2xl border border-white/20 max-w-md w-full p-6 shadow-2xl`}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Delete Category</h2>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedCategory(null);
                }}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mb-6">
              <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 flex items-start gap-3 mb-4">
                <AlertCircle
                  className="text-red-400 flex-shrink-0 mt-0.5"
                  size={20}
                />
                <div>
                  <p className="text-red-300 font-semibold mb-1">
                    Are you sure?
                  </p>
                  <p className="text-red-300 text-sm">
                    {selectedCategory.subcategories &&
                    selectedCategory.subcategories.length > 0
                      ? `This category has ${selectedCategory.subcategories.length} subcategories. Deleting it will also delete all subcategories. This action cannot be undone.`
                      : `This will permanently delete the category "${selectedCategory.name}". This action cannot be undone.`}
                  </p>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`p-3 rounded-xl ${
                      getCategoryColor(selectedCategory.color).bg
                    }`}
                  >
                    <div
                      className={getCategoryColor(selectedCategory.color).text}
                    >
                      {renderIcon(selectedCategory.icon)}
                    </div>
                  </div>
                  <div>
                    <p className="text-white font-semibold">
                      {selectedCategory.name}
                    </p>
                    <p className="text-gray-400 text-sm capitalize">
                      {selectedCategory.type}
                    </p>
                    {selectedCategory.parentCategory && (
                      <p className="text-gray-400 text-sm">
                        Parent: {selectedCategory.parentCategory.name}
                      </p>
                    )}
                    {selectedCategory.subcategories &&
                      selectedCategory.subcategories.length > 0 && (
                        <p className="text-yellow-400 text-sm">
                          Has {selectedCategory.subcategories.length}{" "}
                          subcategories
                        </p>
                      )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedCategory(null);
                }}
                className="flex-1 bg-white/5 hover:bg-white/10 border border-white/20 text-white px-6 py-3 rounded-xl transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteCategory}
                className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-xl transition-all shadow-lg shadow-red-500/50"
              >
                Delete Category
              </button>
            </div>
          </div>
        </div>
      )}
      <CategoryDrawer
        fetchCategories={fetchCategories}
        categories={categories}
        setFormData={setFormData}
        formData={formData}
        setShowAddCategoryModal={setShowAddCategoryModal}
        showAddCategoryModal={showAddCategoryModal}
        resetform={resetform}
        isEdit={isEdit}
      />
      <InactiveCategoriesModal setOpen={setOpen} open={open} />
    </div>
  );
};

export default CategoriesPage;
