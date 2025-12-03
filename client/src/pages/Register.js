import React, { useState } from "react";
import { Form, Input, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Send OTP
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
      message.error("Failed to send OTP. Try again.");
    }
  };

  // Verify OTP + Register
  const verifyOtp = async (values) => {
    try {
      setLoading(true);

      await axios.post("/api/v1/otp/verify-otp", {
        email: formData.email,
        otp: values.otp.trim(),
      });

      await axios.post("/api/v1/users/register", formData);

      setLoading(false);
      message.success("Registration successful!");
      navigate("/login");
    } catch (error) {
      setLoading(false);
      message.error(error.response?.data?.message || "Failed to verify OTP");
    }
  };

  return (
    <>
      {loading && <Spinner />}

      <div className="border rounded-4">
        <div
          className="p-4 bg-white rounded-4 shadow-sm"
          style={{
            width: "100%",
            maxWidth: "360px",
            borderRadius: "20px",
          }}
        >
          {step === 1 ? (
            <Form layout="vertical" onFinish={submitInfo}>
              <h2 className="fw-bold text-center mb-3">Sign Up</h2>

              <Form.Item
                label="Full Name"
                name="name"
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <Input className="p-3" placeholder="Full Name" />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Enter your email" }]}
              >
                <Input className="p-3" placeholder="Email Address" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Enter a password" }]}
              >
                <Input type="password" className="p-3" placeholder="Password" />
              </Form.Item>

              <button
                className="btn  w-100 fw-bold p-3 mt-2 rounded-3"
                style={{
                  background: "#225F33",
                  color: "white",
                  padding: "12px",
                  borderRadius: "12px",
                  fontSize: "1rem",
                }}
              >
                Send OTP
              </button>
            </Form>
          ) : (
            <Form layout="vertical" onFinish={verifyOtp}>
              <h2 className="fw-bold text-center mb-3">Verify OTP</h2>

              <Form.Item
                label="Enter OTP"
                name="otp"
                rules={[{ required: true, message: "Please enter OTP" }]}
              >
                <Input
                  className="p-3"
                  placeholder="6-digit OTP"
                  maxLength={6}
                />
              </Form.Item>

              <button className="btn btn-dark w-100 fw-bold p-3 mt-2 rounded-3">
                Verify & Register
              </button>

              <div className="text-center mt-3">
                <span
                  className="fw-bold text-primary"
                  style={{ cursor: "pointer" }}
                  onClick={() => setStep(1)}
                >
                  Resend OTP
                </span>

                <span
                  className="fw-bold text-primary"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/login")}
                >
                  Login
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