const Pool = require("pg").Pool;
const dotenv = require("dotenv");
dotenv.config();

const pool = new Pool({
  user: "samantha",
  password: process.env.DB_PASS,
  host: "localhost",
  port: 5432,
  database: "employeesystem"
});

module.exports = pool;
 