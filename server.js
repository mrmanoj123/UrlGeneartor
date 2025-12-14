//require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(bodyParser.json());

const userroutes = require("./routes/userfulldetails");
const TokenRoute = require("./routes/userfulldetails");
const GetUrl = require("./routes/userfulldetails");

// ✅ Mount router properly
app.use("/api", userroutes);
app.use("/api", TokenRoute);
app.use("/api", GetUrl);

app.get("/test", (req, res) => {
  res.send("api is running");
});

app.listen(PORT, () => {
  console.log("Port running at", PORT);
});
