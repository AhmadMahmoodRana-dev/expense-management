"use client"
import { Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";


const AuthPasswordField = ({
  placeholder,
  name,
  required = true,
  handleInputChange,
  formData
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Lock className="w-5 h-5 text-gray-400" />
      </div>
      <input
        type={showPassword ? "text" : "password"}
        name={name}
        placeholder={placeholder}
        value={formData[name] || ""}
        onChange={handleInputChange}
        required={required}
        autoComplete="off"
        className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50/50"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute inset-y-0 right-0 pr-4 flex items-center"
      >
        {showPassword ? (
          <EyeOff className="w-5 h-5 text-gray-400 hover:text-gray-600" />
        ) : (
          <Eye className="w-5 h-5 text-gray-400 hover:text-gray-600" />
        )}
      </button>
    </div>
  );
};

export default AuthPasswordField;
