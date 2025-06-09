'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
  isLight: boolean;
  isLoaded: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

interface ThemeProviderProps {
    children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('app-theme');
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      setTheme(savedTheme as Theme);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      if (theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        document.documentElement.setAttribute('data-timeline-theme', 'light');
      } else {
        document.documentElement.removeAttribute('data-theme');
        document.documentElement.removeAttribute('data-timeline-theme');
      }
      localStorage.setItem('app-theme', theme);
    }
  }, [theme, isLoaded]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const value: ThemeContextType = {
    theme,
    toggleTheme,
    isDark: theme === 'dark',
    isLight: theme === 'light',
    isLoaded
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
} 