USE employee_db;

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
