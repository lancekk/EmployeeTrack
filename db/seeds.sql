DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE departments (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INTEGER,
    FOREIGN KEY (department_id)
    REFERENCES departments(id)
    ON DELETE SET NULL
);

CREATE TABLE employees (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER,
    manager_id INTEGER DEFAULT (NULL),
    FOREIGN KEY (role_id)
    REFERENCES roles(id)
    ON DELETE SET NULL,
    FOREIGN KEY (manager_id)
    REFERENCES employees(id)
    ON DELETE SET NULL
);


INSERT INTO departments (dept_name)
VALUES ("Software"), ("Advertising");

INSERT INTO roles (title, salary, department_id)
VALUES ("Software Manager", 100000.00, 1),
       ("Ad Manager", 100000.00, 2),
       ("Junior Developer", 60000.00, 1),
       ("Senior Developer", 80000.00, 1),
       ("Ad Designer", 70000.00, 2);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, NULL),
       ("John", "Smith", 2, NULL),
       ("Steve", "Johnson", 3, 1),
       ("Jack", "Jackson", 4, 1),
       ("Kyle", "Smithson", 5, 2);
