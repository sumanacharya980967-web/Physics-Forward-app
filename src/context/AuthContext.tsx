import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { INITIAL_USERS } from '../data/mockData';
import { api } from '../services/api';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  role: UserRole;
  login: (emailOrPhone: string, requestedRole?: UserRole) => Promise<boolean>;
  register: (data: any) => Promise<boolean>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  isEnrolled: (courseId: string) => boolean;
  enrollInCourse: (courseId: string) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  role: 'student',
  login: async () => false,
  register: async () => false,
  logout: () => {},
  switchRole: () => {},
  isEnrolled: () => false,
  enrollInCourse: () => {}
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to Rahul Das (student) for quick exploration
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('pfw_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    return INITIAL_USERS[2]; // Rahul Das (Student)
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('pfw_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('pfw_user');
    }
  }, [user]);

  const login = async (emailOrPhone: string, requestedRole?: UserRole): Promise<boolean> => {
    try {
      const res = await api.login(emailOrPhone, requestedRole);
      if (res.success && res.user) {
        setUser(res.user);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Login error', err);
      return false;
    }
  };

  const register = async (data: any): Promise<boolean> => {
    try {
      const res = await api.register(data);
      if (res.success && res.user) {
        setUser(res.user);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Register error', err);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
  };

  const switchRole = (newRole: UserRole) => {
    const matched = INITIAL_USERS.find(u => u.role === newRole);
    if (matched) {
      setUser(matched);
    } else if (newRole === 'student') {
      setUser(INITIAL_USERS[2]);
    } else if (newRole === 'teacher') {
      setUser(INITIAL_USERS[1]);
    } else {
      setUser(INITIAL_USERS[0]);
    }
  };

  const isEnrolled = (courseId: string): boolean => {
    if (!user) return false;
    if (user.role === 'super_admin' || user.role === 'admin' || user.role === 'teacher') return true;
    return user.enrolledCourseIds?.includes(courseId) ?? false;
  };

  const enrollInCourse = (courseId: string) => {
    if (!user) return;
    if (!user.enrolledCourseIds.includes(courseId)) {
      const updated = {
        ...user,
        enrolledCourseIds: [...user.enrolledCourseIds, courseId]
      };
      setUser(updated);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        role: user?.role || 'student',
        login,
        register,
        logout,
        switchRole,
        isEnrolled,
        enrollInCourse
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
