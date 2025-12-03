import "./App.css";
import { Routes, Route } from "react-router-dom";

import FirstPage from "./pages/FirstPage";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import PublicRoute from "./components/routes/PublicRoute";
import ProfilePage from "./pages/ProfilePage";
import About from "./pages/About";

function App() {
  return (
    <>
      <Routes>
        {/* FIRST LANDING PAGE */}
        <Route path="/" element={<FirstPage />} />

        {/* ABOUT PAGE */}
        <Route path="/about" element={<About />} />

        {/* PROTECTED ROUTES */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        {/* PUBLIC ROUTES */}
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;