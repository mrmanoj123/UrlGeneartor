const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const { GetToken } = require("../Controllers/agentlog");

exports.geturl = async (req, res) => {
  const { Agentemail, recordid, tablename } = req.body;
  const payload = {
    Agentemail,
    recordid,
    tablename,
  };
  const client_id = "9e7c8b29-9988-45e2-b631-6def578db4fd";
  const jwttoken = jwt.sign(payload, client_id, {
    expiresIn: "2m",
  });

  const link = `https://expample.com/${jwttoken}/${recordid}`;

  const details = {
    Agentemail,
    recordid,
    tablename,
    link,
  };
  await GetToken(details);

  return res.status(200).json({
    status: 200,
    message: link,
  });
};
