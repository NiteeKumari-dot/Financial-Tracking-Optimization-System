import { UserOutlined, XOutlined } from "@ant-design/icons";
import { message } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("user");
    message.success("Logout Successfully");
    navigate("/login");
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  return (
    <nav
  className="navbar navbar-expand-lg"
  style={{
    background: "linear-gradient(90deg, #bbc2d4ff, #1e293b)",
    padding: "12px 0",
    boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
  }}
>
  <div className="container-fluid">
    <Link
      className="navbar-brand fw-bold text-white d-flex align-items-center"
      to="/"
      style={{ fontSize: "20px", letterSpacing: ".5px" }}
    >
      <XOutlined style={{ marginRight: 8, fontSize: "22px" }} />
      Expense Management
    </Link>

    <button
      className="navbar-toggler text-white"
      data-bs-toggle="collapse"
      data-bs-target="#navbarMenu"
    >
      <span className="navbar-toggler-icon" />
    </button>

    <div className="collapse navbar-collapse" id="navbarMenu">
      <ul className="navbar-nav ms-auto align-items-center gap-3">

        <li className="nav-item">
          <Link
            to="/profile"
            className="nav-link text-white fw-semibold"
            style={{ fontSize: "16px" }}
          >
            <UserOutlined style={{ marginRight: 6 }} />
            {user?.name}
          </Link>
        </li>

        <li className="nav-item">
          <img
            src={user?.photo}
            alt="profile"
            className="rounded-circle border border-2"
            style={{
              width: 42,
              height: 42,
              objectFit: "cover",
              boxShadow: "0 0 8px rgba(255,255,255,0.3)",
            }}
          />
        </li>

        <li className="nav-item">
          <button
            className="btn fw-semibold"
            onClick={logoutHandler}
            style={{
              background: "#ef4444",
              borderRadius: "6px",
              padding: "6px 16px",
              color: "white",
              letterSpacing: ".4px",
              transition: "0.3s",
            }}
            onMouseOver={(e) =>
              (e.target.style.background = "#dc2626")
            }
            onMouseOut={(e) =>
              (e.target.style.background = "#ef4444")
            }
          >
            Logout
          </button>
        </li>

      </ul>
    </div>
  </div>
</nav>

  );
};

export default Header;