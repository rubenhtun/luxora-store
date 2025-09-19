import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../config";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkAuth = async () => {
    try {
      const res = await axios.get(`${baseURL}/users/me`, {
        withCredentials: true,
      });
      setIsLoggedIn(!!res.data.user);
    } catch {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}
