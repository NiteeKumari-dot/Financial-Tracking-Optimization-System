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
      navigate("/dashboard");
    } catch (error) {
      setLoding(false);
      message.error("Login failed");
    }
  };

  return (
    <>
      {loding && <Spinner />}

      <div
        className="border rounded-4"
        style={{ background: "#f7f7f7" }}
      >
        <div
          className="shadow-sm p-4 bg-white rounded-4"
          style={{
            width: "100%",
            maxWidth: "350px",
            borderRadius: "18px",
            padding: "25px",
          }}
        >
          <h2
            className="fw-bold text-center mb-4"
            style={{
              color: "#222",
              fontSize: "1.8rem",
            }}
          >
            Sign In
          </h2>

          <Form layout="vertical" onFinish={submitHandler}>
            <Form.Item
              label={<span className="fw-bold">Email</span>}
              name="email"
              rules={[{ required: true, message: "Please enter your email" }]}
            >
              <Input
                type="email"
                placeholder="Enter your email"
                style={{
                  padding: "10px",
                  borderRadius: "10px",
                }}
              />
            </Form.Item>

            <Form.Item
              label={<span className="fw-bold">Password</span>}
              name="password"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
            >
              <Input.Password
                placeholder="Enter your password"
                style={{
                  padding: "10px",
                  borderRadius: "10px",
                }}
              />
            </Form.Item>

            <button
              className="btn w-100 fw-bold mt-2"
              style={{
                background: "#225F33",
                color: "white",
                padding: "12px",
                borderRadius: "12px",
                fontSize: "1rem",
              }}
            >
              SIGN IN
            </button>

            <div className="mt-3">
              <Oauth />
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;