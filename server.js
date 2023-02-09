const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');

const cTable = require('console.table');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to the database
const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'luv21dance#P',
        database: 'company_db'
    },
)
connection.connect(function (err) {
    if (err) {
        throw err;
    }
    console.log('Connected to company_db database.');
    start();
})

// called from connection.js once connection is established
// there should be an exit option
function start() {
    inquirer.prompt([
        {
            message: 'What would you like to do?',
            type: 'list',
            name: "choice",
            choices: ["View all departments", "Add department", "View all roles", "Add role", "View all employees", "Update employee's role", "Add employee"]
        }
    ]).then((answerObj) => {
        switch (answerObj.choice) {
            case "View all departments":
                checkDept();
                break;
            case "Add department":
                addDept();
                break;
            // case "Remove department":
            //     removeDept();
            //     break;
            case "View all roles":
                checkRole();
                break;
            case "Add role":
                addRole();
                break;
            // case "Remove role":
            //     removeRole();
            //     break;
            case "View all employees":
                checkEmp();
                break;
            case "Update employee's role":
                updateEmpRole();
                break;
            case "Add employee":
                addEmp();
                break;
            // case "Remove employee":
            //     removeEmp();
            //     break;
            default:
                throw err;
        }
    })
}
// GOOD UNTIL HERE

function querying() {
    connection.query('SELECT * FROM department', function(err, results){
        if (err) throw err;
        console.table("results: " + results);
        // connection.end() - do i need this?
        start();
    })
}

// read all departments
// removed "async" before declaring function
function checkDept() {
    // app.get('api/department', (req, res) => {
        // const sql = 'SELECT department.id, department.name FROM department';
        //(sql, err, rows
        // promise().
         connection.query('SELECT * FROM department', function (err, rows) {
            if (err) throw err;
            // {
            //     res.statusMessage(400).json({ error: res.message });
            //     return;
            // }
            console.log("rows: ", rows);
        })
      
        //     res.json({
        //         message: 'success',
        //         data: rows
        //     })
            // .then(([rows]) => {
            //     let departments = rows;
            //     console.log("\n");
            //     console.table(departments);
            // })
            // .then(() => start());
        // })
          
    // });

};

// create a department
async function addDept() {
    await inquirer.prompt([
        {
            message: 'What is the name of the department?',
            type: 'input',
            name: 'dep_name',
        }
    ]).then((answerObj) => {
        if (answerObj.dep_name == '') {
            res.json({
                message: 'No department name provided'
            });
        } else {
            // app.post('/api/department/:id', ({ body }, res) => {
            console.table("this is the answerObj: " + answerObj); // a test to ensure it's registered

            connection.query('INSERT INTO department SET ?', {
                dep_name: answerObj.dep_name,
            }, function(err) {
                if (err) throw err;
                console.log("added new department");
                querying()
            })
                // const sql = `INSERT INTO department SET ?`, {
                //     dep_name: answerObj.dep_name,
                // }
                // const params = [answerObj.dep_name];

                // connection.query(sql, params, (err, result) => {
                //     if (err) {
                //         res.statusMessage(400).json({ error: err.message });
                //         return;
                //     }
                //     res.json({
                //         message: 'success',
                //         data: body,
                //         changes: result.affectedRows,
                //         id: req.params.id
                //     });
                // });
            };
        }
    )
    // });

    // console.table(data)
    // console.log('\n')
    // start()
};

// delete a department
// async function removeDept() {
//     inquirer.prompt([
//         {
//             message: 'What is the name of the department?',
//             type: 'input',
//             name: 'dep_name',
//         }
//     ]).then((answerObj) => {
//         if (answerObj.dep_name == '') {
//             res.json({
//                 message: 'No department name provided'
//             });
//         } else {
//             app.delete('api/department/:id', (req, res) => {
//                 const sql = 'DELETE FROM department WHERE id = ?';
//                 const params = [req.params.id];

//                 db.query(sql, params, (err, result) => {
//                     if (err) {
//                         res.statusMessage(400).json({ error: res.message });
//                     } else if (!result.affectedRows) {
//                         res.json({
//                             message: 'Department not found'
//                         });
//                     } else {
//                         res.json({
//                             message: 'deleted',
//                             changes: result.affectedRows,
//                             id: req.params.id
//                         });
//                     }
//                 });
//             });
//         }
//     })

//     console.table(data)
//     console.log('\n')
//     start()
// };

async function checkRole() {
    app.get('api/role', (req, res) => {
        const sql = 'SELECT * FROM role';

        db.query(sql, (err, rows) => {
            if (err) {
                res.statusMessage(400).json({ error: res.message });
                return;
            }
            res.json({
                message: 'success',
                data: rows
            });
        });
    });
    console.table(data)
    console.log('\n')
    start()
};

