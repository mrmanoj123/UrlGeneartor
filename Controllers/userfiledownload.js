const { genToken } = require('../auth/tokengen')
const axios = require('axios')
exports.calltoken = async (req, res) => {
   const { Agentemail, recordid, tablename } = req.body;
   const details = {
      Agentemail, recordid, tablename
   }
   const token = await genToken(details);
   //console.log(token)
   if (!token) {
      return res.status(404).json({
         status: 404,
         message: "Invalid Request"
      })
   } else {
      try {
         const delaction = await axios.delete(
            `https://orgf9c8c44e.crm8.dynamics.com/api/data/v9.2/cr0af_customerfileses(${recordid})`,
            {
               headers: {
                  Authorization: `Bearer ${token}`,
                  "OData-MaxVersion": "4.0",
                  "OData-Version": "4.0"
               }
            }
         );
         const result = delaction.status
         return res.status(200).json({
            status: 200,
            message: `Item Deleted Successfully ${result}`
         })
      } catch (error) {
         return res.status(404).json({
            status: 404,
            message: error
         })
      }

   }

}