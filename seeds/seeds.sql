USE company_db;

INSERT INTO department (dep_name)
VALUES  ("HR"),
        ("SALES"),
        ("ENGINEERING"),
        ("FINANCE"),
        ("LEGAL");

INSERT INTO role (department_id, title, salary)
VALUES  (1, "Recruiter", 90000), //1
        (2, "Sales Lead", 100000), //2
        (2, "Salesperson", 80000), //3
        (3, "Software Engineer", 120000), //4
        (4, "Account Manager", 160000), //5
        (4, "Accountant", 125000), //6
        (5, "Lawyer", 190000); //7

INSERT INTO employee (role_id, first_name, last_name, manager_id)
VALUES  (1, 'Ana', 'Alberts', 6),
        (2, 'Billie', 'Brown', null), //2
        (3, 'Carl', 'Cameron', 2),
        (3, 'Denise', 'Demitri', 2),
        (4, 'Elizabeth', 'Escoffier', null), //5
        (5, 'Frank', 'Fredrick', null), //6
        (6, 'Georgia', 'Giuseppe', 6),
        (6, 'Hariet', 'Hoffman', 6),
        (7, 'Ingrid', 'Idol', null); //9