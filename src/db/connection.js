const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("pets_clinic", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
