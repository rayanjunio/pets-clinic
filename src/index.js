const express = require("express");
const app = express();

const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("../docs/swagger.json");

const connection = require("./db/connection");

const Tutor = require("./models/Tutor");
const Pet = require("./models/Pet");

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

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
  return;
});

app.put("/tutor/:id", async (req, res) => {
  const id = req.params.id;
  const tutor = await Tutor.findByPk(id);

  if (tutor) {
    tutor.name = req.body.name;
    tutor.phone = req.body.phone;
    tutor.email = req.body.email;
    tutor.date_of_birth = req.body.date_of_birth;
    tutor.zip_code = req.body.zip_code;

    if (await tutor.save()) {
      res.json(tutor);
      return;
    }
  }
  res.status(400).send("Tutor ID doesn't exist!");
});

app.delete("/tutor/:id", async (req, res) => {
  const id = req.params.id;
  const tutor = await Tutor.findByPk(id);

  if (tutor) {
    await tutor.destroy();
    res.sendStatus(204);
    return;
  }
  res.status(404).send("This ID doesn't exist!");
});

app.post("/pet/:tutorId", async (req, res) => {
  const TutorId = req.params.tutorId;

  if (await Tutor.findByPk(TutorId)) {
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
    return;
  }
  res.status(400).send("Tutor ID doesn't exist!");
});

app.put("/pet/:petId/tutor/:tutorId", async (req, res) => {
  const tutorId = req.params.tutorId;
  if (await Tutor.findByPk(tutorId)) {
    const petId = req.params.petId;
    const newPet = await Pet.findByPk(petId);

    if (newPet.TutorId == tutorId && newPet) {
      newPet.name = req.body.name;
      newPet.species = req.body.species;
      newPet.carry = req.body.carry;
      newPet.weight = req.body.weight;
      newPet.date_of_birth = req.body.date_of_birth;
      newPet.save();
      res.json(newPet);
      return;
    }
    res.status(404).send("Pet or Tutor ID is incorrect!");
    return;
  }
  res.status(404).send("Tutor ID doesn't exist!");
});

app.delete("/pet/:petId/tutor/:tutorId", async (req, res) => {
  const tutorId = req.params.tutorId;
  const petId = req.params.petId;
  if (await Tutor.findByPk(tutorId)) {
    const pet = await Pet.findByPk(petId);

    if (pet) {
      await pet.destroy();
      res.sendStatus(204);
      return;
    }
    res.status(404).send("Pet ID doesn't exist!");
    return;
  }
  res.status(404).send("Tutor ID doesn't exist!");
});

connection
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
