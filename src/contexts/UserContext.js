
import React, { createContext, useState, useEffect, useContext } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('medifind_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to load user from localStorage", error);
      localStorage.removeItem('medifind_user');
    }
    setIsLoading(false);
  }, []);

  const loginUser = (userData) => {
    try {
      localStorage.setItem('medifind_user', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error("Failed to save user to localStorage", error);
    }
  };

  const logoutUser = () => {
    try {
      localStorage.removeItem('medifind_user');
      setUser(null);
    } catch (error) {
      console.error("Failed to remove user from localStorage", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
