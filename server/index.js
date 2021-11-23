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
    const { name, age, country, position, wage} = req.body;
    
    const newEmployee = await pool.query(
      "INSERT INTO employees (name, age, country, position, wage) VALUES($1,$2,$3,$4,$5) RETURNING *",
    [name, age, country, position, wage],
    );
    res.json(newEmployee.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get all employees

// get an employee

// update an employee

// delete an employee




const PORT = process.env.PORT || 3001

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})

