// frontend/src/components/UserProfile.js
import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { user, updateUser, logout, deleteUser, error } =
    useContext(AuthContext);
  const [name, setName] = useState(user.name);
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      setName(user.name);
    }
  }, [user, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateUser(name, password);
    if (!error) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      await deleteUser();
      navigate("/register");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleUpdate} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl mb-4">User Profile</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block w-full p-2 border rounded mb-2"
        />
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full p-2 border rounded mb-4"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded mb-2"
        >
          Update Profile
        </button>
        <button
          type="button"
          onClick={handleLogout}
          className="w-full bg-yellow-500 text-white p-2 rounded mb-2"
        >
          Logout
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="w-full bg-red-500 text-white p-2 rounded"
        >
          Delete Account
        </button>
        {error && <div className="text-red-500 mt-4">{error}</div>}
        {success && (
          <div className="text-green-500 mt-4">
            Profile updated successfully!
          </div>
        )}
      </form>
    </div>
  );
};

export default UserProfile;
