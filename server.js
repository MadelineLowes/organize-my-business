const express = require('express');
const mysql = require("mysql2");
const inquirer = require('inquirer');
const fs = require('fs'); // do i need this?

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// CALL ONCE SOMEWHERE IN THE BEGINNING OF THE APP
// const cTable = require('console.table');
// console.table([
//   {
//     name: 'foo',
//     age: 10
//   }, {
//     name: 'bar',
//     age: 20
//   }
// ]);

// GET ONLY TABLE STRING
// const table = cTable.getTable([
//     {
//       name: 'foo',
//       age: 10
//     }, {
//       name: 'bar',
//       age: 20
//     }
//   ]);

// Connect to the database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
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


function start() {
    inquirer.prompt([
        {
            message: 'What would you like to do?',
            type: 'list',
            name: "choice",
            choices: ["Check departments", "Add department", "Remove department", "Check roles", "Add role", "Remove role", "Check employees", "Add employees", "Remove employees"]
        }
    ]).then((answerObj) => {
        if (answerObj.choice == "Check departments") {
            checkDept();
        } else if (answerObj.choice == "Add department") {
            addDept();
        } else if (answerObj.choice == "Remove department") {
            removeDept();
        } else if (answerObj.choice == "Check roles") {
            checkRole();
        } else if (answerObj.choice == "Add role") {
            addRole();
        } else if (answerObj.choice == "Remove role") {
            removeRole();
        } else if (answerObj.choice == "Check employees") {
            checkEmp();
        } else if (answerObj.choice == "Add employees") {
            addEmp();
        } else if (answerObj.choice == "Remove employees") {
            removeEmp();
        } else {
            throw err;
        }
    })
}

// read all departments
async function checkDept() {
    app.get('api/department', (req, res) => {
        const sql = 'SELECT * FROM department';

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

// create a department
async function addDept() {
    inquirer.prompt([
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
            app.post('/api/department/:id', ({ body }, res) => {
                const sql = `INSERT INTO department (dep_name)
                VALUES (?)`
                const params = [answerObj.dep_name];

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

// delete a department
async function removeDept() {
    app.delete('api/department/:id', (req, res) => {
        const sql = 'DELETE FROM department WHERE id = ?';
        const params = [req.params.id];

        db.query(sql, params, (err, result) => {
            if (err) {
                res.statusMessage(400).json({ error: res.message });
            } else if (!result.affectedRows) {
                res.json({
                    message: 'Department not found'
                });
            } else {
                res.json({
                    message: 'deleted',
                    changes: result.affectedRows,
                    id: req.params.id
                });
            }
        });
    });
    console.table(data)
    console.log('\n')
    start()
};


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

async function removeRole() {
    app.delete('api/role/:id', (req, res) => {
        const sql = 'DELETE FROM role WHERE id = ?';
        const params = [req.params.id];

        db.query(sql, params, (err, result) => {
            if (err) {
                res.statusMessage(400).json({ error: res.message });
            } else if (!result.affectedRows) {
                res.json({
                    message: 'Role not found'
                });
            } else {
                res.json({
                    message: 'deleted',
                    changes: result.affectedRows,
                    id: req.params.id
                });
            }
        });
    });
    console.table(data)
    console.log('\n')
    start()
};

async function checkEmp() {
    app.get('api/employee', (req, res) => {
        const sql = 'SELECT * FROM employee';

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
async function removeEmp() {
    app.delete('api/employee/:id', (req, res) => {
        const sql = 'DELETE FROM department WHERE id = ?';
        const params = [req.params.id];

        db.query(sql, params, (err, result) => {
            if (err) {
                res.statusMessage(400).json({ error: res.message });
            } else if (!result.affectedRows) {
                res.json({
                    message: 'Employee not found'
                });
            } else {
                res.json({
                    message: 'deleted',
                    changes: result.affectedRows,
                    id: req.params.id
                });
            }
        });
    });
    console.table(data)
    console.log('\n')
    start()
};






// Close the connection
connection.end();


// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
// THIS IS THE END OF THE CODE IVE WRITTEN  

// const fs = require('fs');
// const mysql = require('mysql2');
// const inquirer = require('inquirer');

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'root'
// });

// connection.connect(function(err) {
//   if (err) {
//     console.error('Error connecting to the database: ' + err.stack);
//     return;
//   }

fs.readFile('schema.sql', 'utf-8', function (err, data) {
    if (err) {
        console.error('Error reading schema file: ' + err.stack);
        return;
    }

    connection.query(data, function (err, results, fields) {
        if (err) {
            console.error('Error executing schema file: ' + err.stack);
            return;
        }

        console.log('Database and tables created successfully!');

        inquirer.prompt([
            {
                type: 'input',
                name: 'department_name',
                message: 'Enter the name of a department:'
            },
            {
                type: 'input',
                name: 'role_title',
                message: 'Enter the title of a role:'
            },
            {
                type: 'input',
                name: 'role_salary',
                message: 'Enter the salary of the role:'
            },
            {
                type: 'input',
                name: 'employee_first_name',
                message: 'Enter the first name of an employee:'
            },
            {
                type: 'input',
                name: 'employee_last_name',
                message: 'Enter the last name of the employee:'
            }
        ]).then(function (answers) {
            // Insert data into the department table
            connection.query('INSERT INTO
