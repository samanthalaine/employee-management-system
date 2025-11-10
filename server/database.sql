CREATE TABLE employees(
    employee_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    age INT NOT NULL,
    country TEXT NOT NULL,
    position TEXT NOT NULL,
    wage INT NOT NULL
);