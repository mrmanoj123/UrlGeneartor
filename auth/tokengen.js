const express = require('express');
const axios = require('axios')
exports.genToken = async (details) => {
    const { Agentemail, recordid, tablename } = details;
    if (!Agentemail || !recordid || !tablename) {
        return "Invaid Reuest Sent";
    }
    else {
        try {
            const client_id = process.env.CLIENT_ID;
            const client_secret = process.env.CLIENT_SECRET;
            const tenant_id = process.env.TENANT_ID;
            const scope = process.env.SCOPE;
            const grant_type = process.env.GRANT_CREDS;

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
            const tokencall = await axios.post(tokenUrl,body.toString(),{
                headers:{
                    "Content-Type":"application/x-www-form-urlencoded"
                },
                timeout:5000
            })
            const getToken = tokencall.data.access_token
            return getToken
        } catch (error) {
            return `Error is " , ${error}`
        }
    }
}