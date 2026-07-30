import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('technula_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [showOTP, setShowOTP] = useState(false);

  const login = (mobile) => {
    const userData = { mobile, loggedIn: true };
    localStorage.setItem('technula_user', JSON.stringify(userData));
    setUser(userData);
    setShowOTP(false);
  };

  const logout = () => {
    localStorage.removeItem('technula_user');
    setUser(null);
  };

  const isLoggedIn = !!user?.loggedIn;

  return (
    <AuthContext.Provider value={{
      user, isLoggedIn, login, logout,
      showOTP, setShowOTP
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
