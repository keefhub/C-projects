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

  // check if the user is authenticated by looking at session
  const checkSession = async () => {
    try {
      const response = await fetch("/api/validate-session", {
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
    checkSession();
  }, []);

  const login = () => {
    setIsAuthenticated(true); 
  };

  const logout = async () => {
    try {
      await fetch("/api/logout", {
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
