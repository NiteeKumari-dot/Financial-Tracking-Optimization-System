import React, { useState } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import Oauth from "../components/oauth";

const Login = () => {
  const [loding, setLoding] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (values) => {
    try {
      setLoding(true);
      const { data } = await axios.post("/api/v1/users/login", values);
      setLoding(false);

      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: "" })
      );
      message.success("Login is Successful");
      navigate("/");
    } catch (error) {
      setLoding(false);
      message.error("Login failed");
    }
  };

  return (
    <>
      {loding && <Spinner />}

      <div className="d-flex align-items-center justify-content-center vh-100">
        <div
          className="shadow p-4 p-md-5 bg-white rounded-4 w-100"
          style={{ maxWidth: "450px" }}
        >
          <Form layout="vertical" onFinish={submitHandler}>
            <h1 className="fw-bold text-center text-white bg-dark py-2 rounded-3">
              Sign In
            </h1>
            <hr />

            <Form.Item
              label="Email"
              name="email"
              className="fw-bold"
              rules={[{ required: true, message: "Please enter your email" }]}
            >
              <Input
                type="email"
                placeholder="Email Address"
                className="fw-bold p-3"
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              className="fw-bold"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
            >
              <Input
                type="password"
                placeholder="Password"
                className="fw-bold p-3"
              />
            </Form.Item>

            <button className="btn btn-dark w-100 fw-bold p-3 mt-2">
              SIGN IN
            </button>

            <div className="mt-3">
              <Oauth />
            </div>

            <div className="d-flex justify-content-center fw-bold mt-3 gap-1">
              Don't have an account?
              <Link
                to="/register"
                className="fw-bold text-decoration-none text-primary"
              >
                Sign Up
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;