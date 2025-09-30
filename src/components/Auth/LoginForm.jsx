import AuthLayout from "@/layouts/AuthLayout";
import AuthInputField from "./AuthInputField";
import AuthPasswordField from "./AuthPasswordField";
import { ArrowRight, Mail } from "lucide-react";

const LoginForm = ({ handleInputChange, formData }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted Login:", formData);
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your account to continue managing your expenses"
    >
      <div className="space-y-6">
        <AuthInputField
          icon={Mail}
          type="email"
          placeholder="Enter your email"
          name="email"
          handleInputChange={handleInputChange}
          formData={formData}
        />
        <AuthPasswordField
          placeholder="Enter your password"
          name="password"
          handleInputChange={handleInputChange}
          formData={formData}
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
          <button
            type="button"
            onClick={() => setCurrentPage("forgot")}
            className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Forgot password?
          </button>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
        >
          <span>Sign In</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <div className="text-center">
          <span className="text-gray-600">Don't have an account? </span>
          <button
            type="button"
            onClick={() => setCurrentPage("register")}
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Sign up
          </button>
        </div>
      </div>
    </AuthLayout>
  );
};

export default LoginForm;
