USE company_db;

INSERT INTO department (dep_name)
VALUES  ('HR'),
        ('SALES'),
        ('ENGINEERING'),
        ('FINANCE'),
        ('LEGAL');

INSERT INTO role (department_id, title, salary)
VALUES  (1, 'RECRUITER', 90000),
        (2, 'SALES LEAD', 100000),
        (2, 'SALESPERSON', 80000),
        (3, 'SOFTWARE ENGINEER', 120000),
        (4, 'ACCOUNT MANAGER', 160000),
        (4, 'ACCOUNTANT', 125000),
        (5, 'LAWYER', 190000);

INSERT INTO employee (role_id, first_name, last_name, manager_id)
VALUES  (1, 'ANA', 'ALBERTS', null),
        (2, 'BILLIE', 'BROWN', null),
        (3, 'CARL', 'CAMERON', 2),
        (3, 'DENISE', 'DEMITRI', 2),
        (4, 'ELIZABETH', 'ESCOFFIER', null),
        (5, 'FRANK', 'FREDRICK', null),
        (6, 'GEORGIA', 'GIUSEPPE', 6),
        (6, 'HARIET', 'HOFFMAN', 6),
        (7, 'INGRID', 'IDOL', null);