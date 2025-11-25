// otpController.js
//import nodemailer from "nodemailer";
//import dotenv from "dotenv";
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

// Temporary OTP store; in production, use Redis or DB
let otpStore = {};

/**
 * Send OTP to the given email
 */
const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email)
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Store OTP with 5 minutes expiry
    otpStore[email] = {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes
    };

    // Log OTP for debugging (remove in production)
    console.log(`OTP for ${email}: ${otp}`);

    // Setup Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Send OTP email
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
    });

    res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to send OTP", error });
  }
};

/**
 * Verify OTP for given email
 */
const verifyOtp = (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp)
      return res
        .status(400)
        .json({ success: false, message: "Email and OTP are required" });

    const record = otpStore[email];

    console.log("Verifying OTP for:", email);
    console.log("OTP received:", otp);
    console.log("OTP stored:", record?.otp);

    if (!record)
      return res
        .status(400)
        .json({
          success: false,
          message: "OTP not found. Please request a new one.",
        });

    if (record.expiresAt < Date.now()) {
      delete otpStore[email];
      return res
        .status(400)
        .json({
          success: false,
          message: "OTP expired. Please request a new one.",
        });
    }

    if (String(otp).trim() !== String(record.otp)) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    // OTP verified successfully
    delete otpStore[email];
    res
      .status(200)
      .json({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res
      .status(500)
      .json({ success: false, message: "OTP verification failed", error });
  }
};

module.exports={sendOtp,verifyOtp };