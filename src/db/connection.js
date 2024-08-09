const { Sequelize } = require("sequelize");
const mysql = require("mysql2/promise");

async function createDatabase() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
  });
  await connection.query("CREATE DATABASE IF NOT EXISTS pets_clinic");
  await connection.end();
}
createDatabase();

const sequelize = new Sequelize("pets_clinic", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
