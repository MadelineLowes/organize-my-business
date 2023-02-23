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
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'luv21dance#P',
        database: 'company_db'
    },
)
db.connect(function (err) {
    if (err) throw err;
    console.log('Connected to company_db database.');
    start();
})

// called from connection.js once connection is established to start the app
function start() {
    inquirer.prompt([
        {
            message: 'What would you like to do?',
            type: 'list',
            name: "choice",
            choices: ["View all departments", "View all roles", "View all employees", "View employees by manager", "View employees by department", "Add department", "Add role", "Add employee", "Update employee's role", "Update employee's manager", "Delete employee", "Quit"]
        }
    ]).then((answerObj) => {
        switch (answerObj.choice) {
            case "View all departments":
                viewDept();
                break;
            case "View all roles":
                viewRole();
                break;
            case "View all employees":
                viewEmp();
                break;
            case "View employees by manager":
                viewEmpByMan();
                break;
            case "View employees by department":
                viewEmpByDept();
                break;
            case "Add department":
                addDept();
                break;
            case "Add role":
                addRole();
                break;
            case "Add employee":
                addEmp();
                break;
            case "Update employee's role":
                updateEmpRole();
                break;
            case "Update employee's manager":
                updateEmpMan();
                break
            case "Delete employee":
                deleteEmp();
                break;
            case "Quit":
                process.exit();
            default:
                process.exit();
        }
    })
}

// VIEW
function viewDept() {
    const sql = 'SELECT department.id, department.dep_name AS department FROM department';
    db.query(sql, function (err, results) {
        if (err) throw err;
        console.log('\n');
        console.log("=================");
        console.table(results);
        console.log("=================");
        console.log('\n');
        start();
    });
};

function viewRole() {
    const sql = 'SELECT role.id, role.title, department.dep_name AS department, role.salary FROM role LEFT JOIN department ON role.department_id = department.id';
    db.query(sql, function (err, results) {
        if (err) throw err;
        console.log('\n');
        console.log("============================================");
        console.table(results);
        console.log("============================================");
        console.log('\n');
        start();
    });
};

function viewEmp() {
    const sql = 'SELECT employee.id, employee.first_name AS first, employee.last_name AS last, role.title, department.dep_name AS department, role.salary, manager.first_name AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id';
    db.query(sql, function (err, results) {
        if (err) throw err;
        console.log('\n');
        console.log("===========================================================================");
        console.table(results);
        console.log("===========================================================================");
        console.log('\n');
        start();
    });
};

function viewEmpByMan() {
     // query to allow users to select manager in inquirer.prompt
    const sql = 'SELECT employee.id, employee.first_name AS first, employee.last_name AS last FROM employee';
    db.query(sql, function (err, results) {
        if (err) throw err;
        const manChoices = [];
        // adding each result name & value to the empty array
        for (i = 0; i < results.length; i++) {
            manChoices.push({
                name: results[i].first + ' ' + results[i].last,
                value: results[i].id,
            })
        }
        inquirer.prompt([
            {
                message: 'Who is the manager whose team you would like to view?',
                type: 'list',
                name: 'manager_id',
                choices: manChoices,
            }
        ]).then((answerObj) => {
            const sql = `SELECT employee.id, employee.first_name AS first, employee.last_name AS last, role.title, department.dep_name AS department, role.salary, manager.first_name AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id WHERE manager.id = ${answerObj.manager_id}`;
            db.query(sql, function (err, results) {
                if (err) {
                    throw err
                } else if (results.length === 0) {
                    console.log('\n');
                    console.log("=====================================================================");
                    console.log('It looks like there are no employees under this manager currently.')
                    console.log("=====================================================================");
                    console.log('\n');
                    start();
                } else {
                    console.log('\n');
                    console.log("===========================================================================");
                    console.log(`${results[0].manager}'S TEAM `);
                    console.table(results);
                    console.log("===========================================================================");
                    console.log('\n');
                    start();
                }
            });
        })
    })
};

function viewEmpByDept() {
     // query to allow users to select department in inquirer.prompt
    const sql = 'SELECT department.id, department.dep_name AS department FROM department';
    db.query(sql, function (err, results) {
        if (err) throw err;
        const deptChoices = [];
        // adding each result name & value to the empty array
        for (i = 0; i < results.length; i++) {
            deptChoices.push({
                name: results[i].department,
                value: results[i].id,
            })
        }
        inquirer.prompt([
            {
                message: 'What is the department whose team you would like to view?',
                type: 'list',
                name: 'department_id',
                choices: deptChoices,
            }
        ]).then((answerObj) => {
            const sql = `SELECT employee.id, employee.first_name AS first, employee.last_name AS last, role.title, department.dep_name AS department, role.salary, manager.first_name AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id WHERE department.id = ${answerObj.department_id}`;
            db.query(sql, function (err, results) {
                if (err) {
                    throw err
                } else if (results.length === 0) {
                    console.log('\n');
                    console.log("=====================================================================");
                    console.log('It looks like there are no roles in the this department currently.')
                    console.log("=====================================================================");
                    console.log('\n');
                    start();
                } else {
                    console.log('\n');
                    console.log("===========================================================================");
                    console.log(`${results[0].department} DEPARTMENT'S TEAM `);
                    console.table(results);
                    console.log("===========================================================================");
                    console.log('\n');
                    start();
                }

            });
        })
    })
};

