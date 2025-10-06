"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AuthLayout from "@/layouts/AuthLayout";
import AuthInputField from "./AuthInputField";
import AuthPasswordField from "./AuthPasswordField";
import { ArrowRight, Mail, User, Phone } from "lucide-react";
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
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if (
      !formData.email ||
      !formData.password ||
      !formData.firstName ||
      !formData.lastName
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    console.log("✅ Form submitted Register:", formData);
    const response = await axios.post(`${Baseurl}auth/register`, formData);

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

    // ✅ Clear form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });

    // Optionally navigate to login or dashboard
    router.push("/dashboard");

  } catch (error) {
    console.error("Error during registration:", error);
    alert(error.response?.data?.message || "Registration failed. Try again.");
  }
};


  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join thousands of users managing their expenses smarter"
    >
      <form autoComplete="off" onSubmit={handleSubmit} className="space-y-6">
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

        <AuthInputField
          icon={Phone}
          type="number"
          placeholder="Enter your phone number"
          name="phone"
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
            onClick={() => setCurrentPage("login")}
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Sign in
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default RegisterForm;
