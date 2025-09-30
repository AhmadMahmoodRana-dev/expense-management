'use client'

import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, DollarSign, TrendingUp, PieChart } from 'lucide-react';
import LoginForm from '@/components/Auth/LoginForm';
import RegisterForm from '@/components/Auth/RegisterForm';
import ForgetPasswordForm from '@/components/Auth/ForgetPasswordForm';

const ExpenseAuthSystem = () => {
  const [currentPage, setCurrentPage] = useState('login');
  const [formData, setFormData] = useState({email: '',password: '',confirmPassword: '',firstName: '',lastName: ''});

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

 
  
  

  

  
 

  // Navigation for demo purposes
  const Navigation = () => (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-2 flex space-x-2">
        <button
          onClick={() => setCurrentPage('login')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            currentPage === 'login' 
              ? 'bg-indigo-600 text-white' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setCurrentPage('register')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            currentPage === 'register' 
              ? 'bg-indigo-600 text-white' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Register
        </button>
        <button
          onClick={() => setCurrentPage('forgot')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            currentPage === 'forgot' 
              ? 'bg-indigo-600 text-white' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Forgot
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <Navigation />
      {currentPage === 'login' && <LoginForm handleInputChange={handleInputChange} formData={formData} />}
      {currentPage === 'register' && <RegisterForm handleInputChange={handleInputChange} formData={formData} />}
      {currentPage === 'forgot' && <ForgetPasswordForm handleInputChange={handleInputChange} formData={formData} />}
    </div>
  );
};

export default ExpenseAuthSystem;