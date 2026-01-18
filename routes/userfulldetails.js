const express = require("express");
const cors = require("cors");
const Route = express.Router();

const { getuserdetails } = require("../Controllers/userfulldetails");
const { GetToken } = require("../Controllers/agentlog");
const { geturl } = require("../Controllers/UrlGenerator");
const { Tokenverify } = require("../Controllers/VerifyToken");
const { GetUserfiles } = require("../Controllers/Getuserfiles")
const { calltoken } = require("../Controllers/userfiledownload")
const { downloadFile } = require("../Controllers/filedownload")
const { sendOtpEmail } = require("../Controllers/sendemail")
const { sendsuccessemail } = require("../Controllers/sentsuccessemail")

Route.get("/userinfo", getuserdetails);
Route.post("/url", geturl);
Route.post("/getToken", GetToken);
Route.get("/token/:token", Tokenverify);
Route.post("/getfile", GetUserfiles);
Route.post("/del", calltoken)
Route.post("/file", downloadFile);
Route.post("/sendemail", sendOtpEmail)
Route.post('/success', sendsuccessemail)


module.exports = Route;
