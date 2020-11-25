USE employee_tracker

INSERT INTO role
    (title, salary. department_id)
VALUES
('John', 'Doe', 10000000, 1),
("Sam", 'idk', 100000, 3)

"SELECT employee.id, emloyee.first_name. emloyee.last_name"


"SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) 
AS Manager FROM employee INNER JOIN role on role.id = employee.role_id 
INNER JOIN department on department.id = role.department_id 
WHERE department.name = 'Sales' 
left join employee e on employee.manager_id = e.id;"

"SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) 
FROM employee As a
INNER JOIN role on role.id = employee.role_id 
INNER JOIN department As b on department.id = role.department_id 
WHERE b.name = 'Sales';"





"INSERT INTO emolyee SET ?" , employee


-- Find all emloyees, join with roles and departemnts to display the roles, salaries. departs and there managers

-- Find all employees with the given emloyee id

-- create a new employee

-- remove an employtee

-- update an employee role

start with basic iquirer prompts (the them printed to CLI)

