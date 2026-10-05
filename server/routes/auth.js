const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    // Check if database is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        message: "Database service unavailable. Please ensure MongoDB is running.",
      });
    }

    const { name, email, password } = req.body || {};

    const cleanName = typeof name === "string" ? name.trim() : "";
    const cleanEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
    const cleanPassword = typeof password === "string" ? password : "";

    if (!cleanName || !cleanEmail || !cleanPassword) {
      return res.status(400).json({
        message: "All fields (Name, Email, Password) are required",
      });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(cleanEmail)) {
      return res.status(400).json({
        message: "Please enter a valid email address",
      });
    }

    if (cleanPassword.length < 6) {
      return res.status(400).json({
        message: "Password must contain at least 6 characters",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: cleanEmail });
    if (existingUser) {
      return res.status(400).json({
        message: "Email is already registered. Please sign in instead.",
      });
    }

    // Hash password safely
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(cleanPassword, salt);

    const user = new User({
      name: cleanName,
      email: cleanEmail,
      password: hashedPassword,
    });

    await user.save();

    // Generate JWT token for seamless authentication
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET || "your_secret_key",
      {
        expiresIn: "7d",
      }
    );

    res.status(201).json({
      success: true,
      message: "Registration successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);

    // Handle MongoDB duplicate key error (code 11000)
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Email is already registered. Please sign in instead.",
      });
    }

    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        message: messages.join(", "),
      });
    }

    res.status(500).json({
      message: error.message || "Internal server error occurred during registration",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        message: "Database service unavailable. Please ensure MongoDB is running.",
      });
    }

    const { email, password } = req.body || {};

    const cleanEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
    const cleanPassword = typeof password === "string" ? password : "";

    if (!cleanEmail || !cleanPassword) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email: cleanEmail });
    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const passwordMatch = await bcrypt.compare(cleanPassword, user.password);
    if (!passwordMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET || "your_secret_key",
      {
        expiresIn: "7d",
      }
    );

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      message: error.message || "Internal server error during login",
    });
  }
});

module.exports = router;