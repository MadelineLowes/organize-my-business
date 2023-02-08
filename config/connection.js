 const mysql = require('mysql2');
 
// Connect to the database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: 'luv21dance#P',
        database: 'company_db'
    },
    console.log('Connected to company_db database.')
)

db.connect(function (err) {
    if (err) {
        throw err;
    }
    start()
})

module.exports = db;