
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '@/types';
import { mockUsers } from '@/data/mockData';
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
  loading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for stored user in localStorage (simulating persistence)
    const storedUser = localStorage.getItem('hostelUser');
    
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('hostelUser');
      }
    }
    
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    
    try {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const foundUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (!foundUser) {
        throw new Error('Invalid email or password');
      }
      
      // In a real app, we would verify the password here
      // For this demo, we'll just accept any password
      
      setUser(foundUser);
      localStorage.setItem('hostelUser', JSON.stringify(foundUser));
      
      toast({
        title: "Logged in successfully",
        description: `Welcome back, ${foundUser.name}!`,
      });
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    setLoading(true);
    
    try {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Check if email already exists
      if (mockUsers.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        throw new Error('Email already in use');
      }
      
      // Create new user
      // In a real app, we would send this to a backend API
      const newUser: User = {
        id: `user${mockUsers.length + 1}`,
        name,
        email,
        role,
      };
      
      setUser(newUser);
      localStorage.setItem('hostelUser', JSON.stringify(newUser));
      
      toast({
        title: "Registration successful",
        description: `Welcome, ${name}!`,
      });
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hostelUser');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  const resetPassword = async (email: string) => {
    setLoading(true);
    
    try {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const foundUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (!foundUser) {
        throw new Error('Email not found');
      }
      
      // In a real app, we would send a password reset link to the user's email
      toast({
        title: "Password reset link sent",
        description: "Check your email for instructions to reset your password",
      });
    } catch (error) {
      toast({
        title: "Password reset failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    resetPassword,
    loading,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
