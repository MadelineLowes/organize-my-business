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

// called from connection.js once connection is established
function start() {
    inquirer.prompt([
        {
            message: 'What would you like to do?',
            type: 'list',
            name: "choice",
            choices: ["View all departments", "View all roles", "View all employees", "View employees by manager", "View employees by department", "Add department", "Add role", "Add employee", "Update employee's role", "Update employee's manager", "Quit"]
        }
    ]).then((answerObj) => {
        switch (answerObj.choice) {
            case "View all departments":
                viewDept();
                break;
            // case "Remove department":
            //     removeDept();
            //     break;
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
            // case "Remove role":
            //     removeRole();
            //     break;
            case "Update employee's role":
                updateEmpRole();
                break;
            case "Update employee's manager":
                updateEmpMan();
                break
            // case "Remove employee":
            //     removeEmp();
            //     break;
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
    inquirer.prompt([
        {
            message: 'What is the ID of the manager whose team you would like to view?',
            type: 'input',
            name: 'manager_id',
        }
    ]).then((answerObj) => {
        const sql = `SELECT employee.id, employee.first_name AS first, employee.last_name AS last, role.title, department.dep_name AS department, role.salary, manager.first_name AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id WHERE manager.id = ${answerObj.manager_id}`;
        db.query(sql, function (err, results) {
            console.log(results);
            if (err) throw err;
            console.log("===========================================================================");
            console.log('\n');
            console.log(`${results[0].manager}'S TEAM `);
            console.table(results);
            console.log("===========================================================================");
            console.log('\n');
            start();
        });
    })
};

function viewEmpByDept() {
    inquirer.prompt([
        {
            message: 'What is the ID of the department whose team you would like to view?',
            type: 'input',
            name: 'department_id',
        }
    ]).then((answerObj) => {
        const sql = `SELECT employee.id, employee.first_name AS first, employee.last_name AS last, role.title, department.dep_name AS department, role.salary, manager.first_name AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id WHERE department.id = ${answerObj.department_id}`;
        db.query(sql, function (err, results) {
            console.log(results);
            if (err) throw err;
            console.log("===========================================================================");
            console.log('\n');
            console.log(`${results[0].department}'S TEAM `);
            console.table(results);
            console.log("===========================================================================");
            console.log('\n');
            start();
        });
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
            res.json({
                message: 'No department name provided'
            });
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
            message: 'What is the ID of the department that this role belongs to?',
            type: 'input',
            name: 'department_id',
        }
    ]).then((answerObj) => {
        if (answerObj.title == '') {
            res.json({
                message: 'No role title provided'
            });
            addRole();
        } else if (answerObj.salary == '') {
            res.json({
                message: 'No salary provided'
            });
            addRole();
        } else if (answerObj.department_id == '') {
            res.json({
                message: 'No department ID provided'
            });
            addRole();
        } else {
            const sql = `INSERT INTO role (department_id, title, salary) VALUES ROW (${answerObj.department_id}, '${answerObj.title}', ${answerObj.salary})`;
            db.query(sql, function (err) {
                if (err) throw err;
                viewRole();
            });
        };
    });
};

function addEmp() {
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
            message: 'What is the ID of this employees title/role?',
            type: 'input', //could i make this a list and make the choices the available role names?
            name: 'role_id',
        },
        {
            message: 'Who is this employees manager?',
            type: 'input',  //could i make this a list and make the choices the available role names?
            name: 'manager_id',
        },
    ]).then((answerObj) => {
        if (answerObj.first_name == '') {
            res.json({
                message: 'No first name provided'
            });
            addEmp();
        } else if (answerObj.last_name == '') {
            res.json({
                message: 'No last name provided'
            });
            addEmp();
        } else if (answerObj.role_id == '') {
            const sql = `INSERT INTO employee (role_id, first_name, last_name, manager_id) VALUES ROW (8, '${answerObj.first_name}', '${answerObj.last_name}', null)`;
            db.query(sql, function (err) {
                if (err) throw err;
                viewEmp();
            });
        } else if (answerObj.manager_id == '') {
            const sql = `INSERT INTO employee (role_id, first_name, last_name, manager_id) VALUES ROW (${answerObj.role_id}, '${answerObj.first_name}', '${answerObj.last_name}', null)`;
            db.query(sql, function (err) {
                if (err) throw err;
                viewEmp();
            });
        } else {
            const sql = `INSERT INTO employee (role_id, first_name, last_name, manager_id) VALUES ROW (${answerObj.role_id}, '${answerObj.first_name}', '${answerObj.last_name}', ${answerObj.manager_id})`;
            db.query(sql, function (err) {
                if (err) throw err;
                viewEmp();
            });
        }
    });
};

// UPDATE
function updateEmpRole() {
    inquirer.prompt([
        {
            message: 'What is the ID of the employee you would like to update?',
            type: 'input',
            name: 'employee_id',
        },
        {
            message: 'What is the ID that you would like to update their role to?',
            type: 'input',
            name: 'role_id',
        }
    ]).then((answerObj) => {
        const sql = `SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id FROM employee WHERE id = ${answerObj.employee_id}`
        db.query(sql, function (err, results) {
            if (err) throw err;
            console.log(results)
            console.log(results[0].id)
            console.log(`The employee you have selected is ${results[0].first_name} ${results[0].last_name}.`);

            const sql = `UPDATE employee SET role_id = ${answerObj.role_id} WHERE id = ${answerObj.employee_id}`;
            db.query(sql, function (err) {
                if (err) throw err;
                viewEmp();
            });
        });
    })
}

function updateEmpMan() {
    inquirer.prompt([
        {
            message: 'What is the ID of the employee you would like to update?',
            type: 'input',
            name: 'employee_id',
        },
        {
            message: 'What is the ID of the manager that you would like to update to?',
            type: 'input',
            name: 'manager_id',
        }
    ]).then((answerObj) => {
        const sql = `SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id FROM employee WHERE id = ${answerObj.employee_id}`
        db.query(sql, function (err, results) {
            if (err) throw err;
            console.log(`The employee you have selected is ${results[0].first_name} ${results[0].last_name}.`);
            if (answerObj.manager_id == '') {
                const sql = `UPDATE employee SET manager_id = null WHERE id = ${answerObj.employee_id}`;
                db.query(sql, function (err) {
                    if (err) throw err;
                    viewEmp();
                });
            } else {
                const sql = `UPDATE employee SET manager_id = ${answerObj.manager_id} WHERE id = ${answerObj.employee_id}`;
                db.query(sql, function (err) {
                    if (err) throw err;
                    viewEmp();
                });
            }
        });
    })
};


app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));