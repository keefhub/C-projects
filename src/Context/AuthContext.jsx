import React, { createContext, useState, useEffect, useContext } from "react";

// Create the AuthContext with initial values
const AuthContext = createContext({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

// wrap the app and provide session management
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (username, password) => {
    try {
      const response = await fetch("http://localhost:5252/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setIsAuthenticated(true); // User is authenticated
      } else {
        setIsAuthenticated(false); // User is not authenticated
      }
    } catch (error) {
      console.error("Login failed:", error);
      setIsAuthenticated(false); // Handle login error
    }
  };

  // check if the user is authenticated by looking at session
  const checkSession = async () => {
    if (!isAuthenticated) return;
    try {
      const response = await fetch("http://localhost:5252/auth/validate", {
        method: "GET",
        credentials: "include", // Include session cookies
      });

      if (response.ok) {
        setIsAuthenticated(true); // User is authenticated
      } else {
        setIsAuthenticated(false); // User is not authenticated
      }
    } catch (error) {
      setIsAuthenticated(false); // Handle session error
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      checkSession();
    }
  }, [isAuthenticated]);

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
