import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

useEffect(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser && storedUser !== "undefined") {
    try {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    } catch (error) {
      console.error("Invalid JSON in localStorage for 'user'", error);
      localStorage.removeItem("user"); // Remove corrupted data
    }
  } else {
    localStorage.removeItem("user");
  }
}, []);

  // Login function
  const login = (userData) => {
    if (userData.token) {
      localStorage.setItem("token", userData.token);
    }
    setUser(userData.user || userData);
    localStorage.setItem("user", JSON.stringify(userData.user || userData));
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
