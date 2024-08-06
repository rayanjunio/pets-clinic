const { DataTypes } = require("sequelize");
const db = require("../db/connection");

const Pet = require('./Pet');

const Tutor = db.define("Tutor", {
  name: {
    type: DataTypes.STRING,
    required: true,
  },
  phone: {
    type: DataTypes.STRING,
    required: true,
  },
  email: {
    type: DataTypes.STRING,
    required: true,
  },
  date_of_birth: {
    type: DataTypes.DATE,
    required: true,
  },
  zip_code: {
    type: DataTypes.STRING,
    required: true,
  },
});

Tutor.hasMany(Pet);
Pet.belongsTo(Tutor);

module.exports = Tutor;


