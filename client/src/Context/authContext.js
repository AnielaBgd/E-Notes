import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [errorMessage ,setErrorMessage] = useState('')

  const login = async (formData) => {
    const res = await axios.post("/auth/login", formData)
    setCurrentUser(res.data)
    return res.data
  };

  const logout = async (formData) => {
    await axios.post("/auth/logout");
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ errorMessage, currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};