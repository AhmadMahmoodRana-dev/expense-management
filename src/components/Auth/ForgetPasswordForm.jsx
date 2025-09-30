import AuthLayout from "@/layouts/AuthLayout";
import { ArrowRight, Mail } from "lucide-react";
import AuthInputField from "./AuthInputField";

const ForgetPasswordForm = ({handleInputChange,formData}) => (
    <AuthLayout 
      title="Reset Password" 
      subtitle="Enter your email to receive password reset instructions"
    >
      <div className="space-y-6">
        <AuthInputField 
          icon={Mail} 
          type="email" 
          placeholder="Enter your email address" 
          name="email" 
          handleInputChange={handleInputChange}
          formData={formData}
        />

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex">
            <Mail className="w-5 h-5 text-blue-500 mt-0.5" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Check your email</h3>
              <p className="text-sm text-blue-600 mt-1">
                We'll send password reset instructions to your email address.
              </p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
        >
          <span>Send Reset Link</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <div className="text-center space-y-2">
          <button 
            type="button"
            onClick={() => setCurrentPage('login')}
            className="text-indigo-600 hover:text-indigo-800 font-medium block w-full"
          >
            ← Back to Sign In
          </button>
          <div>
            <span className="text-gray-600">Don't have an account? </span>
            <button 
              type="button"
              onClick={() => setCurrentPage('register')}
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </AuthLayout>
  );

  export default ForgetPasswordForm;