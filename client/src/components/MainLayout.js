import React from "react";
import { Link } from "react-router-dom";

export default function MainLayout({ children }) {
  return (
    <div className="landing-wrapper">

      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 py-3 shadow-sm">
        <Link className="navbar-brand fw-bold fs-3" to="/">
          ExpenseTracker
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item mx-3">
              <Link className="nav-link fw-bold" to="/">Home</Link>
            </li>
            <li className="nav-item mx-3">
              <Link className="nav-link fw-bold" to="/login">Login</Link>
            </li>
            <li className="nav-item mx-3">
              <Link className="nav-link fw-bold" to="/register">Register</Link>
            </li>
            <li className="nav-item mx-3">
              <a href="#about-section" className="nav-link fw-bold">About</a>
            </li>
          </ul>
        </div>
      </nav>

      {children}

      {/* FOOTER */}
      <footer className="footer text-center py-4">
        <p className="mb-0 fw-bold">
          © {new Date().getFullYear()} ExpenseTracker · All Rights Reserved
        </p>
      </footer>
    </div>
  );
}