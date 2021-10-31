const config = require('./dist/config');

const mysql = require('mysql2');
const inq = require('inquirer');
const table = require('console.table');

const model = require('./model');

const menu = [
  {
    name: "opt",
    type: "list",
    message: "Choose an option: ",
    choices: [
      {
        name: "View all departments",
        value: "view_dept",
        short: "view departments",
      },
      {
        name: "View all roles",
        value: "view_roles",
        short: "view roles",
      },
      {
        name: "View all employees",
        value: "view_empl",
        short: "view employees",
      },
      {
        name: "Add a department",
        value: "add_dept",
        short: "add department",
      },
      {
        name: "Add a role",
        value: "add_role",
        short: "add role",
      },
      {
        name: "Add an employee",
        value: "add_empl",
        short: "add employee",
      },
      {
        name: "Update employee role",
        value: "update_empl_role",
        short: "update role",
      }
    ]
  }
];

const departmentPrompt = [
  {
    name: "dept_name",
    type: "input",
    message: "Please enter the department name"
  },
];

const rolePrompt = [
  {
    name: "role_name",
    type: "input",
    message: "Please enter the role's name"
  },
  {
    name: "role_salary",
    type: "input",
    message: "Please enter the role's salary"
  },
  {
    name: "role_dept",
    type: "list",
    message: "Please select the role's department",
    choices: (inqs) => {} // TODO: fill in
  }
];

const employeePrompt = [
  // first name
  // last name
  // role
  // manager (default null)
];

const employeeUpdateRolePrompt = [
  // select employee (list)
  // select role (role)
];


const db = mysql.createConnection(config, console.log("connected to db"));

const menuPrompt = () => {
  return inq.prompt(menu).then(ans => {
    return ans.opt;
  });
};

const getDepartments = () => {
  db.query(`SELECT * FROM departments;`, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log(table.getTable(res));
    }
  });
}
const getRoles = () => {
  db.query(`SELECT * FROM roles;`, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log(table.getTable(res));
    }
  });
}
const getEmployees = () => {
  db.query(`SELECT * FROM employees;`, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log(table.getTable(res));
    }
  })
}
const addDepartment = () => {
  inq.prompt(departmentPrompt).then();
}
const addRole = () => {
  inq.prompt(rolePrompt).then();
}
const addEmployee = () => {
  inq.prompt(employeePrompt).then();
}
const updateEmployeeRole = () => {
  inq.prompt(employeeUpdateRolePrompt).then();
}

const actions = {
  "view_dept": getDepartments,
  "view_roles": getRoles,
  "view_empl": getEmployees,
  "add_dept": addDepartment,
  "add_role": addRole,
  "add_empl": addEmployee,
  "update_empl_role": updateEmployeeRole,
};

menuPrompt().then(opt => {
  console.log(opt);
  actions[opt]();
});

