import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("theme_dark");
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem("theme_dark", JSON.stringify(dark));
    if (dark) {
      document.body.classList.add("dark");
      document.documentElement.setAttribute("data-bs-theme", "dark");
    } else {
      document.body.classList.remove("dark");
      document.documentElement.setAttribute("data-bs-theme", "light");
    }
  }, [dark]);

  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
      {children}
    </ThemeContext.Provider>
  );
};
