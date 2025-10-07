"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import AuthLayout from "@/layouts/AuthLayout";
import AuthPasswordField from "@/components/auth/AuthPasswordField";
import { ArrowRight, CheckCircle, AlertCircle } from "lucide-react";
import axios from "axios";
import Baseurl from "@/constant/Baseurl";

const ResetPassword = () => {
  const router = useRouter();
  const params = useParams();
  const token = params?.token;

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [tokenValid, setTokenValid] = useState(true);

  useEffect(() => {
    if (!token) {
      setTokenValid(false);
      setError("Invalid or missing reset token");
    }
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const validateForm = () => {
    if (!formData.newPassword) {
      setError("Password is required");
      return false;
    }
    if (formData.newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    if (formData.newPassword !== formData.confirmPassword) {
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
      console.log("✅ Resetting password with token:", token);

      const response = await axios.post(
        `${Baseurl}/reset-password/${token}`,
        {
          newPassword: formData.newPassword,
        }
      );

      console.log("Password reset successful:", response.data);
      setSuccess(true);

      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push("/auth");
      }, 3000);

    } catch (error) {
      console.error("Error resetting password:", error);
      
      const errorMessage = error.response?.data?.message || 
        "Failed to reset password. Please try again.";
      
      setError(errorMessage);

      // If token is invalid or expired
      if (errorMessage.includes("Invalid") || errorMessage.includes("expired")) {
        setTokenValid(false);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!tokenValid) {
    return (
      <AuthLayout
        title="Invalid Link"
        subtitle="This password reset link is invalid or has expired"
      >
        <div className="space-y-6">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-red-800 mb-2">
              Link Expired or Invalid
            </h3>
            <p className="text-red-700 mb-4">
              This password reset link is no longer valid. Password reset links
              expire after 15 minutes for security reasons.
            </p>
          </div>

          <button
            onClick={() => router.push("/forgot-password")}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200"
          >
            Request New Reset Link
          </button>

          <button
            onClick={() => router.push("/login")}
            className="w-full text-indigo-600 hover:text-indigo-800 font-medium"
          >
            ← Back to Sign In
          </button>
        </div>
      </AuthLayout>
    );
  }

  if (success) {
    return (
      <AuthLayout
        title="Password Reset Successful"
        subtitle="Your password has been successfully reset"
      >
        <div className="space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-green-800 mb-2">
              Success!
            </h3>
            <p className="text-green-700 mb-4">
              Your password has been reset successfully.
            </p>
            <p className="text-sm text-green-600">
              You can now sign in with your new password.
            </p>
          </div>

          <button
            onClick={() => router.push("/login")}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200"
          >
            Go to Sign In
          </button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Enter your new password"
    >
      <form autoComplete="off" onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <AuthPasswordField
          placeholder="Enter new password"
          name="newPassword"
          handleInputChange={handleInputChange}
          formData={formData}
          disabled={loading}
        />

        <AuthPasswordField
          placeholder="Confirm new password"
          name="confirmPassword"
          handleInputChange={handleInputChange}
          formData={formData}
          disabled={loading}
        />

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-sm text-blue-800 font-medium mb-2">
            Password Requirements:
          </p>
          <ul className="text-sm text-blue-600 ml-4 list-disc space-y-1">
            <li>At least 6 characters long</li>
            <li>Contains uppercase and lowercase letters (recommended)</li>
            <li>Includes numbers and special characters (recommended)</li>
          </ul>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <span>{loading ? "Resetting Password..." : "Reset Password"}</span>
          {!loading && <ArrowRight className="w-4 h-4" />}
        </button>

        <div className="text-center">
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="text-indigo-600 hover:text-indigo-800 font-medium"
            disabled={loading}
          >
            ← Back to Sign In
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default ResetPassword;