const express = require("express");
const app = express();

const connection = require("./db/connection");

const Tutor = require("./models/Tutor");
const Pet = require("./models/Pet");

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

connection
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
