INSERT INTO departments (department_name)
VALUES 
    ('Technology'),
    ('Finances'),
    ('Marketing'),
    ('Human Resources');

INSERT INTO roles (title, salary, department_id)
VALUES
    ('Scientist', 60000, 1),
    ('Computer Programmer', 75000, 2),
    ('Engineer', 40000, 3),
    ('Accountant',55000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('Arnold', 'Park', 1, 4),
    ('Norman', 'Gomez', 2, 2),
    ('Alia', 'Carter', 3, 1),
    ('Elisabeth', 'Jones', 4, 3);