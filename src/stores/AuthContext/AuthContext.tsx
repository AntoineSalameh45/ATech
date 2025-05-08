import React, {createContext, useContext, useState} from 'react';

interface User {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (user: User) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const login = (email: string, password: string): boolean => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => setIsAuthenticated(false);

  const register = (user: User): boolean => {
    const existingUser = users.find(u => u.email === user.email);

    if (existingUser) {
      return false;
    }

    setUsers(prevUsers => [...prevUsers, user]);
    return true;
  };

  return (
    <AuthContext.Provider value={{isAuthenticated, setAuthenticated: setIsAuthenticated, login, logout, register}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
