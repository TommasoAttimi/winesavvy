// frontend/src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Register from "./components/Register";
import Login from "./components/Login";
import DeleteAccount from "./components/DeleteAccount";
import Homepage from "./components/Homepage";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <header className="App-header">
            <h1 className="text-3xl font-bold underline">
              Welcome to Wine App
            </h1>
          </header>
          <main className="p-4">
            <Routes>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/delete-account" element={<DeleteAccount />} />
              <Route path="/" element={<Homepage />} />
              <Route path="/profile" element={<UserProfile />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
