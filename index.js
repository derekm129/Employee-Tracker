const inquirer = require('inquirer');
const mysql = require('mysql2');
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
        }
    });
  };

const viewDepartments = () => {
    const query = 'SELECT DISTINCT * FROM departments';
    db.query(query, (err, results) => {
        if (err) {
            throw err;
        }
        console.table(results);
        init();
    });
};

const viewRoles = () => {
    const query = 'SELECT DISTINCT * FROM roles';
    db.query(query, (err, results) => {
        if (err) {
            throw err;
        }
        console.table(results);
        init();
    });
};

const viewEmployees = () => {
    const query = 'SELECT DISTINCT * FROM employees';
    db.query(query, (err, results) => {
        if (err) {
            throw err;
        }
        console.table(results);
        init();
    });
};