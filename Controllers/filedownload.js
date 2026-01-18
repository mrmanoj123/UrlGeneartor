const { genToken } = require('../auth/tokengen');
const axios = require('axios');

exports.downloadFile = async (req, res) => {
  const { Agentemail,recordid, tablename} = req.body;

  // Validate input
  if (!recordid || !tablename) {
    return res.status(400).json({
      status: 400,
      message: "Missing required parameters"
    });
  }

  try {
     const details = {
      Agentemail, recordid, tablename
   }
    // 1️⃣ Get Dataverse access token
    const token = await genToken(details);

    if (!token) {
      return res.status(401).json({
        status: 401,
        message: "Token generation failed"
      });
    }

    // 2️⃣ Dataverse download URL
    const downloadUrl =
      `https://orgf9c8c44e.crm8.dynamics.com/api/data/v9.2/` +
      `${tablename}(${recordid})/cr0af_attachment/$value`;

    // 3️⃣ Call Dataverse (IMPORTANT: stream)
    const response = await axios.get(downloadUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/octet-stream"
      },
      responseType: "stream" // 🔑 critical for file download
    });

    // 4️⃣ Forward Dataverse headers
    res.setHeader(
      "Content-Type",
      response.headers["content-type"]
    );

    res.setHeader(
      "Content-Disposition",
      response.headers["content-disposition"] || "attachment"
    );

    // 5️⃣ Stream file to client
    response.data.pipe(res);

  } catch (error) {
    console.error("Download error:", error.message);

    return res.status(500).json({
      status: 500,
      message: "File download failed"
    });
  }
};
