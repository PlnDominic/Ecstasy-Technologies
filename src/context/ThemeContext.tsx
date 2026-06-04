'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'dark' | 'light';

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');

  // Initialize theme from localStorage on mount (client-side only)
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('theme') as Theme | null;
      const newTheme = savedTheme || 'dark';
      setTheme(newTheme);
      
      // Remove both classes first, then add the correct one
      document.documentElement.classList.remove('dark-theme', 'light-theme');
      document.documentElement.classList.add(`${newTheme}-theme`);
      
      // Also add a data-theme attribute for potential CSS attribute selectors
      document.documentElement.setAttribute('data-theme', newTheme);
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      // Fallback to dark theme if there's an error
      document.documentElement.classList.add('dark-theme');
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    try {
      const newTheme = theme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
      
      // Remove both classes first, then add the correct one
      document.documentElement.classList.remove('dark-theme', 'light-theme');
      document.documentElement.classList.add(`${newTheme}-theme`);
      
      // Update data-theme attribute
      document.documentElement.setAttribute('data-theme', newTheme);
    } catch (error) {
      console.error('Error toggling theme:', error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 