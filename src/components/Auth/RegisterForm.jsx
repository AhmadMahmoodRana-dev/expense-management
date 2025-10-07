"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AuthLayout from "@/layouts/AuthLayout";
import AuthInputField from "./AuthInputField";
import AuthPasswordField from "./AuthPasswordField";
import { ArrowRight, Mail, User, Phone, CheckCircle } from "lucide-react";
import axios from "axios";
import Baseurl from "@/constant/Baseurl";

const RegisterForm = ({ setCurrentPage }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showVerificationMessage, setShowVerificationMessage] = useState(false);
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(""); // Clear error when user types
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      setError("First name is required");
      return false;
    }
    if (!formData.lastName.trim()) {
      setError("Last name is required");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (!formData.phone.trim()) {
      setError("Phone number is required");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      console.log("✅ Submitting registration:", formData);
      
      const response = await axios.post(`${Baseurl}/users/register`, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      console.log("Registration successful:", response.data);

      // ✅ Store token in localStorage
      const token = response.data.token;
      if (token) {
        const expiry = new Date();
        expiry.setDate(expiry.getDate() + 7); // expires in 7 days

        const authData = {
          token,
          user: response.data.user,
          expiry: expiry.getTime(),
        };

        localStorage.setItem("authData", JSON.stringify(authData));
        console.log("✅ Token saved to localStorage for 7 days");
      }

      // Show verification message
      setShowVerificationMessage(true);

      // Clear form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });

      // Redirect after 3 seconds or let user click
      setTimeout(() => {
        if (response.data.user?.isVerified) {
          router.push("/dashboard");
        } else {
          setCurrentPage("login");
        }
      }, 3000);

    } catch (error) {
      console.error("Error during registration:", error);
      setError(
        error.response?.data?.message || 
        "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (showVerificationMessage) {
    return (
      <AuthLayout
        title="Check Your Email"
        subtitle="We've sent you a verification link"
      >
        <div className="space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-green-800 mb-2">
              Registration Successful!
            </h3>
            <p className="text-green-700 mb-4">
              We've sent a verification email to <strong>{formData.email}</strong>
            </p>
            <p className="text-sm text-green-600">
              Please check your inbox and click the verification link to activate your account.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-sm text-blue-800">
              <strong>Didn't receive the email?</strong>
            </p>
            <ul className="text-sm text-blue-600 mt-2 ml-4 list-disc">
              <li>Check your spam folder</li>
              <li>Make sure the email address is correct</li>
              <li>Wait a few minutes and check again</li>
            </ul>
          </div>

          <button
            onClick={() => setCurrentPage("login")}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200"
          >
            Go to Login
          </button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join thousands of users managing their expenses smarter"
    >
      <form autoComplete="off" onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <AuthInputField
            icon={User}
            placeholder="First name"
            name="firstName"
            handleInputChange={handleInputChange}
            formData={formData}
            disabled={loading}
          />
          <AuthInputField
            icon={User}
            placeholder="Last name"
            name="lastName"
            handleInputChange={handleInputChange}
            formData={formData}
            disabled={loading}
          />
        </div>

        <AuthInputField
          icon={Mail}
          type="email"
          placeholder="Enter your email"
          name="email"
          handleInputChange={handleInputChange}
          formData={formData}
          disabled={loading}
        />

        <AuthInputField
          icon={Phone}
          type="tel"
          placeholder="Enter your phone number"
          name="phone"
          handleInputChange={handleInputChange}
          formData={formData}
          disabled={loading}
        />

        <AuthPasswordField
          placeholder="Create password"
          name="password"
          handleInputChange={handleInputChange}
          formData={formData}
          disabled={loading}
        />

        <AuthPasswordField
          placeholder="Confirm password"
          name="confirmPassword"
          handleInputChange={handleInputChange}
          formData={formData}
          disabled={loading}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <span>{loading ? "Creating Account..." : "Create Account"}</span>
          {!loading && <ArrowRight className="w-4 h-4" />}
        </button>

        <div className="text-center">
          <span className="text-gray-600">Already have an account? </span>
          <button
            type="button"
            onClick={() => setCurrentPage("login")}
            className="text-indigo-600 hover:text-indigo-800 font-medium"
            disabled={loading}
          >
            Sign in
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default RegisterForm;