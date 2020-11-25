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
    database: "employee_tracker"
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


function viewAll() {
    //write a function to view all employees
    connection.query("SELECT * FROM response.employee.id, response.employee.first_name, response.employee.last_name, response.employee.role_id", function (err, response) {
        if (err) throw err;
        var employeeArray = [];
        for (var i = 0; i < response.length; i++) {
            employeeArray.push(response[i]);
        }
        return employeeArray;
    })

}

function viewDept() {
    // write a function to list each department
    connection.query("SELECT * FROM department", function (err, dept) {
        if (err) throw err;
        // once you have the items, prompt the user for which they'd like to bid on
        inquirer
            .prompt([
                {
                    name: "dept",
                    type: "rawlist",
                    choices: function () {
                        var deptArray = [];
                        for (var i = 0; i < dept.length; i++) {
                            deptArray.push(dept[i]);
                        }
                        return deptArray;
                    },
                    message: "Which department would you like to view?"
                },
            ])
            .then(function (answer) {
                // when finished prompting, display all employees in that department
                connection.query("SELECT * FROM employee", function (err, employees) {
                    if (err) throw err;
                    var employeeArray = [];
                    for (var i = 0; i < employees.length; i++) {
                        employeeArray.push(employees[i]);
                    }
                    return employeeArray;
                })
            })
    })
}