const res = require("express/lib/response");
const getDb = require("../services/db");

// controller functions go here eg request response

const sendOk = (request, response) => {
  response.status(200).send("Everything is ok!");
};

const createCatController = async (req, res) => {
  const catName = req.body.name;
  const catColour = req.body.colour;
  const db = await getDb();
  try {
    db.query(`INSERT INTO Cats (name, colour)
      VALUES ("${catName}", "${catColour}")`);
    res
      .status(201)
      .send(`name is ${catName} and colour is ${catColour} -- CREATED`);
  } catch (err) {
    console.log(err);
  }
  db.close();
};

const sendCatController = async (req, res) => {
  const db = await getDb();
  try {
    const results = await db.query("SELECT * FROM Cats");
    res.status(200).json(results[0]);
  } catch (err) {
    console.log(err);
  }
};

const updateCatController = async (request, response) => {
  const db = await getDb();
  const catId = request.params.id;
  const { name, colour } = request.body;
  try {
    // find cat with id
    //if found, update, if now throw error
    const result = await db.query(`SELECT * FROM Cats WHERE id=${catId}`);
    console.log(result[0][0]);
    if (result[0][0]) {
      console.log("can update this cat", name, colour);
      if (name && colour) {
        db.query(
          `UPDATE Cats SET name="${name}", colour="${colour}" WHERE id=${catId}`
        );
        response.sendStatus(200);
      } else if (name && !colour) {
        db.query(`UPDATE Cats SET name="${name}" WHERE id=${catId}`);
        response.sendStatus(200);
      } else if (!name && colour) {
        db.query(`UPDATE Cats SET colour="${colour}" WHERE id=${catId}`);
        response.sendStatus(200);
      } else {
        response.send("Please choose paramters to update");
      }
    } else {
      console.log("No cat of that id");
      response.sendStatus(404);
    }
  } catch (err) {
    console.log(err);
  }
};

const deleteCatController = async (request, response) => {
  const db = await getDb();
  const catToBeDeleted = request.params.id;
  try {
    const result = await db.query(
      `SELECT * FROM Cats WHERE id=${catToBeDeleted}`
    );
    console.log(result[0][0]);
    if (result[0][0]) {
      db.query(`DELETE FROM Cats WHERE id=${catToBeDeleted}`);
      response.status(200).send(`Cat to be deleted is of id ${catToBeDeleted}`);
    } else if (!result[0][0]) {
      response.status(404).send(`Cat with id ${catToBeDeleted} does not exist`);
    }
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  sendOk,
  createCatController,
  sendCatController,
  updateCatController,
  deleteCatController,
};
