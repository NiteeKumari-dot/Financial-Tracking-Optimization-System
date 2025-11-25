import React, { useState } from "react";
import { Form, Input, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

const Register = () => {
  const [step, setStep] = useState(1); // 1: fill info, 2: verify OTP
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Step 1: Send OTP
  const submitInfo = async (values) => {
    setFormData(values);
    try {
      setLoading(true);
      await axios.post("/api/v1/otp/send-otp", { email: values.email });
      setLoading(false);
      message.success("OTP sent to your email");
      setStep(2);
    } catch (error) {
      setLoading(false);
      console.error(error);
      message.error("Failed to send OTP. Try again.");
    }
  };

  // Step 2: Verify OTP and Register
  const verifyOtp = async (values) => {
    try {
      setLoading(true);
      const otpValue = values.otp.trim();

      await axios.post("/api/v1/otp/verify-otp", {
        email: formData.email,
        otp: otpValue,
      });

      await axios.post("/api/v1/users/register", formData);

      setLoading(false);
      message.success("Registration successful!");
      navigate("/login"); // redirect to login
    } catch (error) {
      setLoading(false);
      console.error(error);
      if (error.response && error.response.data?.message) {
        message.error(error.response.data.message);
      } else {
        message.error("Failed to verify OTP");
      }
    }
  };

  return (
    <>
      {loading && <Spinner />}

      <div className="d-flex align-items-center justify-content-center vh-100">
        <div
          className="shadow p-4 p-md-5 bg-white rounded-4 w-100"
          style={{ maxWidth: "450px" }}
        >
          {step === 1 ? (
            <Form layout="vertical" onFinish={submitInfo}>
              <h1 className="fw-bold text-center text-white bg-dark py-2 rounded-3">
                Sign Up
              </h1>
              <hr />

              <Form.Item
                label="Full Name"
                name="name"
                className="fw-bold"
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <Input className="fw-bold p-3" placeholder="Full Name" />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                className="fw-bold"
                rules={[{ required: true, message: "Please enter your email" }]}
              >
                <Input className="fw-bold p-3" placeholder="Email Address" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                className="fw-bold"
                rules={[{ required: true, message: "Please enter a password" }]}
              >
                <Input
                  type="password"
                  className="fw-bold p-3"
                  placeholder="Password"
                />
              </Form.Item>

              <button className="btn btn-dark w-100 fw-bold p-3 mt-2">
                Send OTP
              </button>

              <div className="d-flex justify-content-center fw-bold mt-3 gap-1">
                Already have an account?
                <span
                  className="fw-bold text-decoration-none text-primary"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/login")}
                >
                  Sign In
                </span>
              </div>
            </Form>
          ) : (
            <Form layout="vertical" onFinish={verifyOtp}>
              <h1 className="fw-bold text-center text-white bg-dark py-2 rounded-3">
                Verify OTP
              </h1>
              <hr />

              <Form.Item
                label="OTP"
                name="otp"
                className="fw-bold"
                rules={[{ required: true, message: "Please enter OTP" }]}
              >
                <Input
                  className="fw-bold p-3"
                  placeholder="Enter OTP"
                  maxLength={6}
                />
              </Form.Item>

              <button className="btn btn-dark w-100 fw-bold p-3 mt-2">
                Verify & Register
              </button>

              <div className="d-flex justify-content-center fw-bold mt-3 gap-2 flex-column align-items-center">
                <span
                  className="fw-bold text-decoration-none text-primary"
                  style={{ cursor: "pointer" }}
                  onClick={() => setStep(1)}
                >
                  Resend OTP
                </span>
                <span
                  className="fw-bold text-decoration-none text-primary mt-1"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/login")}
                >
                  Go to Login
                </span>
              </div>
            </Form>
          )}
        </div>
      </div>
    </>
  );
};

export default Register;