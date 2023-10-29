const inquirer = require('inquirer');
const mysql = require('mysql2');
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: 'password1234',
    database: 'employees_db',
});


db.connect(err => {
    if (err) {
      throw err;
    }
    console.log("MySQL2 Connected");
  });
