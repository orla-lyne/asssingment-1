import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, loginUser, logoutUser, registerUser } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("task_manager_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateSession = async () => {
      const token = localStorage.getItem("task_manager_token");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const data = await getCurrentUser();
        setUser(data.user);
        localStorage.setItem("task_manager_user", JSON.stringify(data.user));
      } catch {
        setUser(null);
        localStorage.removeItem("task_manager_token");
        localStorage.removeItem("task_manager_user");
      } finally {
        setLoading(false);
      }
    };
    validateSession();
  }, []);

  const saveSession = (data) => {
    localStorage.setItem("task_manager_token", data.token);
    localStorage.setItem("task_manager_user", JSON.stringify(data.user));
    setUser(data.user);
  };

  const login = async (credentials) => saveSession(await loginUser(credentials));
  const register = async (credentials) => saveSession(await registerUser(credentials));
  const logout = async () => {
    try {
      await logoutUser();
    } finally {
      localStorage.removeItem("task_manager_token");
      localStorage.removeItem("task_manager_user");
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
