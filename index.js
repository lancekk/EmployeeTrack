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
    message: "Please enter the department name: "
  },
];

let rolePrompt = [
  {
    name: "role_name",
    type: "input",
    message: "Please enter the role's name: "
  },
  {
    name: "role_salary",
    type: "input",
    message: "Please enter the role's salary: "
  },
  {
    name: "role_dept",
    type: "list",
    message: "Please select the role's department: ",
    choices: async (inqs) => {
      return db.promise().query(`SELECT id, dept_name FROM departments;`)
      .then((res) => {
          return res[0].map(dept => { return {name: dept.dept_name, value: dept.id, short: dept.dept_name};});
      }).catch(rej => console.log(rej));
    }
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
  db.query(`SELECT roles.title as title, roles.id, departments.dept_name as department, roles.salary` +
  `FROM roles JOIN departments ON roles.department_id=departments.id;`,
  (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log(table.getTable(res));
    }
  });
}
const getEmployees = () => {
  // id, first name, last name, title, department, salary, manager
  db.query(`SELECT employees.id, employees.first_name, employees.last_name, roles.title,
  departments.dept_name as department, roles.salary, employees.manager_id
  FROM employees JOIN roles ON employees.role_id=roles.id JOIN departments on roles.department_id=departments.id;`, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log(table.getTable(res));
    }
  })
}
const addDepartment = () => {
  inq.prompt(departmentPrompt).then(ans => {
    db.query(`INSERT INTO departments (dept_name) VALUES ("${ans.dept_name}");`, (err, res) => {
      if (err) {
        console.log(err)
      } else {
        console.log(table.getTable(res));
      }
    })
  });
}
const addRole = () => {
  inq.prompt(rolePrompt).then(ans => {
    db.query(`INSERT INTO roles (title, salary, department_id)
    VALUES ("${ans.role_name}", ${ans.role_salary}, ${ans.role_dept})`, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log(table.getTable(res));
      }
    });
  });
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

