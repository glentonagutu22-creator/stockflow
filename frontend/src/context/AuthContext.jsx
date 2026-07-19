import { createContext, useContext, useState } from "react";
import api from "../services/api"

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
const [user, setUser] = useState(() => {
  const savedUser = localStorage.getItem("user");
  return savedUser ? JSON.parse(savedUser) : null;
});
const logout = () => {
  setUser(null);
  setToken(null);

  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

const [token, setToken] = useState(() => {
  return localStorage.getItem("token");
});
  const login = async (email, password) => {
  try {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    const { token, user } = response.data.data;

    setUser(user);
    setToken(token);

localStorage.setItem("token", token);
localStorage.setItem("user", JSON.stringify(user));

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Login failed.",
    };
  }
};
const register = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);

    const { token, user } = response.data.data;

    setUser(user);
    setToken(token);

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message || "Registration failed.",
    };
  }
};
const value = {
  user,
  token,
  login,
  register,
  logout
};

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};