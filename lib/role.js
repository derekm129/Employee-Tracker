const inquirer = require('inquirer');

const addRole = (db, init) => {
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
            validate: function (value) {
                const isValid = !isNaN(value);
                return isValid || 'Please enter a valid salary (a number).';
            },
        },
        {
            name: 'department_id',
            type: 'list',
            message: 'Enter the department:',
            choices: [
                { name: 'Technology', value: 1 },
                { name: 'Finance', value: 2 },
                { name: 'Marketing', value: 3 },
                { name: 'Human Resources', value: 4 },
            ],
        },
    ]).then(answer => {
        const query = 'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)';
        
        db.query(query, [answer.title, answer.salary, answer.department_id], (err, results) => {
            if (err) {
                console.error("Error inserting role:", err);
            } else {
                console.log(`Added role: ${answer.title}`);
            }
            init();
        });
    });
};

module.exports = addRole;