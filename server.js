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

//--------------------------------------------------------------------------------------------------
//               Initial function that prompts the user for what action they should take
//--------------------------------------------------------------------------------------------------
function start() {
    console.clear();
    console.log("_____________________________________________")
    console.log("|   ___ __ __ ___  |     ___      ___ ___   |")
    console.log("|   |__ | | | |__| |    |   | | / |__ |__   |")
    console.log("|   |__ |   | |    |___ |___| |/  |__ |__   |")
    console.log("|                             /             |")
    console.log("|      ___ ___    /|  ___ | /  ___ ___      |")
    console.log("|       |  |__|  /_| /    |/_  |__ |__|     |")
    console.log("|       |  |  | /  | |___ |  | |__ |  |     |")
    console.log("|___________________________________________|")
    console.log("                                             ")
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: ["View All Employees", "View All Employees by Department", "Add Employee", "Remove Employee", "Update Employee Role", "Exit"]
        }).then(function (answer) {
            if (answer.action === "View All Employees") {
                viewAll();
            }
            else if (answer.action === "View All Employees by Department") {
                viewByDept();
            }
            else if (answer.action === "Add Employee") {
                addEmployee();
            }
            else if (answer.action === "Remove Employee") {
                removeEmployee();
            }
            else if (answer.action === "Update Employee Role") {
                updateRole();
            }
            //Part of the Bonus. Saving this for the end.
            /* else if (answer.action === "Udate Employee Manager") {
                updateManger();
            } */ else {
                connection.end();
            }
        });
}
//--------------------------------------------------------------------------------------------------
//                                     Return to Main Menu or Exit
//--------------------------------------------------------------------------------------------------
function menu() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do now?",
            choices: ["Main Menu", "Exit"]
        }).then(function (answer) {
            if (answer.action === "Main Menu") {
                start();
            }
            else {
                connection.end();
            }
        });
}


