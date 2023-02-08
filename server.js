const express = require('express');
const inquirer = require('inquirer');
const db = require('./config/connection')

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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
        }
    })

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
    inquirer.prompt([
        {
            message: 'What is the title of the role?',
            type: 'input',
            name: 'title',
        }
    ]).then((answerObj) => {
        if (answerObj.title == '') {
            res.json({
                message: 'No role title provided'
            });
        } else {
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
        }
    })
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
        }
    ]).then((answerObj) => {
        if (answerObj.first_name == '' && answerObj.last_name == '') {
            res.json({
                message: 'No employee name provided'
            });
        } else {
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
        }
    })
    console.table(data)
    console.log('\n')
    start()
};






// Close the connection
// connection.end();


// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});