// utils/auth.js

/**
 * Get authentication data from localStorage
 * @returns {Object|null} Authentication data or null if not found/expired
 */
export const getAuthData = () => {
  if (typeof window === "undefined") return null;

  try {
    const authData = localStorage.getItem("authData");
    if (!authData) return null;

    const parsed = JSON.parse(authData);
    
    // Check if token is expired
    if (parsed.expiry && Date.now() > parsed.expiry) {
      localStorage.removeItem("authData");
      return null;
    }

    return parsed;
  } catch (error) {
    console.error("Error parsing auth data:", error);
    localStorage.removeItem("authData");
    return null;
  }
};

/**
 * Get authentication token
 * @returns {string|null} Token or null if not found
 */
export const getAuthToken = () => {
  const authData = getAuthData();
  return authData?.token || null;
};

/**
 * Get current user
 * @returns {Object|null} User object or null if not found
 */
export const getCurrentUser = () => {
  const authData = getAuthData();
  return authData?.user || null;
};

/**
 * Check if user is authenticated
 * @returns {boolean} True if authenticated, false otherwise
 */
export const isAuthenticated = () => {
  return !!getAuthToken();
};

/**
 * Save authentication data to localStorage
 * @param {string} token - JWT token
 * @param {Object} user - User object
 * @param {number} expiryDays - Number of days until token expires (default: 7)
 */
export const saveAuthData = (token, user, expiryDays = 7) => {
  if (typeof window === "undefined") return;

  const expiry = new Date();
  expiry.setDate(expiry.getDate() + expiryDays);

  const authData = {
    token,
    user,
    expiry: expiry.getTime(),
  };

  localStorage.setItem("authData", JSON.stringify(authData));
};

/**
 * Clear authentication data from localStorage
 */
export const clearAuthData = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("authData");
};

/**
 * Logout user
 */
export const logout = () => {
  clearAuthData();
  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
};

/**
 * Update user data in localStorage
 * @param {Object} updatedUser - Updated user object
 */
export const updateUserData = (updatedUser) => {
  const authData = getAuthData();
  if (!authData) return;

  authData.user = { ...authData.user, ...updatedUser };
  localStorage.setItem("authData", JSON.stringify(authData));
};

/**
 * Check if user's email is verified
 * @returns {boolean} True if verified, false otherwise
 */
export const isEmailVerified = () => {
  const user = getCurrentUser();
  return user?.isVerified || false;
};