import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../components/api";

// Create the AuthContext with initial values
const AuthContext = createContext({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

// Wrap the app and provide session management
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to log the user in
  const login = async (username, password) => {
    try {
      const response = await fetch("http://localhost:5252/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Username: username,
          Password: password,
        }),
        credentials: "include", // Include session cookies
      });

      if (response.ok) {
        setIsAuthenticated(true); // User is authenticated
        return true;
      } else {
        setIsAuthenticated(false); // User is not authenticated
        return false;
      }
    } catch (error) {
      console.error("Login failed:", error);
      setIsAuthenticated(false); // Handle login error
    }
  };

  // Function to check session status on initial load
  const checkSession = async () => {
    try {
      // Only validate the session if the user is already marked as authenticated
      if (isAuthenticated) {
        const response = await fetch("http://localhost:5252/auth/validate", {
          method: "GET",
          credentials: "include", // Include session cookies
        });

        if (response.ok) {
          setIsAuthenticated(true); // User remains authenticated
        } else {
          setIsAuthenticated(false); // Session is invalid, mark as not authenticated
        }
      }
    } catch (error) {
      console.error("Session validation failed:", error);
      setIsAuthenticated(false); // Handle session error gracefully
    }
  };

  useEffect(() => {
    checkSession(); // Check session on initial load
  }, []);

  // Function to log the user out
  const logout = async () => {
    try {
      await fetch("http://localhost:5252/auth/logout", {
        method: "POST",
        credentials: "include", // Include session cookies for logout
      });
      setIsAuthenticated(false); // Update authentication state
    } catch (error) {
      console.error("Logout failed:", error);
      setIsAuthenticated(false); // Handle any logout error
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access authentication context in any component
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
