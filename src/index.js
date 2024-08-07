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

app.get("/tutors", async (req, res) => {
  const users = await Tutor.findAll({
    include: {
      model: Pet,
      attributes: ["id", "name", "species", "carry", "weight", "date_of_birth"],
    },
  });

  res.json(users);
});

app.post("/tutor", async (req, res) => {
  const name = req.body.name;
  const phone = req.body.phone;
  const email = req.body.email;
  const date_of_birth = req.body.date_of_birth;
  const zip_code = req.body.zip_code;

  const tutor = await Tutor.create({
    name,
    phone,
    email,
    date_of_birth,
    zip_code,
  });

  res.json(tutor);
});

app.put("/tutor/:id", async (req, res) => {
  const id = req.params.id;
  const tutor = await Tutor.findByPk(id);

  tutor.name = req.body.name;
  tutor.phone = req.body.phone;
  tutor.email = req.body.email;
  tutor.date_of_birth = req.body.date_of_birth;
  tutor.zip_code = req.body.zip_code;

  await tutor.save();
  res.json(tutor);
});

app.delete("/tutor/:id", async (req, res) => {
  const id = req.params.id;
  const tutor = await Tutor.findByPk(id);

  await tutor.destroy();

  res.sendStatus(204);
});

app.post("/pet/:tutorId", async (req, res) => {
  const TutorId = req.params.tutorId;
  const name = req.body.name;
  const species = req.body.species;
  const carry = req.body.carry;
  const weight = req.body.weight;
  const date_of_birth = req.body.date_of_birth;

  const pet = await Pet.create({
    TutorId,
    name,
    species,
    carry,
    weight,
    date_of_birth,
  });

  res.json(pet);
});

app.put("/pet/:petId/tutor/:tutorId", async (req, res) => {
  const tutorId = req.params.tutorId;
  if (await Tutor.findByPk(tutorId)) {
    const petId = req.params.petId;

    const newPet = await Pet.findByPk(petId);
    newPet.name = req.body.name;
    newPet.species = req.body.species;
    newPet.carry = req.body.carry;
    newPet.weight = req.body.weight;
    newPet.date_of_birth = req.body.date_of_birth;

    newPet.save();
    res.json(newPet);
  } else {
    res.status(404).send("Tutor Id doesn't exist!");
  }
});

app.delete("/pet/:petId/tutor/:tutorId", async (req, res) => {
  const tutorId = req.params.tutorId;
  const petId = req.params.petId;
  if (await Tutor.findByPk(tutorId)) {
    const pet = await Pet.findByPk(petId);
    await pet.destroy();
    res.sendStatus(204);
  } else {
    res.status(404).send("Tutor Id doesn't exist!");
  }
});

connection
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
