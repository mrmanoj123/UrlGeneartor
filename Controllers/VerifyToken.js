const jwt = require("jsonwebtoken");

exports.Tokenverify = async function (req, res) {
  try {
    const token = req.params.token;
    const client_id = "9e7c8b29-9988-45e2-b631-6def578db4fd";

    if (!token) {
      return res.status(401).json({
        status: 401,
        message: "Invalid Token",
      });
    }

    // 🔹 Verify JWT
    const decodedToken = jwt.verify(token, client_id);

    console.log("Decoded Token:", decodedToken);

    // 🔹 Send response (IMPORTANT)
    return res.status(200).json({
      status: 200,
      message: "Token verified successfully",
      data: decodedToken,
    });
  } catch (error) {
    console.error("JWT verification failed:", error.message);

    return res.status(401).json({
      status: 401,
      message: "Invalid or expired token",
    });
  }
};
