-- from mini project
-- SELECT department.dep_name AS company, role.title
-- FROM role
-- LEFT JOIN department
-- ON role.department_id = department.id
-- ORDER BY department.dep_name ASC;

-- from main
-- Find all employees, join with roles and departments to display their roles, salaries, departments, and managers
--   findAllEmployees() {
--     return this.db.promise().query(
--       "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
--     );
--   }


--   // Find all roles, join with departments to display the department name
--   findAllRoles() {
--     return this.db.promise().query(
--       "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
--     );
--   }