//--------------------------------------------------------------------------------------------------
//               View all Employees and Their Role, Salary, Department, and Manager
//--------------------------------------------------------------------------------------------------
function viewAll() {
    //when I watched our class recordings I realized we did this with the book authors on 11/17/20
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;",
        function (err, res) {
            if (err) throw err
            console.table(res)
            menu()
        })
}
//--------------------------------------------------------------------------------------------------
//                             View employees in a selected department
//--------------------------------------------------------------------------------------------------
function viewByDept() {
    inquirer
        .prompt([
            {
                name: "dept",
                type: "list",
                message: "Which department would you like to view?",
                choices: ["Sales", "Engineering", "Finance", "Legal", "Return to Main Menu", "Exit"]
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
            }
            else if (answer.dept === "Return to Main Menu") {
                start();
            } else {
                connection.end();
            }
        })
}
function salesDept() {
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id WHERE name = 'Sales';",
        function (err, res) {
            if (err) throw err
            console.table(res)
            menu()
        })
}
function engDept() {
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id WHERE name = 'Engineering';",
        function (err, res) {
            if (err) throw err
            console.table(res)
            menu()
        })
}
function finDept() {
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id WHERE name = 'Finance';",
        function (err, res) {
            if (err) throw err
            console.table(res)
            menu()
        })
}
function legalDept() {
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id WHERE name = 'Legal';",
        function (err, res) {
            if (err) throw err
            console.table(res)
            menu()
        })
}
//--------------------------------------------------------------------------------------------------
//                                        Add New Employee
//--------------------------------------------------------------------------------------------------
function addEmployee() {
    inquirer
        .prompt([
            {
                name: "firstName",
                type: "input",
                message: "Please type the Employee's first name."
            },
            {
                name: "lastName",
                type: "input",
                message: "Please type the Employee's last name."
            },
            {
                name: "role",
                type: "list",
                message: "What is the Employee's role?",
                choices: roleChoices()
            },
            {
                name: "manager",
                type: "list",
                message: "Who is the Employee's manager?",
                choices: employeeChoices()
            }
        ])
        .then(function (answer) {
            var roleId = roleArray.indexOf(answer.role) + 1;
            //all employees are listed in the employeeArray in order by id
            //all ids are listed in the employeeIdArray in numerical order
            //so the employees in the first array will always have the same index as their id in the second array
            //this is how we grab their employee id
            var employeeName = employeeArray.indexOf(answer.manager);
            var i = employeeName;
            var employeeId = employeeIdArray[i];
            //console.log(roleArray)
            //console.log(roleId)
            //console.log(employeeArray)
            //console.log(employeeName)
            //console.log(employeeId)
            connection.query("INSERT INTO employee SET ?",
                {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: roleId,
                    manager_id: employeeId
                },
                function (err) {
                    if (err) throw err;
                    console.log("Your Employee was added successfully!");
                    // return to main menu
                    menu();
                }
            );
        });
}
//--------------------------------------------------------------------------------------------------
//                                     Update Employee Role
//--------------------------------------------------------------------------------------------------
function updateRole() {
    var employeeIdArray = [];
    var employeeArray = [];
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: "selectEmployee",
                    type: "list",
                    message: "Please select an Employee.",
                    choices:
                        function () {
                            for (var i = 0; i < res.length; i++) {
                                employeeArray.push(res[i].first_name + " " + res[i].last_name);
                                employeeIdArray.push(res[i].id);
                            }
                            return employeeArray;
                        }
                },
                {
                    name: "role",
                    type: "list",
                    message: "What is the Employee's new role?",
                    choices: roleChoices()
                }
            ])
            .then(function (answer) {
                var roleId = roleArray.indexOf(answer.role) + 1;
                //console.log(answer.role)
                //all employees are listed in the employeeArray in order by id
                //all ids are listed in the employeeIdArray in numerical order
                //so the employees in the first array will always have the same index as their id in the second array
                //this is how we grab their employee id
                var employeeName = employeeArray.indexOf(answer.selectEmployee);
                var i = employeeName;
                var employeeId = employeeIdArray[i];
                //console.log(roleArray);
                //console.log(roleId);
                //console.log(employeeArray);
                //console.log(employeeIdArray);
                //console.log(employeeName);
                //console.log(employeeId);
                connection.query("UPDATE employee SET ? WHERE ?", //there is a sytax error here but IDK what it is
                    [
                        {
                            role_id: roleId
                        },
                        {
                            id: employeeId
                        }
                    ],
                    function (err) {
                        if (err) throw err;
                        console.log("Your Employee was updated successfully!");
                        menu();
                    }
                );
            })
    });
}
//--------------------------------------------------------------------------------------------------
//                                      Remove Employee
//--------------------------------------------------------------------------------------------------
function removeEmployee() {
    var employeeIdArray = [];
    var employeeArray = [];
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: "selectEmployee",
                    type: "list",
                    message: "Please select an Employee.",
                    choices:
                        function () {
                            for (var i = 0; i < res.length; i++) {
                                employeeArray.push(res[i].first_name + " " + res[i].last_name);
                                employeeIdArray.push(res[i].id);
                            }
                            return employeeArray;
                        }
                }
            ])
            .then(function (answer) {
                var employeeName = employeeArray.indexOf(answer.selectEmployee);
                var i = employeeName;
                var employeeId = employeeIdArray[i];
                //console.log(employeeArray);
                //console.log(employeeIdArray);
                //console.log(employeeName);
                //console.log(employeeId);
                connection.query("DELETE FROM employee WHERE ?",
                    {
                        id: employeeId
                    },
                    function (err) {
                        if (err) throw err;
                        console.log("Your Employee was removed successfully!");
                        menu();
                    })
            })
    });
}
//--------------------------------------------------------------------------------------------------
//                   Additional Arrays and Functions Used Throughout the Code
//--------------------------------------------------------------------------------------------------

var roleArray = [];
function roleChoices() {
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            roleArray.push(res[i].title);
        }
    })
    return roleArray;
}
// This function was originally written with the intent to be called multiple times
// However, it only seems to function the first time called (in the addEmployee function).
// So, this code is duplicated whereever it couldn't be called.
var employeeArray = [];
var employeeIdArray = [];
function employeeChoices() {
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            employeeArray.push(res[i].first_name + " " + res[i].last_name);
            employeeIdArray.push(res[i].id);
        }
    })
    return employeeArray;
}
