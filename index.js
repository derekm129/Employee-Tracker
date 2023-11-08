const inquirer = require('inquirer');
const mysql = require('mysql2');
// Add a role
const addRole = require('./lib/role');
// Add an employee
const addEmployee = require('./lib/employee');
// Update employee role
const updateRole = require('./lib/update');
// Create connection 
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password1234',
    database: 'employees_db',
});


db.connect(err => {
    if (err) {
      throw err;
    }
    console.log("MySQL2 Connected");
    init();
  });

//   Initial prompt
  const init = () => {
    inquirer.prompt([
        {
            name: 'options',
            type: 'list',
            message: 'Please choose from the following options:',
            choices: 
            [
                'View all departments', 
                'View all roles', 
                'View all employees', 
                'Add a department', 
                'Add a role', 
                'Add an employee', 
                'Update an employee role'
            ]
        }
    ]).then(answer => {
        switch  (answer.options) {
            case 'View all departments':
                viewDepartments();
                break;
            case 'View all roles':
                viewRoles();
                break;
            case 'View all employees':
                viewEmployees();
                break;
            case 'Add a department':
                addDepartment();
                break;  
            case 'Add a role':
                addRole(db, init);
                break; 
            case 'Add an employee':
                addEmployee(db, init);
                break; 
            case 'Update an employee role':
                updateRole(db, init);
                break;
        }
    });
  };

// View departments, roles, or employees
const viewDepartments = () => {
    const query = 'SELECT * FROM departments';
    db.query(query, (err, results) => {
        if (err) {
            throw err;
        }
        console.table(results); // Display the result in a tabular format
        init();
    });
};

const viewRoles = () => {
    const query = `SELECT roles.title, roles.salary, departments.department_name AS department
    FROM roles 
    LEFT JOIN departments
    ON roles.department_id = departments.id;`;

    db.query(query, (err, results) => {
        if (err) {
            throw err;
        }
        console.table(results);
        init();
    });
};

const viewEmployees = () => {
    const query = `SELECT e.id, e.first_name, e.last_name, roles.title, departments.department_name AS department, roles.salary, CONCAT(m.first_name, " ", m.last_name) AS manager 
    FROM employees e 
    LEFT JOIN employees m ON e.manager_id = m.id 
    JOIN roles ON e.role_id = roles.id 
    JOIN departments ON roles.department_id = departments.id;`;
    db.query(query, (err, results) => {
        if (err) {
            throw err;
        }
        console.table(results);
        init();
    });
};
// Add department
const addDepartment = () => {
    inquirer.prompt([
        {
            name: 'department_name',
            type: 'input',
            message: 'Enter the department name:',
        },
    ]).then(answer => {
        const query = 'INSERT INTO departments (department_name) VALUES (?)';
        db.query(query, [answer.department_name], (err, results) => {
            if (err) {
                console.error(err);
            } else {
                console.log(`Added department: ${answer.department_name}`);
            }
            init();
        });
    });
};
