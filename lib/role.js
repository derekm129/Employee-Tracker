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

module.exports = addRole;