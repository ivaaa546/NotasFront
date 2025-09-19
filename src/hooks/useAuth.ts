import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services';

export interface User {
  id: string;
  nombre: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface LoginData {
  email: string;
  passwordd: string;
}

export interface RegisterData {
  nombre: string;
  email: string;
  passwordd: string;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false
  });
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const isAuth = authService.isAuthenticated();
      if (isAuth) {
        const user = authService.getCurrentUser();
        setAuthState({
          user,
          isLoading: false,
          isAuthenticated: true
        });
      } else {
        setAuthState({
          user: null,
          isLoading: false,
          isAuthenticated: false
        });
      }
    } catch (error) {
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false
      });
    }
  };

  const login = async (data: LoginData) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      await authService.login(data);
      const user = authService.getCurrentUser();
      setAuthState({
        user,
        isLoading: false,
        isAuthenticated: true
      });
      navigate('/dashboard');
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      await authService.register(data);
      const user = authService.getCurrentUser();
      setAuthState({
        user,
        isLoading: false,
        isAuthenticated: true
      });
      navigate('/dashboard');
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setAuthState({
      user: null,
      isLoading: false,
      isAuthenticated: false
    });
    navigate('/login');
  };

  const updateProfile = async (data: { nombre: string }) => {
    try {
      await authService.updateProfile(data);
      const user = authService.getCurrentUser();
      setAuthState(prev => ({ ...prev, user }));
    } catch (error) {
      throw error;
    }
  };

  const deleteAccount = async () => {
    try {
      await authService.deleteAccount();
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false
      });
      navigate('/login');
    } catch (error) {
      throw error;
    }
  };

  return {
    ...authState,
    login,
    register,
    logout,
    updateProfile,
    deleteAccount,
    checkAuthStatus
  };
}
