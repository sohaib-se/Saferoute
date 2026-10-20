import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserSession, getUserSession, saveUserSession, clearUserSession } from '../lib/session';
import { authenticateUser, LoginParams, AuthResult } from '../services/authService';

interface AuthContextType {
  user: UserSession | null;
  role: 'driver' | 'parent' | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (params: LoginParams) => Promise<AuthResult>;
  logout: () => Promise<void>;
  setUserDirectly: (session: UserSession | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserSession | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        // Always start fresh from the login screen when app is opened or scanned via QR code
        await clearUserSession();
        setUser(null);
      } catch (e) {
        console.error('Session initialization failed:', e);
      } finally {
        setIsLoading(false);
      }
    };
    initAuth();
  }, []);

  const login = async (params: LoginParams): Promise<AuthResult> => {
    setIsLoading(true);
    try {
      const res = await authenticateUser(params);
      if (res.success && res.user) {
        setUser(res.user);
        await saveUserSession(res.user);
      }
      return res;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await clearUserSession();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const setUserDirectly = (session: UserSession | null) => {
    setUser(session);
    if (session) {
      saveUserSession(session);
    } else {
      clearUserSession();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user ? user.role : null,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        setUserDirectly,
      }}
    >
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
