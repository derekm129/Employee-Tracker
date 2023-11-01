const inquirer = require('inquirer');

const updateRole = (db, init) => {
    db.query('SELECT *  FROM employees', (err, employees) => {
        if(err) {
            console.error(err);
            init();
            return;
        }

        const chooseEmployee = employees.map((employee) => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id,
        }));

        inquirer.prompt([
            {
                name: 'employee_id',
                type: 'list',
                message: 'Select an employee whose role you want to update:',
                choices: chooseEmployee,
            },
            {
                name: 'newRole_id',
                type: 'list',
                message: 'Select a new role for the employee:',
                choices: 
                [
                    {name:'Scientist', value: 1},
                    {name: 'Computer Programmer', value: 2},
                    {name:'Engineer', value: 3},
                    {name: 'Accountant', value: 4},
                    {name: 'Marketing Analyst', value: 5}, 
                    {name: 'Recruiter', value: 6},
                ],
            },
        ]).then((answers) => {
            const {employee_id, newRole_id} = answers;

            db.query(
                'UPDATE employees SET role_id = ? WHERE id = ?',
                [newRole_id, employee_id],
                (err, result) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log('Employee role updated.')
                    }
                    init();
                }
            );
        });
    });
};

module.exports = updateRole;