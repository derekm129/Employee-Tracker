const inquirer = require('inquirer');
const mysql = require('mysql2');
// Create connection with promise support
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password1234',
    database: 'employees_db',
}).promise();


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
            choices: [
                'View all departments', 
                'View all roles', 
                'View all employees', 
                'Add a department', 
                'Add a role', 
                'Add an employee', 
                'Update an employee role']
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
        }
    });
  };

// View departments, roles, or employees
const viewDepartments = () => {
    const query = 'SELECT * FROM departments';
    db.promise().query(query)
        .then(([rows]) => {
            console.table(rows);
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
            init();
        });
};

const viewRoles = () => {
    const query = 'SELECT * FROM roles';
    db.promise().query(query)
        .then(([rows]) => {
            console.table(rows);
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
            init();
        });
};

const viewEmployees = () => {
    const query = 'SELECT * FROM employees';
    db.promise().query(query)
        .then(([rows]) => {
            console.table(rows);
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
            init();
        });
};

// Add department
const addDepartment = async () => {
    try {
        const answer = await inquirer.prompt([
            {
                name: 'department_name',
                type: 'input',
                message: 'Enter the department name:',
            },
        ]);
        const query = 'INSERT INTO departments (department_name) VALUES (?)';
        await db.query(query, [answer.department_name]);

        console.log(`Added department: ${answer.department_name}`);
    } catch (err) {
        console.error(err);
    }
    init();
};