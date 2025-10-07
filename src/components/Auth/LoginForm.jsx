import AuthLayout from "@/layouts/AuthLayout";
import AuthInputField from "./AuthInputField";
import AuthPasswordField from "./AuthPasswordField";
import { ArrowRight, Mail } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Baseurl from "@/constant/Baseurl";

const LoginForm = ({ setCurrentPage }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({email: "",password: ""});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // Step 3: Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.email || !formData.password) {
        alert("Please fill in all required fields.");
        return;
      }
      const response = await axios.post(`${Baseurl}/users/login`, formData);
      console.log("Login successful:", response.data);

      // ✅ Store token in localStorage
      const token = response.data.token;

      if (token) {
        const expiry = new Date();
        expiry.setDate(expiry.getDate() + 7);

        const authData = {
          token,
          user: response.data.user,
          expiry: expiry.getTime(),
        };

        localStorage.setItem("authData", JSON.stringify(authData));
        console.log("✅ Token saved to localStorage for 7 days");
      }
      // ✅ Clear form
      setFormData({email: "",password: ""});
      router.push("/dashboard");
    } catch (error) {
      console.error("Error during login:", error);
      alert(error.response?.data?.message || "Login failed. Try again.");
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your account to continue managing your expenses"
    >
      <form autoComplete="off" onSubmit={handleSubmit} className="space-y-6">
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
          type="submit"
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
      </form>
    </AuthLayout>
  );
};

export default LoginForm;
