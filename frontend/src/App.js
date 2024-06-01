// frontend/src/App.js
import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import Register from "./components/Register";
import Login from "./components/Login";
import Homepage from "./components/Homepage";
import UserProfile from "./components/UserProfile";

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div>Loading...</div>;
  return user ? <Component {...rest} /> : <Navigate to="/login" />;
};

const App = () => {
  const { user, loading } = React.useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1 className="text-3xl font-bold underline">Welcome to Wine App</h1>
        </header>
        <main className="p-4">
          <Routes>
            <Route
              path="/"
              element={user ? <Homepage /> : <Navigate to="/login" />}
            />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/profile"
              element={<PrivateRoute element={UserProfile} />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

const RootApp = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default RootApp;
