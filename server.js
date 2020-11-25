var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "employee_trackerDB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

// function which prompts the user for what action they should take
function start() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: ["View All Employees", "View All Employees by Department", "Add Employee", "Remove Employee", "Udate Emplotyee Role", "Udate Employee Manager"]
        }).then(function (answer) {
            // based on their answer, either call the bid or the post functions
            if (answer.action === "View All Employees") {
                viewAll();
            }
            else if (answer.action === "View All Employees by Department") {
                viewByDept();
            }
            else if (answer.action === "View All by Manager") {
                viewByManger();
            }
            else if (answer.action === "Add Employee") {
                addEmployee();
            }
            else if (answer.action === "Remove Employee") {
                removeEmployee();
            }
            else if (answer.action === "Udate Employee Role") {
                updateRole();
            }
            else if (answer.action === "Udate Employee Manager") {
                updateManger();
            } else {
                connection.end();
            }
        });
}

//View all Employees and Their Role, Salary, Department, and Manager
function viewAll() {
    connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;",
        function (err, res) {
            if (err) throw err
            console.table(res)
            start()
        })
}


function viewByDept() {
    inquirer
        .prompt([
            {
                name: "dept",
                type: "list",
                message: "Which department would you like to view?",
                choices: ["Sales", "Engineering", "Finance", "Legal"]
            },
        ])
        .then(function (answer) {
            // when finished prompting, display all employees in that department
            if (answer.dept === "Sales") {
                salesDept();
            }
            else if (answer.dept === "Engineering") {
                engDept();
            }
            else if (answer.dept === "Finance") {
                finDept();
            }
            else if (answer.dept === "Legal") {
                legalDept();
            } else {
                connection.end();
            }
        })
    }
    function salesDept(){
     connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id WHERE name = 'Sales';",
        function (err, res) {
            if (err) throw err
            console.table(res)
            start()
        })
    }
    function engDept(){
        connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id WHERE name = 'Engineering';",
           function (err, res) {
               if (err) throw err
               console.table(res)
               start()
           })
       }
       function finDept(){
        connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id WHERE name = 'Finance';",
           function (err, res) {
               if (err) throw err
               console.table(res)
               start()
           })
       }
       function legalDept(){
        connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id WHERE name = 'Legal';",
           function (err, res) {
               if (err) throw err
               console.table(res)
               start()
           })
       }