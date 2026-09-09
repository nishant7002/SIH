import { useState, useEffect, useCallback } from 'react';
import { authService, UserSession } from '../services/authService';

export function useAuth() {
  const [user, setUser] = useState<UserSession | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setUser(authService.getCurrentUser());
    setIsLoaded(true);

    const unsubscribe = authService.subscribe(() => {
      setUser(authService.getCurrentUser());
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const signIn = useCallback((email: string, role?: 'buyer' | 'artisan') => {
    return authService.signIn(email, role);
  }, []);

  const signUp = useCallback((name: string, email: string, role: 'buyer' | 'artisan') => {
    return authService.signUp(name, email, role);
  }, []);

  const signOut = useCallback(() => {
    authService.signOut();
  }, []);

  return {
    user,
    role: user?.role || null,
    isAuthenticated: !!user,
    isLoaded,
    signIn,
    signUp,
    signOut
  };
}
