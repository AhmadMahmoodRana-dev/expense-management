const AuthInputField = ({
  icon: Icon,
  type = "text",
  placeholder,
  name,
  required = true,
  handleInputChange,
  formData
}) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
      <Icon className="w-5 h-5 text-gray-400" />
    </div>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={formData[name] || ""}
      onChange={handleInputChange}
      required={required}
      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50/50"
    />
  </div>
);

export default AuthInputField;