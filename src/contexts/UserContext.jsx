import React, { createContext, useState, useEffect, useContext } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [isLoginModalExplicitlyOpened, setIsLoginModalExplicitlyOpened] = useState(false);


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
      const updatedUserData = { ...user, ...userData }; 
      localStorage.setItem('medifind_user', JSON.stringify(updatedUserData));
      setUser(updatedUserData);
    } catch (error) {
      console.error("Failed to save user to localStorage", error);
    }
  };

  const updateUserProfile = (profileData) => {
    if (user) {
      const updatedUser = { ...user, ...profileData };
      try {
        localStorage.setItem('medifind_user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        return true; // Indicate success
      } catch (error) {
        console.error("Failed to update profile in localStorage", error);
        return false; // Indicate failure
      }
    }
    return false; // Indicate failure if no user
  };

  const updateUserHealthDetails = (healthDetails) => {
    if (user) {
      const updatedUser = { ...user, healthDetails, healthDetailsProvided: true };
      try {
        localStorage.setItem('medifind_user', JSON.stringify(updatedUser));
        setUser(updatedUser);
      } catch (error) {
        console.error("Failed to update health details in localStorage", error);
      }
    }
  };

  const skipHealthDetails = () => {
    if (user) {
      const updatedUser = { ...user, healthDetailsProvided: true }; 
      try {
        localStorage.setItem('medifind_user', JSON.stringify(updatedUser));
        setUser(updatedUser);
      } catch (error) {
        console.error("Failed to update health details preference in localStorage", error);
      }
    }
  };

  const logoutUser = () => {
    try {
      localStorage.removeItem('medifind_user');
      setUser(null);
      setIsLoginModalExplicitlyOpened(false); // Reset this on logout
    } catch (error) {
      console.error("Failed to remove user from localStorage", error);
    }
  };

  const triggerLoginModal = () => {
    setOpenLoginModal(true);
    setIsLoginModalExplicitlyOpened(true);
  };
  
  const closeLoginModal = () => {
    setOpenLoginModal(false);
  }


  return (
    <UserContext.Provider value={{ 
      user, 
      loginUser, 
      logoutUser, 
      isLoading, 
      updateUserProfile,
      updateUserHealthDetails, 
      skipHealthDetails,
      openLoginModal,
      triggerLoginModal,
      closeLoginModal,
      isLoginModalExplicitlyOpened,
      setIsLoginModalExplicitlyOpened
    }}>
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