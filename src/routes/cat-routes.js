// routes go here eg app.get..... then import controller function on in to this

// need to import express
const express = require("express");

// imported controller function
const {
  sendOk,
  createCatController,
  sendCatController,
  updateCatController,
  deleteCatController,
} = require("../controllers/cat-controller");

// create the router to export
const catRouter = express.Router();

// cats home page
catRouter.get("/cats", sendOk);

// create route
catRouter.post("/cats/create", createCatController);

// show cats in table
catRouter.get("/cats/show", sendCatController);

// update cat
catRouter.patch("/cats/update/:id", updateCatController);
// delete cat
catRouter.delete("/cats/delete/:id", deleteCatController);
module.exports = catRouter;
