import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const { user } = useAuth();
  
  // Default to light, but try to read from storage if user is logged in
  const [theme, setTheme] = useState('light');

  // Effect to load theme when user changes
  useEffect(() => {
    if (user) {
      const savedTheme = localStorage.getItem(`theme_${user.role}`) || 'light';
      setTheme(savedTheme);
    } else {
      setTheme('light'); // Default for non-logged in users
    }
  }, [user]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    
    // Only save if user is logged in
    if (user) {
      localStorage.setItem(`theme_${user.role}`, theme);
    }
  }, [theme, user]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
