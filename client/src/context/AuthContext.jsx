import { createContext, useState, useEffect, useContext } from "react";
import api from "../axiosInstance";

// Create AuthContext
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isAuthenticated = !!user;

  // Add refresh token functionality
  const refreshToken = async () => {
    try {
      const response = await api.post("/auth/refresh");
      return response.data;
    } catch (error) {
      console.error("Token refresh failed:", error);
      setUser(null);
      return null;
    }
  };

  // Enhanced check auth status
  useEffect(() => {
    let mounted = true;

    const checkAuthStatus = async () => {
      try {
        // Try to refresh token first
        await refreshToken();

        if (mounted) {
          const response = await api.get("/users/me");
          setUser(response.data);
          setError(null);

          // Set up refresh interval only if authenticated
          const refreshInterval = setInterval(refreshToken, 55 * 60 * 1000); // 55 minutes
          return () => clearInterval(refreshInterval);
        }
      } catch (error) {
        if (mounted) {
          setUser(null);
          setError("Failed to check auth status");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    checkAuthStatus();

    // Cleanup function
    return () => {
      mounted = false;
    };
  }, []);

  // Enhanced login function
  const login = async (credentials) => {
    setError(null);
    try {
      const response = await api.post("/auth/login", credentials);
      setUser(response.data.user);
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Enhanced logout function
  const logout = async () => {
    try {
      await api.post("/auth/logout");
      setUser(null);
      setError(null);
      // Clear any existing intervals
      if (window.refreshInterval) {
        clearInterval(window.refreshInterval);
        window.refreshInterval = null;
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Remove console.log from useAuth
  const value = {
    user,
    isAuthenticated,
    loading,
    error,
    signup: async (userData) => {
      setError(null);
      try {
        const response = await api.post("/auth/signup", userData);
        setUser(response.data.user);
        return { success: true };
      } catch (error) {
        const errorMessage = error.response?.data?.message || "Signup failed";
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }
    },
    login,
    logout,
    setUser,
    setError,
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen p-4">
        <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
