require("dotenv").config();
const { Sequelize } = require("sequelize");
const mysql = require("mysql2/promise");

const dbUser = process.env.DB_USER;
const dbpassword = process.env.DB_PASSWORD;

async function createDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: dbUser,
      password: dbpassword,
    });
    connection.query("CREATE DATABASE IF NOT EXISTS pets_clinic");
    connection.end();
  } catch (err) {
    console.log("Please, Verify your database connection");
  }
}
createDatabase();

const sequelize = new Sequelize("pets_clinic", dbUser, dbpassword, {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
