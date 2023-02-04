const inquirer = require("inquirer");
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'luv21dance#P',
    database: 'employee_db'
})

connection.connect(function(err) {
    if(err) throw err;
    start()
})

function start(){
    inquirer.prompt([
        {
            message: 'What would you like to do',
            type: 'list',
            name: "choice",
            choices: ["Check departments"]
        }
    ]).then((answerObj) => {
        if(answerObj.choice == "Check departments") {
            checkDep()
        }
    })
}

async function checkDep(){
    connection.query("SELECT * FROM department", function(err, data) {
        console.table(data)
        console.log('\n')
        start()
    })
}