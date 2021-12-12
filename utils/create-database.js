const mysql = require("mysql2/promise");

const path = require("path");

// const args = process.argv.slice(2)[0];

const envFile = "../.env";

require("dotenv").config({
  path: path.join(__dirname, envFile),
});

const { DB_PASSWORD, DB_NAME, DB_USER, DB_HOST, DB_PORT } = process.env;

const setUpDatabase = async () => {
  try {
    // connect to the database
    const db = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      port: DB_PORT,
    });

    // create the database if it doesn't already exist
    await db.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`);
    await db.query(`USE ${DB_NAME}`);
    // create a cats table if one doesnt exist
    await db.query(`CREATE TABLE IF NOT EXISTS Cats (
        id INT PRIMARY KEY auto_increment,
        name VARCHAR(255),
        colour VARCHAR(255)
    )`);
    db.close();
  } catch (err) {
    // if something goes wrong, console.log the error and the current environment variables
    console.log(
      `Your environment variables might be wrong. Please double check .env file`
    );
    console.log("Environment Variables are:", {
      DB_PASSWORD,
      DB_NAME,
      DB_USER,
      DB_HOST,
      DB_PORT,
    });
    console.log(err);
  }
};

// run the async function
setUpDatabase();
