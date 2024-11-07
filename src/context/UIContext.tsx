import React, { createContext, useState, useMemo } from "react";

interface UIContextType {
  isDarkMode: boolean;
  isSidebarOpen: boolean;
  toggleTheme: () => void;
  toggleSidebar: () => void;
  closeSidebar: () => void;
}

export const UIContext = createContext<UIContextType>({
  isDarkMode: false,
  isSidebarOpen: false,
  toggleTheme: () => {},
  toggleSidebar: () => {},
  closeSidebar: () => {},
});

export const UIProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check local storage or system preference
    const saved = localStorage.getItem("darkMode");
    return saved
      ? JSON.parse(saved)
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prev: boolean) => {
      const newValue = !prev;
      localStorage.setItem("darkMode", JSON.stringify(newValue));
      return newValue;
    });
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev: boolean) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const value = useMemo(
    () => ({ isDarkMode, isSidebarOpen, toggleTheme, toggleSidebar, closeSidebar }),
    [isDarkMode, isSidebarOpen]
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};
