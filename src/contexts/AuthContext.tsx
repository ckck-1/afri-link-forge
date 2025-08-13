import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'freelancer' | 'client';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
  skills?: string[];
  location?: string;
  rating?: number;
  completedJobs?: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  signup: (userData: Partial<User> & { password: string }) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Mock users for demo
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Amara Okafor',
    email: 'amara@example.com',
    role: 'freelancer',
    bio: 'Full-stack developer with 5+ years experience in React and Node.js',
    skills: ['React', 'Node.js', 'TypeScript', 'MongoDB'],
    location: 'Lagos, Nigeria',
    rating: 4.9,
    completedJobs: 87
  },
  {
    id: '2',
    name: 'Kofi Asante',
    email: 'kofi@example.com', 
    role: 'client',
    bio: 'Tech entrepreneur building innovative solutions',
    location: 'Accra, Ghana',
    rating: 4.7,
    completedJobs: 12
  }
];

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string, role: UserRole) => {
    // Mock login logic
    const foundUser = mockUsers.find(u => u.email === email && u.role === role);
    if (foundUser) {
      setUser(foundUser);
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const signup = async (userData: Partial<User> & { password: string }) => {
    // Mock signup logic
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name || '',
      email: userData.email || '',
      role: userData.role || 'freelancer',
      bio: userData.bio,
      skills: userData.skills,
      location: userData.location,
      rating: 0,
      completedJobs: 0
    };
    
    mockUsers.push(newUser);
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      
      // Update in mock data
      const userIndex = mockUsers.findIndex(u => u.id === user.id);
      if (userIndex !== -1) {
        mockUsers[userIndex] = updatedUser;
      }
    }
  };

  const value = {
    user,
    login,
    signup,
    logout,
    updateProfile,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}