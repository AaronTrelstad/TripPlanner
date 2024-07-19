import React, { useContext, createContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  user: User | null;
}

interface User {
    id: string;
    username: string;
    email: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    let token = localStorage.getItem('token')
    let user = localStorage.getItem('user')

    if (token) {
        setLoggedIn(true)
    } 

    if (user) {
        setUser(JSON.parse(user))
    } 
  }, [])

  const login = (token: string, user: User) => {
    localStorage.setItem('token', token)
    localStorage.setItem("user", JSON.stringify(user))
    setUser(user);
    setLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user')
    setLoggedIn(false);
  };

  const authContextValue: AuthContextType = {
    isLoggedIn,
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
