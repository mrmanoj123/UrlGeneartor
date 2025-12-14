const axios = require("axios");

exports.GetToken = async (details) => {
  const { Agentemail, recordid, tablename, link } = details;

  // ✅ Load from environment variables
  const client_id = process.env.CLIENT_ID;
  const client_secret = process.env.CLIENT_SECRET;
  const tenant_id = process.env.TENANT_ID;
  const scope = process.env.SCOPE;
  const grant_type = process.env.GRANT_CREDS;

  console.log(client_id, client_secret);

  if (!client_id || !client_secret || !tenant_id) {
    throw new Error("Missing required environment variables");
  }

  const body = new URLSearchParams({
    client_id,
    client_secret,
    grant_type,
    scope,
  });

  const StartDate = new Date();
  const EndDate = new Date(StartDate);
  EndDate.setDate(EndDate.getDate() + 30);

  const tokenUrl = `https://login.microsoftonline.com/${tenant_id}/oauth2/v2.0/token`;

  try {
    // 1️⃣ Get access token
    const tokenResponse = await axios.post(tokenUrl, body.toString(), {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      timeout: 5000,
    });

    const token = tokenResponse.data.access_token;

    // 2️⃣ Dataverse URL
    const dynamicsUrl =
      "https://orgf9c8c44e.api.crm8.dynamics.com/api/data/v9.2/cr0af_testusers";

    // 3️⃣ Data to save
    const userdata = {
      cr0af_firstname: "Manoj",
      cr0af_lastname: "Gummalampati Prasanna",
      cr0af_link: link,
      cr0af_recordid: recordid,
      cr0af_tablename: tablename,
      cr0af_agentemail: Agentemail,
      cr0af_startedate: StartDate,
      cr0af_validtill: EndDate,
    };

    // 4️⃣ Create record
    const response = await axios.post(dynamicsUrl, userdata, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      timeout: 7000,
    });

    return response.headers["odata-entityid"];
  } catch (err) {
    if (err.code === "ECONNABORTED") {
      throw new Error("External service timeout");
    }
    console.error("Dataverse Error:", err.response?.data || err.message);
    throw err;
  }
};
