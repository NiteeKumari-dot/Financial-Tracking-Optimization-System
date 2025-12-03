import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "antd";
import Login from "./Login";
import Register from "./Register";
import "./FirstPage.css";
import MainLayout from "../components/MainLayout";

const FirstPage = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <div className="landing-wrapper">
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 py-3 shadow-sm">
        <Link className="navbar-brand fw-bold fs-3" to="/">
          Financial Tracking and Optimization System
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
              <button
                className="btn btn-link text-white fw-bold"
                onClick={() => setIsLoginOpen(true)}
              >
                Login
              </button>
            </li>

            <li className="nav-item mx-3">
              <button
                className="btn btn-link text-white fw-bold"
                onClick={() => setIsRegisterOpen(true)}
              >
                Register
              </button>
            </li>

            <li className="nav-item mx-3">
              <a href="#about-section" className="nav-link fw-bold text-white">
                About
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="hero d-flex align-items-center justify-content-center text-center">
        <div>
          <h1
            className="display-3 fw-bold mb-4 fade-in"
            style={{ color: "#253d2c" }}
          >
            Track Your Expenses Smartly
          </h1>
          <p
            className="lead mb-4 fade-in delay-1"
            style={{ color: "#444545ff" }}
          >
            A modern MERN-based platform to monitor spending, gain financial
            clarity, and make smarter money decisions — all in one place.
          </p>

          <button
            className="btn btn-light btn-lg px-5 fw-bold fade-in delay-2"
            onClick={() => setIsRegisterOpen(true)}
          >
            Get Started →
          </button>
        </div>
      </header>

      {/* FEATURES SECTION */}
      <section className="features container py-5">
        <h2 className="fw-bold text-center mb-5">Why Choose ExpenseTracker?</h2>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="feature-card1 shadow-lg p-4 rounded-4">
              <h4 className="fw-bold mb-2">🔐 Secure Authentication</h4>
              <p>
                OTP verification + encrypted login system keeps your account
                safe.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="feature-card2 shadow-lg p-4 rounded-4">
              <h4 className="fw-bold mb-2">📊 Insights & Analytics</h4>
              <p>
                Visual spending insights help you understand your financial
                habits.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="feature-card3 shadow-lg p-4 rounded-4">
              <h4 className="fw-bold mb-2">💰 Budget Smarter</h4>
              <p>
                Set monthly budgets, track categories, and stay financially
                disciplined.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about-section" className="about-section py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-4">About ExpenseTracker</h2>
          <p className="fs-5">
            ExpenseTracker is a modern financial management application built
            using the MERN stack. It helps users track daily expenses, visualize
            spending patterns, and gain complete control over their financial
            life.
          </p>
          <p className="fs-6 mt-3">
            Our mission is to simplify money management with a clean interface,
            smart analytics, and secure authentication.
          </p>
        </div>
      </section>

      {/* LOGIN MODAL */}
      <Modal
        open={isLoginOpen}
        onCancel={() => setIsLoginOpen(false)}
        footer={null}
      >
        <Login closeModal={() => setIsLoginOpen(false)} />
      </Modal>

      {/* REGISTER MODAL */}
      <Modal
        open={isRegisterOpen}
        onCancel={() => setIsRegisterOpen(false)}
        footer={null}
      >
        <Register closeModal={() => setIsRegisterOpen(false)} />
      </Modal>
    </div>
  );
};

export default FirstPage;