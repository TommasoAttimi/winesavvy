// frontend/src/components/Homepage.js
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Homepage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md">
        <h1 className="text-2xl mb-4">Welcome to Wine App, {user.name}</h1>
        <p>Your wine cellar awaits!</p>
      </div>
    </div>
  );
};

export default Homepage;
