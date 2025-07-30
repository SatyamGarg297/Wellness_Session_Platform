const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes Placeholder
app.get("/", (req, res) => {
  res.send("API is running...");
});

const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);

const sessionRoutes = require("./routes/sessionRoutes");
app.use("/api", sessionRoutes);




// MongoDB Connect
const connectDB = require("./config/db");
connectDB();

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
