const express = require("express");
const cors = require("cors");
const Route = express.Router();

const { getuserdetails } = require("../Controllers/userfulldetails");
const { GetToken } = require("../Controllers/agentlog");
const { geturl } = require("../Controllers/UrlGenerator");
const { Tokenverify } = require("../Controllers/VerifyToken");

Route.get("/userinfo", getuserdetails);
Route.post("/url", geturl);
Route.post("/getToken", GetToken);
Route.get("/token/:token", Tokenverify);

module.exports = Route;
