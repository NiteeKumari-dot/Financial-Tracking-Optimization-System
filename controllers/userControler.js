const { LogError } = require("concurrently");
const userModel = require("../models/userModel");
const cloudinary = require("cloudinary").v2;
const CreateDataUri = require("../utils/dataUri");

// login controler

const loginControler = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email, password });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not exists",
      });
    }

    res.status(200).send({
      success: true,
      user,
    });
  } catch (error) {
    req.status(400).send({
      success: false,
      error,
    });
  }
};

// register controler

const registerControler = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "Email already exists. Please login.",
      });
    }

    // Create new user
    const newUser = new userModel({ name, email, password });
    await newUser.save();

    res.status(200).send({
      success: true,
      newUser,
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).send({
      success: false,
      message: "Registration failed",
      error,
    });
  }
};
// update profile

const updateProfile = async (req, res) => {
  const { userId, name, email } = req.body;

  const uri = CreateDataUri(req.file);
  const file = await cloudinary.uploader.upload(uri.content, {
    folder: "profile",
  });

  try {
    await userModel.updateOne(
      { _id: userId },
      { photo: file.url, name, email }
    );
    const data = await userModel.findOne({ _id: userId });

    res.status(201).send({ success: true, data });
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
};

const googleControler = async (req, res) => {
  try {
    let user = await userModel.findOne({ email: req.body.email });

    if (!user) {
      const password = Math.random().toString(36).slice(-8);

      const newUser = new userModel({
        name: req.body.name,
        email: req.body.email,
        photo: req.body.photo,
        password,
      });

      await newUser.save();

      user = await userModel.findOne({ email: req.body.email });
    }

    res.status(200).send({
      user,
    });
  } catch (error) {}
};

module.exports = {
  loginControler,
  registerControler,
  updateProfile,
  googleControler,
};
