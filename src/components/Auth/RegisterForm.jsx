 import AuthLayout from "@/layouts/AuthLayout";
import AuthInputField from "./AuthInputField";
import AuthPasswordField from "./AuthPasswordField";
import { ArrowRight, Mail, User } from "lucide-react";
 const RegisterForm = ({handleInputChange,formData}) => (
    <AuthLayout 
      title="Create Account" 
      subtitle="Join thousands of users managing their expenses smarter"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <AuthInputField 
            icon={User} 
            placeholder="First name" 
            name="firstName" 
            handleInputChange={handleInputChange}
            formData={formData}
          />
          <AuthInputField 
            icon={User} 
            placeholder="Last name" 
            name="lastName" 
            handleInputChange={handleInputChange}
            formData={formData}
          />
        </div>
        
        <AuthInputField 
          icon={Mail} 
          type="email" 
          placeholder="Enter your email" 
          name="email"
          handleInputChange={handleInputChange} 
          formData={formData}
        />
        
        <AuthPasswordField 
          placeholder="Create password" 
          name="password" 
          handleInputChange={handleInputChange}
          formData={formData}
        />
        
        <AuthPasswordField 
          placeholder="Confirm password" 
          name="confirmPassword" 
          handleInputChange={handleInputChange}
          formData={formData}
        />

        <div className="flex items-start">
          <input 
            type="checkbox" 
            required
            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 mt-1" 
          />
          <label className="ml-3 text-sm text-gray-600">
            I agree to the{' '}
            <a href="#" className="text-indigo-600 hover:text-indigo-800">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-indigo-600 hover:text-indigo-800">Privacy Policy</a>
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
        >
          <span>Create Account</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <div className="text-center">
          <span className="text-gray-600">Already have an account? </span>
          <button 
            type="button"
            onClick={() => setCurrentPage('login')}
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Sign in
          </button>
        </div>
      </div>
    </AuthLayout>
  );

  export default RegisterForm;