async function addRole() {
    inquirer.prompt([
        {
            message: 'What is the title of the role?',
            type: 'input',
            name: 'title',
        },
        {
            message: 'What is the salary of this role?',
            type: 'input',
            name: 'salary',
        },
        {
            message: 'What department does this role belong to?',
            type: 'input',
            name: 'department_id',
        }
    ]).then((answerObj) => {
        if (answerObj.title == '') {
            res.json({
                message: 'No role title provided'
            });
        } else {
            app.post('/api/role/:id', ({ body }, res) => {
                const sql = `INSERT INTO role (title)
                VALUES (?)`
                const params = [answerObj.title, answerObj.salary, answerObj.department_id];

                db.query(sql, params, (err, result) => {
                    if (err) {
                        res.statusMessage(400).json({ error: err.message });
                        return;
                    }
                    res.json({
                        message: 'success',
                        data: body,
                        changes: result.affectedRows,
                        id: req.params.id
                    });
                });
            });
        }
    });

    console.table(data)
    console.log('\n')
    start()
};

// async function removeRole() {
//     inquirer.prompt([
//         {
//             message: 'What is the title of the role?',
//             type: 'input',
//             name: 'title',
//         }
//     ]).then((answerObj) => {
//         if (answerObj.title == '') {
//             res.json({
//                 message: 'No role title provided'
//             });
//         } else {
//             app.delete('api/role/:id', (req, res) => {
//                 const sql = 'DELETE FROM role WHERE id = ?';
//                 const params = [req.params.id];

//                 db.query(sql, params, (err, result) => {
//                     if (err) {
//                         res.statusMessage(400).json({ error: res.message });
//                     } else if (!result.affectedRows) {
//                         res.json({
//                             message: 'Role not found'
//                         });
//                     } else {
//                         res.json({
//                             message: 'deleted',
//                             changes: result.affectedRows,
//                             id: req.params.id
//                         });
//                     }
//                 });
//             });
//         }
//     })
//     console.table(data)
//     console.log('\n')
//     start()
// };

async function checkEmp() {
    // app.get('api/employee', (req, res) => {
        let sql = `SELECT employee.id, 
        employee.first_name, 
        employee.last_name, 
        role.title, 
        role.salary,
        department.dep_name AS 'department',
        manager.first_name AS 'manager' 
        FROM employee, role, department WHERE department.id = employee.role_id
        OREDER BY employee.id ASC`;

        connection.promise().query(sql, (err, results) => {
            if (err) throw err;
            console.table(results);
            console.log('\n')
            start();
        });
    };

async function updateEmpRole() { }

async function addEmp() {
    inquirer.prompt([
        {
            message: 'What is the first name of the employee?',
            type: 'input',
            name: 'first_name',
        },
        {
            message: 'What is the last_name of this employee?',
            type: 'input',
            name: 'last_name',
        },
        {
            message: 'What is this employees title/role?',
            type: 'input', //could i make this a list and make the choices the available role names?
            name: 'role_id',
        },
        {
            message: 'Who is this employees manager?',
            type: 'input',  //could i make this a list and make the choices the available role names?
            name: 'manager_id',
        },
    ]).then((answerObj) => {
        if (answerObj.first_name == '' && answerObj.last_name == '') {
            res.json({
                message: 'No employee name provided'
            });
        } else {
            app.post('/api/employee/:id', ({ body }, res) => {
                const sql = `INSERT INTO employee (first_name last_name)
                VALUES (?)`
                const params = [answerObj.first_name, answerObj.last_name, answerObj.role_id, answerObj.manager_id];

                db.query(sql, params, (err, result) => {
                    if (err) {
                        res.statusMessage(400).json({ error: err.message });
                        return;
                    }
                    res.json({
                        message: 'success',
                        data: body,
                        changes: result.affectedRows,
                        id: req.params.id
                    });
                });
            });
        }
    });

    console.table(data)
    console.log('\n')
    start()
};

// async function removeEmp() {
//     inquirer.prompt([
//         {
//             message: 'What is the first name of the employee?',
//             type: 'input',
//             name: 'first_name',
//         },
//         {
//             message: 'What is the last_name of this employee?',
//             type: 'input',
//             name: 'last_name',
//         }
//     ]).then((answerObj) => {
//         if (answerObj.first_name == '' && answerObj.last_name == '') {
//             res.json({
//                 message: 'No employee name provided'
//             });
//         } else {
//             app.delete('api/employee/:id', (req, res) => {
//                 const sql = 'DELETE FROM department WHERE id = ?';
//                 const params = [req.params.id];

//                 db.query(sql, params, (err, result) => {
//                     if (err) {
//                         res.statusMessage(400).json({ error: res.message });
//                     } else if (!result.affectedRows) {
//                         res.json({
//                             message: 'Employee not found'
//                         });
//                     } else {
//                         res.json({
//                             message: 'deleted',
//                             changes: result.affectedRows,
//                             id: req.params.id
//                         });
//                     }
//                 });
//             });
//         }
//     })
//     console.table(data)
//     console.log('\n')
//     start()
// };






// Close the connection
// connection.end();


// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
