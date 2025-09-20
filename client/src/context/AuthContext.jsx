import { createContext, useState, useEffect } from "react";
import api from "../axiosInstance";

// Create auth context
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on app load
  const checkAuth = async () => {
    try {
      setLoading(true);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout
      const res = await api.get("/users/me", { signal: controller.signal }); // Get current user info
      clearTimeout(timeoutId);
      setUser(res.data.user);
      setIsLoggedIn(true);
    } catch {
      console.error(
        "Auth check failed:",
        error.message,
        error.response?.status
      );
      setUser(null);
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (credentials) => {
    const res = await api.post("/auth/login", credentials);
    setUser(res.data.user);
    setIsLoggedIn(true);
    return res.data;
  };

  // Logout user
  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
    setIsLoggedIn(false);
  };

  // Refresh token periodically to keep user logged in
  const refreshToken = async () => {
    try {
      const res = await api.post("/auth/refresh");
      setIsLoggedIn(true);
      setUser(res.data.user);
    } catch {
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuth(); // Initial auth check

    // Refresh token 5 minutes before expiry
    const interval = setInterval(refreshToken, 55 * 60 * 1000);
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const value = {
    isLoggedIn,
    user,
    loading,
    login,
    logout,
    checkAuth,
    refreshToken,
  };

  // Show spinner while checking auth
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen p-4">
        <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
