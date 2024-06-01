// frontend/src/components/Login.js
import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error } = useContext(AuthContext);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    if (!error) {
      setSuccess(true);
      setTimeout(() => {
        navigate("/");
      }, 2000); // Redirect after 2 seconds
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl mb-4">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full p-2 border rounded mb-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full p-2 border rounded mb-4"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Login
        </button>
        <div className="mt-4">
          <span>Don't have an account? </span>
          <Link to="/register" className="text-blue-500">
            Register here
          </Link>
        </div>
        {error && <div className="text-red-500 mt-4">{error}</div>}
        {success && (
          <div className="text-green-500 mt-4">
            Login successful! Redirecting to homepage...
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
