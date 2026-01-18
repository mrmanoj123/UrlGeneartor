const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// ✅ Import routes FIRST
const userRoutes = require("./routes/userfulldetails");

// ✅ Mount routes
app.use("/api", userRoutes);

// ✅ Root route (important for Render)
app.get("/", (req, res) => {
  res.status(200).json({
    message: "API is running successfully 🚀",
  });
});

// ✅ Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

// ✅ REQUIRED for Render
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
