import React, { createContext, useContext, useState } from 'react';

const AuthBypassContext = createContext(null);


const mockUser = {
  fullName: "TechWorks Admin",
  primaryEmailAddress: "admin@techworks.com",
  id: "mock_user_123"
};

export const AuthBypassProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(true);
  
  const contextValue = {
    isLoaded: true, // Always true for the mock
    user: isSignedIn ? mockUser : null,
    
    // Mock Clerk functions
    signOut: () => {
      console.log("Mock: Signing out user.");
      setIsSignedIn(false);
      window.location.href = "/";
    },
  };

  return (
    <AuthBypassContext.Provider value={contextValue}>
      {children}
    </AuthBypassContext.Provider>
  );
};

// 4. Create the custom hook (to replace useUser/useClerk)
export const useAuthBypass = () => {
  return useContext(AuthBypassContext);
};