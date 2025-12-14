//require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(bodyParser.json());

// ✅ Mount router properly
app.use("/api", userroutes);
app.use("/api", TokenRoute);
app.use("/api", GetUrl);

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

module.exports = app;

const userroutes = require("./routes/userfulldetails");
const TokenRoute = require("./routes/userfulldetails");
const GetUrl = require("./routes/userfulldetails");
