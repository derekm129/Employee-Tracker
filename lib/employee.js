const inquirer = require('inquirer');

const addEmployee = (db, init) => {
    inquirer.prompt([
        {
            name: 'first_name',
            type: 'input',
            message: 'Enter the first name of the employee:',
        },
        {
            name: 'last_name',
            type: 'input',
            message: 'Enter the last name of the employee:',
        },
        {
            name: 'role_id',
            type: 'list',
            message: 'Enter the role:',
            choices: 
            [
                'Scientist',
                'Computer Programmer',
                'Engineer',
                'Accountant',
                'Marketing Analyst',
                'Recruiter',
            ]
        },

        {
            name: 'manager_id',
            type: 'list',
            message: 'Enter the manager of the employee:',
            choices: 
            [
              'Eugene Krabs',
              'Gustavo Fring',
              'Montgomery Burns',
              'None',
            ]
        },
    ]).then(answer => {
        const roleIdMap = {
            'Scientist': 1, 
            'Computer Programmer': 2, 
            'Engineer': 3, 
            'Accountant': 4,
            'Marketing Analyst': 5,
            'Recruiter': 6,
        };

        const managerIdMap = {
            'Eugene Krabs': 1,
            'Gustavo Fring': 2,
        };

        const roleId = roleIdMap[answer.role_id];
        const managerId = managerIdMap[answer.manager_id];

        const query = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
        db.query(query, [answer.first_name, answer.last_name, roleId, managerId], (err, results) => {
            if (err) {
                console.error(err);
            } else {
                console.log(`Added employee: ${answer.first_name} ${answer.last_name}`);
            }
            init();
        });
    });
};

module.exports = addEmployee;