// ADD
function addDept() {
    inquirer.prompt([
        {
            message: 'What is the name of the department?',
            type: 'input',
            name: 'dep_name',
        }
    ]).then((answerObj) => {
        if (answerObj.dep_name == '') {
            console.log('No department name provided');
            // restart function
            addDept();
        } else {
            const sql = `INSERT INTO department (dep_name) VALUES ('${answerObj.dep_name}')`;
            db.query(sql, function (err) {
                if (err) throw err;
                viewDept();
            });
        }
    });
}

function addRole() {
    // query to allow users to select department in inquirer.prompt
    const sql = 'SELECT department.id, department.dep_name AS department FROM department';
    db.query(sql, function (err, results) {
        if (err) throw err;
        const deptChoices = [];
        // adding each result name & value to the empty array
        for (i = 0; i < results.length; i++) {
            deptChoices.push({
                name: results[i].department,
                value: results[i].id,
            })
        }
        // option added in case the role doesn't have a department yet
        deptChoices.push({ name: 'TBD', value: null});
        inquirer.prompt([
            {
                message: 'What is the title of the role?',
                type: 'input',
                name: 'title',
            },
            {
                message: 'What department does this role belongs to?',
                type: 'list',
                name: 'department_id',
                choices: deptChoices,
            },
            {
                message: 'What is the salary of this role?',
                type: 'input',
                name: 'salary',
                // confirm number has been inputted and if not, ask the question again
                validate: function (salary) {
                    if (isNaN(salary)) {
                        console.log('     Please enter a numerical value');
                        return false;
                    } else if (!isNaN(salary)) {
                        return true;
                    } 
                } 
            }
        ]).then((answerObj) => {
            if (answerObj.title == '') {
                console.log('No role title provided')
                // restart function
                addRole();
            } else if (answerObj.salary == '') {
                console.log('No salary provided')
                // restart function
                addRole();
            } else {
                const sql = `INSERT INTO role (department_id, title, salary) VALUES ROW (${answerObj.department_id}, '${answerObj.title}', ${answerObj.salary})`;
                db.query(sql, function (err) {
                    if (err) throw err;
                    // call viewRole() function to show the updated role list
                    viewRole();
                });
            };
        });
    })
};

function addEmp() {
    // query to allow users to select role in inquirer.prompt
    const sqlRole = 'SELECT role.id, role.title FROM role';
    db.query(sqlRole, function (err, results) {
        if (err) throw err;
        const roleChoices = [];
        // adding each result name & value to the empty array
        for (i = 0; i < results.length; i++) {
            roleChoices.push({
                name: results[i].title,
                value: results[i].id,
            })
        }
        // query to allow users to select manager in inquirer.prompt
        const sqlMan = 'SELECT employee.id, employee.first_name AS first, employee.last_name AS last FROM employee';
        db.query(sqlMan, function (err, results) {
            if (err) throw err;
            const manChoices = [];
            // adding each result name & value to the empty array
            for (i = 0; i < results.length; i++) {
                manChoices.push({
                    name: results[i].first + ' ' + results[i].last,
                    value: results[i].id,
                })
            }
            // options added in case the role and/or manager hasn't been assigned yet
            roleChoices.push({ name: 'TBD', value: null });
            manChoices.push({ name: 'NULL', value: null });
            inquirer.prompt([
                {
                    message: 'What is the first name of the employee?',
                    type: 'input',
                    name: 'first_name',
                },
                {
                    message: 'What is the last name of this employee?',
                    type: 'input',
                    name: 'last_name',
                },
                {
                    message: 'What is this employees title/role?',
                    type: 'list',
                    name: 'role_id',
                    choices: roleChoices,
                },
                {
                    message: 'Who is this employees manager?',
                    type: 'list',
                    name: 'manager_id',
                    choices: manChoices
                },
            ]).then((answerObj) => {
                if (answerObj.first_name == '') {
                    console.log('No first name provided')
                    // restart function
                    addEmp();
                } else if (answerObj.last_name == '') {
                    console.log('No last name provided');
                    // restart function
                    addEmp();
                } else {
                    const sql = `INSERT INTO employee (role_id, first_name, last_name, manager_id) VALUES ROW (${answerObj.role_id}, '${answerObj.first_name}', '${answerObj.last_name}', ${answerObj.manager_id})`;
                    db.query(sql, function (err) {
                        if (err) throw err;
                        // call viewEmp() function to show the updated employee list
                        viewEmp();
                    });
                }
            });
        });
    });
};

