const sql = require('mssql');

const sqlconnect = {
    user: 'dbuser',
    password: 'password',
    server: 'yourserver.database.windows.net',
    database: 'yourdb',
    options: {
        encrypt: true
    }
}
module.exports = async()=>{
    return sql.connect(sqlconnect)
}