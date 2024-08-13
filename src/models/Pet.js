const { DataTypes } = require("sequelize");
const db = require("../db/connection");

const Pet = db.define("Pet", {
  name: {
    type: DataTypes.STRING,
    require: true,
  },
  species: {
    type: DataTypes.STRING,
    require: true,
  },
  carry: {
    type: DataTypes.STRING,
    require: true,
  },
  weight: {
    type: DataTypes.INTEGER,
    require: true,
  },
  date_of_birth: {
    type: DataTypes.DATE,
    require: true,
  },
});

module.exports = Pet;