// UPDATE
function updateEmpRole() {
    // query to allow users to select role in inquirer.prompt
    const sqlRole = 'SELECT role.id, role.title FROM role';
    db.query(sqlRole, function (err, results) {
        if (err) throw err;
        const roleChoices = [];
        // adding each result name & value to the empty array
        for (i = 0; i < results.length; i++) {
            roleChoices.push({
                name: results[i].title,
                value: results[i].id,
            })
        }
        // query to allow users to select employee in inquirer.prompt
        const sqlEmp = 'SELECT employee.id, employee.first_name AS first, employee.last_name AS last FROM employee';
        db.query(sqlEmp, function (err, results) {
            if (err) throw err;
            const empChoices = [];
            // adding each result name & value to the empty array
            for (i = 0; i < results.length; i++) {
                empChoices.push({
                    name: results[i].first + ' ' + results[i].last,
                    value: results[i].id,
                })
            }
            // option added in case employee is changing roles but the role isn't yet determined
            roleChoices.push({ name: 'TBD', value: null });
            inquirer.prompt([
                {
                    message: 'What is the name of the employee you would like to update?',
                    type: 'list',
                    name: 'employee_id',
                    choices: empChoices,
                },
                {
                    message: 'What would you like to update their role to?',
                    type: 'list',
                    name: 'role_id',
                    choices: roleChoices,
                }
            ]).then((answerObj) => {
                const sql = `UPDATE employee SET role_id = ${answerObj.role_id} WHERE id = ${answerObj.employee_id}`;
                db.query(sql, function (err) {
                    if (err) throw err;
                    // call viewEmp() function to show the updated employee list
                    viewEmp();
                });
            });
        })
    })
};

function updateEmpMan() {
    // query to allow users to select employee & manager in inquirer.prompt
    const sql = 'SELECT employee.id, employee.first_name AS first, employee.last_name AS last FROM employee';
    db.query(sql, function (err, results) {
        if (err) throw err;
        const empChoices = [];
        // adding each result name & value to the empty array
        for (i = 0; i < results.length; i++) {
            empChoices.push({
                name: results[i].first + ' ' + results[i].last,
                value: results[i].id,
            })
        }
        // option added in case the employee is becoming a manager or their manager hasn't yet been assigned
        empChoices.push({ name: 'NULL', value: null });
        inquirer.prompt([
            {
                message: 'What employee you would like to update?',
                type: 'list',
                name: 'employee_id',
                choices: empChoices,
            },
            {
                message: 'Who would you like to update their manager to?',
                type: 'list',
                name: 'manager_id',
                choices: empChoices,
            }
        ]).then((answerObj) => {
            const sql = `UPDATE employee SET manager_id = ${answerObj.manager_id} WHERE id = ${answerObj.employee_id}`;
            db.query(sql, function (err) {
                if (err) throw err;
                // call viewEmp() function to show the updated employee list
                viewEmp();
            });
        });
    })
};

// DELETE 
function deleteEmp() {
    // query to allow users to select employee in inquirer.prompt
    const sqlEmp = 'SELECT employee.id, employee.first_name AS first, employee.last_name AS last FROM employee';
    db.query(sqlEmp, function (err, results) {
        if (err) throw err;
        const empChoices = [];
        // adding each result name & value to the empty array
        for (i = 0; i < results.length; i++) {
            empChoices.push({
                name: results[i].first + ' ' + results[i].last,
                value: results[i].id,
            })
        }
        inquirer.prompt([
            {
                message: 'Which employee would you like to delete?',
                type: 'list',
                name: 'employee_id',
                choices: empChoices,
            },
        ]).then((answerObj) => {
            const sql = `SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id FROM employee WHERE id = ${answerObj.employee_id}`
            db.query(sql, function (err, results) {
                if (err) throw err;
                console.log('\n');
                console.log("===========================================================================");
                console.log(`The employee you have deleted is ${results[0].first_name} ${results[0].last_name}.`);
                console.log("===========================================================================");
                console.log('\n');

                const sql = `DELETE FROM employee WHERE employee.id = ${answerObj.employee_id}`;
                db.query(sql, function (err) {
                    if (err) throw err;
                    // call vieEmp() function to show the updated employee list
                    viewEmp();
                });
            });
        })
    })
};

app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
