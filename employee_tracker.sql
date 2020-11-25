DROP DATABASE IF EXISTS employee_tracker;
CREATE DATABASE employee_tracker;

USE employee_tracker;

CREATE TABLE employee(
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
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
insert into department (name) 
values ("IT"), ("Marketing"), ("Finanace");

insert into role (title, salary, department_id) 
values ("director", 100000, 2), ("VP", 140000, 2), ("associate", 30000, 2);

insert into employee (first_name, last_name, role_id) 
values ("John", "Doe", 1), ("Mike", "Chan", 1), ("Ashley", "Rodriguez", 2);