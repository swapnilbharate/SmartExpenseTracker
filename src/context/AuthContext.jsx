import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  const login = (email) => {
    const users = JSON.parse(localStorage.getItem("registered_users")) || [];
    const foundUser = users.find(
      (u) => u.email.trim().toLowerCase() === email.trim().toLowerCase()
    );

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("user", JSON.stringify(foundUser));
      return { success: true };
    } else {
      return { success: false, message: "Email not found. Please register first." };
    }
  };

  const register = (name, email) => {
    if (!name || !email) {
      return { success: false, message: "Please fill in all fields." };
    }

    const users = JSON.parse(localStorage.getItem("registered_users")) || [];
    const exists = users.some(
      (u) => u.email.trim().toLowerCase() === email.trim().toLowerCase()
    );

    if (exists) {
      return { success: false, message: "Email is already registered. Please login." };
    }

    const newUser = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
    };

    users.push(newUser);
    localStorage.setItem("registered_users", JSON.stringify(users));

    // Auto-login
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
