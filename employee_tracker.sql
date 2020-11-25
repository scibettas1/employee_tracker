DROP DATABASE IF EXISTS employee_trackerDB;
CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE employee(
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT,
  PRIMARY KEY (id)
);
CREATE TABLE role(
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL,
  department_id INT NOT NULL,
  PRIMARY KEY (id)
);
CREATE TABLE department(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);
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


INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("John", "Doe", 3, 7),
("Mike", "Chan", 1, 8),
("Ashley","Rodriguez",null,4),
("Kevin", "Tupik", 3, 9),
("Malia", "Brown", null, 6),
("Sarah", "Lourd", null, 5),
("Christian", "Eckenrode", 2, 4);