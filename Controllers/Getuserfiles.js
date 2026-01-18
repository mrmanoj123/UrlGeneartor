const axios = require("axios");
exports.GetUserfiles = async (req, res) => {
    const { userRole, userEmail } = req.body;
    if (!userEmail || !userEmail) {
        return res.status(402).json({
            status: 401,
            message: "required fields are missing"
        })
    }
    const RoleAssigned = userRole === " " || userRole === null ? 'user' : userRole
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

    const tokenUrl = `https://login.microsoftonline.com/${tenant_id}/oauth2/v2.0/token`;

    try {
        // 1️⃣ Get access token
        const tokenResponse = await axios.post(tokenUrl, body.toString(), {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            timeout: 5000,
        });

        const token = tokenResponse.data.access_token;
        //console.log("Token is ",token)

        try {
            const getfileurl = RoleAssigned === 'user' || RoleAssigned === 'User' ? `https://orgf9c8c44e.crm8.dynamics.com/api/data/v9.2/cr0af_customerfileses?$select=cr0af_customername,cr0af_attachment_name,createdon&$filter=cr0af_customername eq '${userEmail}'` : `https://orgf9c8c44e.crm8.dynamics.com/api/data/v9.2/cr0af_customerfileses?$select=cr0af_customername,cr0af_attachment_name,createdon`;
            const callapi = await axios.get(getfileurl, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })

            const response = await callapi.data.value;

            return res.status(200).json({
                status: 200,
                message: response
            })
        }
        catch (err) {
            return res.status(500).json({
                status: 500,
                message: `Error occured ${err}`
            })
        }
    }
    catch (err) {
        return res.status(500).json({
            status: 500,
            message: "Token Creation failed"
        })
    }
}