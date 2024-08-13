const { DataTypes } = require("sequelize");
const db = require("../db/connection");

const Pet = require("./Pet");

const Tutor = db.define("Tutor", {
  name: {
    type: DataTypes.STRING,
    require: true,
  },
  phone: {
    type: DataTypes.STRING,
    require: true,
  },
  email: {
    type: DataTypes.STRING,
    require: true,
  },
  date_of_birth: {
    type: DataTypes.DATE,
    require: true,
  },
  zip_code: {
    type: DataTypes.STRING,
    require: true,
  },
});

Tutor.hasMany(Pet, { onDelete: "CASCADE", hooks: true });
Pet.belongsTo(Tutor);

module.exports = Tutor;
