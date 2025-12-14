const express = require("express");
const cors = require("cors");
const Route = express.Router();

const { getuserdetails } = require("../Controllers/userfulldetails");
const { GetToken } = require("../Controllers/agentlog");
const { geturl } = require("../Controllers/UrlGenerator");

Route.get("/userinfo", getuserdetails);
Route.get("/url", geturl);
Route.post("/getToken", GetToken);

module.exports = Route;
