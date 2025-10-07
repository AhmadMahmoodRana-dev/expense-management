import axios from "axios";
import { getAuthToken, clearAuthData } from "@/utils/auth";
import Baseurl from "@/constant/Baseurl";

// Create axios instance
const api = axios.create({
  baseURL: Baseurl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle token expiration
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized - Token expired or invalid
    if (error.response?.status === 401) {
      clearAuthData();
      
      // Only redirect if not already on login page
      if (typeof window !== "undefined" && !window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }

    // Handle 403 Forbidden - Email not verified
    if (error.response?.status === 403 && error.response?.data?.requiresVerification) {
      // You can handle this in the component or redirect to verification page
      console.log("Email verification required");
    }

    return Promise.reject(error);
  }
);

export default api;