const fs = require('fs');
const inq = require('inquirer');
const { setFlagsFromString } = require('v8');

const questions = [
  {
    type: "input",
    name: "user",
    message: "Enter the sql user name: ",
  },
  {
    type: "password",
    name: "password",
    message: "Enter the sql user password: ",
  }
];

inq.prompt(questions).then(answers => {
  const {user, password} = answers;
  const sqlConnectionConfig = {
    host: 'localhost',
    user,
    password,
    database: 'employee_db'
  };
  const config = `
  const con = ${JSON.stringify(sqlConnectionConfig)};
  module.exports = con;`;
  fs.writeFileSync('./dist/config.js', config);
});
