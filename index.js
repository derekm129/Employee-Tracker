const inquirer = require('inquirer');
const mysql = require('mysql2');
// Create connection with promise support
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
                addRole();
                break; 
            case 'Add an employee':
                addEmployee();
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
    const query = 'SELECT * FROM roles';
    db.query(query, (err, results) => {
        if (err) {
            throw err;
        }
        console.table(results);
        init();
    });
};

const viewEmployees = () => {
    const query = 'SELECT * FROM employees';
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

// Add a role
const addRole = () => {
    inquirer.prompt([
        {
            name: 'title',
            type: 'input',
            message: 'Enter the role name:',
        },
        {
            name: 'salary',
            type: 'input',
            message: 'Enter the role salary:',
        },
        {
            name: 'department_id',
            type: 'list',
            message: 'Enter the department:',
            choices: 
            [
                'Technology', 
                'Finance', 
                'Marketing', 
                'Human Resources'
            ]
        },
    ]).then(answer => {
        const departmentIdMap = {
            'Technology': 1, 
            'Finance': 2, 
            'Marketing': 3, 
            'Human Resources': 4,
        };

        const departmentId = departmentIdMap[answer.department_id];

        const query = 'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)';
        db.query(query, [answer.title, answer.salary, departmentId], (err, results) => {
            if (err) {
                console.error(err);
            } else {
                console.log(`Added role: ${answer.title}`);
            }
            init();
        });
    });
};
// Add employee
const addEmployee = () => {
    inquirer.prompt([
        {
            name: 'title',
            type: 'input',
            message: 'Enter the role name:',
        },
        {
            name: 'salary',
            type: 'input',
            message: 'Enter the role salary:',
        },
        {
            name: 'department_id',
            type: 'list',
            message: 'Enter the department:',
            choices: 
            [
                'Technology', 
                'Finance', 
                'Marketing', 
                'Human Resources'
            ]
        },
    ]).then(answer => {
        const departmentIdMap = {
            'Technology': 1, 
            'Finance': 2, 
            'Marketing': 3, 
            'Human Resources': 4,
        };

        const departmentId = departmentIdMap[answer.department_id];

        const query = 'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)';
        db.query(query, [answer.title, answer.salary, departmentId], (err, results) => {
            if (err) {
                console.error(err);
            } else {
                console.log(`Added role: ${answer.title}`);
            }
            init();
        });
    });
};