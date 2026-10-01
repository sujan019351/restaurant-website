const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

// Ensure .env is loaded regardless of current working directory
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const paymentRoutes = require("./routes/payment");

const app = express();

const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Health check endpoint to quickly test server and database status
app.get("/api/health", (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? "connected" : "disconnected";
  res.json({
    status: "ok",
    database: dbStatus,
    dbName: mongoose.connection.name || null,
    port: PORT,
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/payment", paymentRoutes);

// Connect to the separate MongoDB database
connectDB();

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use.`);
    console.error("Note: On macOS, port 5000 is occupied by AirPlay Receiver (ControlCenter). Port 5001 is recommended.");
  } else {
    console.error("Server error:", error);
  }
});