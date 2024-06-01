// frontend/src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "../api/axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch(() => {
          localStorage.removeItem("token");
        });
    }
  }, []);

  const register = async (name, email, password) => {
    try {
      const res = await axios.post("/auth/register", { name, email, password });
      localStorage.setItem("token", res.data.token);
      setUser(res.data);
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
    }
  };

  const login = async (email, password) => {
    try {
      setError(null); // Clear previous errors
      const res = await axios.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setUser(res.data);
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
    }
  };

  const updateUser = async (name, password) => {
    try {
      setError(null); // Clear previous errors
      const token = localStorage.getItem("token");
      const res = await axios.put(
        "/auth/update",
        { name, password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(res.data);
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  const deleteUser = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete("/auth/delete", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(null);
      localStorage.removeItem("token");
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, register, login, updateUser, logout, deleteUser, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
