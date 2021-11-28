const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const dotenv = require("dotenv");
dotenv.config();

//middleware
app.use(cors());
app.use(express.json()); //req.body

//create an employee

app.post("/create", async (req, res) => {
  try {
    const { name, age, country, position, wage } = req.body;

    const newEmployee = await pool.query(
      "INSERT INTO employees (name, age, country, position, wage) VALUES($1,$2,$3,$4,$5) RETURNING *",
      [name, age, country, position, wage]
    );
    res.json(newEmployee.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get all employees

app.get("/employees", async (req, res) => {
  try {
    const allEmployees = await pool.query("SELECT * FROM employees");
    res.json(allEmployees.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get an employee

app.get("/employees/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await pool.query(
      "SELECT * FROM employees WHERE employee_id = $1",
      [id]
    );

    res.json(employee.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// update an employee

app.put("/employees/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, country, position, wage } = req.body;
    const updateEmployee = await pool.query(
      "UPDATE employees SET name = $1, age = $2, country = $3, position = $4, wage = $5 WHERE employee_id = $6",
      [name, age, country, position, wage, id]
    );

    res.json(`Employee with the ID '${id}' was updated.`);
  } catch (err) {
    console.error(err.message);
  }
});

// delete an employee

app.delete("/employees/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteEmployee = await pool.query(
      "DELETE FROM employees WHERE employee_id = $1",
      [id]
    );
    res.json(`Employee with the ID '${id}' was deleted.`);
  } catch (error) {
    console.error(err.message);
  }
});


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});


//test