USE employee_tracker;

INSERT INTO department (name)
VALUE ("Sales"),
("Engineering"),
("Finance"),
("Legal");

INSERT INTO role (title, salary, department_id)
VALUE ("Lead Engineer", 150000, 2),
("Legal Team Lead", 250000, 4),
("Accountant", 125000, 3),
("Sales Lead", 100000, 1),
("Salesperson", 80000, 1),
("Software Engineer", 120000, 2),
("Lawyer", 190000, 4);

SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) 
AS Manager FROM employee INNER JOIN role on role.id = employee.role_id 
INNER JOIN department on department.id = role.department_id 
left join employee e on employee.manager_id = e.id;

SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) 
AS Manager FROM employee INNER JOIN role on role.id = employee.role_id 
INNER JOIN department on department.id = role.department_id 
left join employee e on employee.manager_id = e.id
WHERE name = 'Sales';

SELECT role.id, role.title
FROM role
INNER JOIN employee ON role.id = employee.role_id;

UPDATE employee SET WHERE ?

DELETE FROM employee WHERE id = 6


"INSERT INTO emolyee SET ?" , employee


-- Find all emloyees, join with roles and departemnts to display the roles, salaries. departs and there managers

-- Find all employees with the given emloyee id

-- create a new employee

-- remove an employtee

-- update an employee role

start with basic iquirer prompts (the them printed to CLI)

