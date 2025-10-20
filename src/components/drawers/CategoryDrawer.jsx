"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  TransitionChild,
} from "@headlessui/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Tag,
  TrendingUp,
  TrendingDown,
  Utensils,
  Car,
  Zap,
  Film,
  Home,
  ShoppingCart,
  Heart,
  Book,
  Plane,
  Gift,
  Coffee,
  Wifi,
  Phone,
  Briefcase,
  Dumbbell,
  Music,
  Palette,
  Wrench,
  Baby,
  PawPrint,
  Smartphone,
  Gamepad2,
  Pizza,
  GraduationCap,
  Stethoscope,
  Bus,
  Shirt,
  Building2,
  X,
  Folder,
  FolderOpen,
} from "lucide-react";
import api from "@/lib/axios";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";

const CategoryDrawer = ({
  fetchCategories,
  categories,
  formData,
  setFormData,
  showAddCategoryModal,
  setShowAddCategoryModal,
  resetform,
}) => {
  const iconMap = {
    Utensils,
    Car,
    Zap,
    Film,
    Home,
    ShoppingCart,
    Heart,
    Book,
    Plane,
    Gift,
    Coffee,
    Wifi,
    Phone,
    Briefcase,
    Dumbbell,
    Music,
    Palette,
    Wrench,
    Baby,
    PawPrint,
    Smartphone,
    Gamepad2,
    Pizza,
    GraduationCap,
    Stethoscope,
    Bus,
    Shirt,
    Building2,
    TrendingUp,
    TrendingDown,
    Tag,
    Folder,
    FolderOpen,
  };
  const colorOptions = [
    "orange",
    "blue",
    "yellow",
    "pink",
    "purple",
    "red",
    "green",
    "indigo",
    "cyan",
    "rose",
    "amber",
    "teal",
    "violet",
    "slate",
  ];
  const iconOptions = Object.keys(iconMap);

  console.log(formData, "FORMDATA");

  const getParentCategoryOptions = (currentCategoryId = null) => {
    const flattenCategories = (cats, level = 0) => {
      let result = [];
      cats.forEach((cat) => {
        // Don't include the current category or its subcategories in parent options
        if (cat._id !== currentCategoryId) {
          result.push({
            ...cat,
            name: `${"– ".repeat(level)}${cat.name}`,
            level,
          });
          if (cat.subcategories && cat.subcategories.length > 0) {
            result = result.concat(
              flattenCategories(cat.subcategories, level + 1)
            );
          }
        }
      });
      return result;
    };

    return flattenCategories(categories);
  };

  // Create category
  const handleCreateCategory = async (e) => {
    e.preventDefault();
    try {
      const categoryData = {
        ...formData,
        parentCategory: formData.parentCategory || undefined,
      };

      const { data } = await api.post("/add_categories", categoryData);
      console.log(data), "category created";
      if (data.success === true) {
        setShowAddCategoryModal(false);
        resetform();
      }
      fetchCategories();
    } catch (err) {
      console.error(err);
    }
  };

  const getCategoryColor = (color) => {
    const colors = {
      orange: {
        bg: "bg-orange-500/20",
        text: "text-orange-400",
        border: "border-orange-500/30",
        solid: "bg-orange-500",
      },
      blue: {
        bg: "bg-blue-500/20",
        text: "text-blue-400",
        border: "border-blue-500/30",
        solid: "bg-blue-500",
      },
      yellow: {
        bg: "bg-yellow-500/20",
        text: "text-yellow-400",
        border: "border-yellow-500/30",
        solid: "bg-yellow-500",
      },
      pink: {
        bg: "bg-pink-500/20",
        text: "text-pink-400",
        border: "border-pink-500/30",
        solid: "bg-pink-500",
      },
      purple: {
        bg: "bg-purple-500/20",
        text: "text-purple-400",
        border: "border-purple-500/30",
        solid: "bg-purple-500",
      },
      red: {
        bg: "bg-red-500/20",
        text: "text-red-400",
        border: "border-red-500/30",
        solid: "bg-red-500",
      },
      green: {
        bg: "bg-green-500/20",
        text: "text-green-400",
        border: "border-green-500/30",
        solid: "bg-green-500",
      },
      indigo: {
        bg: "bg-indigo-500/20",
        text: "text-indigo-400",
        border: "border-indigo-500/30",
        solid: "bg-indigo-500",
      },
      cyan: {
        bg: "bg-cyan-500/20",
        text: "text-cyan-400",
        border: "border-cyan-500/30",
        solid: "bg-cyan-500",
      },
      rose: {
        bg: "bg-rose-500/20",
        text: "text-rose-400",
        border: "border-rose-500/30",
        solid: "bg-rose-500",
      },
      amber: {
        bg: "bg-amber-500/20",
        text: "text-amber-400",
        border: "border-amber-500/30",
        solid: "bg-amber-500",
      },
      teal: {
        bg: "bg-teal-500/20",
        text: "text-teal-400",
        border: "border-teal-500/30",
        solid: "bg-teal-500",
      },
      violet: {
        bg: "bg-violet-500/20",
        text: "text-violet-400",
        border: "border-violet-500/30",
        solid: "bg-violet-500",
      },
      slate: {
        bg: "bg-slate-500/20",
        text: "text-slate-400",
        border: "border-slate-500/30",
        solid: "bg-slate-500",
      },
    };
    return colors[color] || colors.purple;
  };

  return (
    <div>
      <Dialog
        open={showAddCategoryModal}
        onClose={setShowAddCategoryModal}
        className="relative z-10"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/50 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
        />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <DialogPanel
                transition
                className="pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
              >
                <TransitionChild>
                  <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 duration-500 ease-in-out data-closed:opacity-0 sm:-ml-5 z-30 sm:pr-4">
                    <button
                      type="button"
                      onClick={() => setShowAddCategoryModal(false)}
                      className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                    >
                      <span className="absolute -inset-2.5" />
                      <span className="sr-only">Close panel</span>
                      <X aria-hidden="true" className="size-6" />
                    </button>
                  </div>
                </TransitionChild>
                <div className="relative flex h-full flex-col overflow-y-auto bg-gradient-to-br from-slate-900 to-purple-900 py-6 shadow-xl after:absolute after:inset-y-0 after:left-0 after:w-px after:bg-white/10">
                  <div className="px-6 sm:px-10">
                    <DialogTitle className="text-2xl font-bold text-white">
                      Add New Category
                    </DialogTitle>
                  </div>
                  <form
                    onSubmit={handleCreateCategory}
                    className="px-4 space-y-4"
                  >
                    <div>
                      <label className="text-purple-200 text-sm mb-2 block">
                        Category Name *
                      </label>
                      <Input
                        type="text"
                        placeholder="e.g., Coffee Shops"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                        className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="text-purple-200 text-sm mb-2 block">
                        Parent Category (Optional)
                      </label>

                      <Select
                        value={formData.parentCategory || "none"}
                        onValueChange={(value) =>
                          setFormData({
                            ...formData,
                            parentCategory:
                              value === "none" ? undefined : value,
                          })
                        }
                      >
                        <SelectTrigger className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500">
                          <SelectValue placeholder="No Parent (Top Level Category)" />
                        </SelectTrigger>

                        <SelectContent className="bg-[#2c1c4f] border border-white/20 text-white  rounded-xl">
                          <SelectGroup>
                            <SelectLabel>Categories</SelectLabel>
                            <SelectItem value="none">
                              No Parent (Top Level Category)
                            </SelectItem>
                            {getParentCategoryOptions().map((category) => (
                              <SelectItem
                                key={category._id}
                                value={category._id}
                              >
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>

                      <p className="text-gray-400 text-xs mt-1">
                        Select a parent category to make this a subcategory
                      </p>
                    </div>

                    <div>
                      <label className="text-purple-200 text-sm mb-2 block">
                        Icon *
                      </label>
                      <div className="grid grid-cols-6 gap-2 max-h-48 overflow-y-auto p-2 bg-white/5 rounded-xl">
                        {iconOptions.map((icon) => {
                          const IconComponent = iconMap[icon];
                          return (
                            <button
                              key={icon}
                              type="button"
                              onClick={() => setFormData({ ...formData, icon })}
                              className={`p-3 rounded-lg border transition-all ${
                                formData.icon === icon
                                  ? "bg-purple-500/20 border-purple-500/50 text-purple-300"
                                  : "bg-white/5 border-white/20 text-white hover:bg-white/10"
                              }`}
                            >
                              <IconComponent size={20} />
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label className="text-purple-200 text-sm mb-2 block">
                        Color *
                      </label>
                      <div className="grid grid-cols-7 gap-2">
                        {colorOptions.map((color) => {
                          const colors = getCategoryColor(color);
                          return (
                            <button
                              key={color}
                              type="button"
                              onClick={() =>
                                setFormData({ ...formData, color })
                              }
                              className={`p-3 rounded-lg border transition-all ${
                                formData.color === color
                                  ? `${colors.solid} border-white/50 ring-2 ring-white/50`
                                  : `${colors.solid} border-white/20 hover:border-white/40`
                              }`}
                            />
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label className="text-purple-200 text-sm mb-2 block">
                        Description (Optional)
                      </label>
                      <Textarea
                        placeholder="Brief description..."
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                        rows={3}
                        className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 resize-none"
                      />
                    </div>

                    <div className="pt-4 flex gap-3">
                      <Button
                        type="button"
                        onClick={() => {
                          setShowAddModal(false);
                        }}
                        className="flex-1 bg-white/5 hover:bg-white/10 border border-white/20 text-white px-6 py-3 rounded-xl transition-all"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl transition-all shadow-lg shadow-purple-500/50"
                      >
                        Create Category
                      </Button>
                    </div>
                  </form>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default CategoryDrawer;
