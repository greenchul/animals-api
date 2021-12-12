const express = require("express");
const sendOKandHello = require("../controllers/dog-controller");

const dogRouter = express.Router();

dogRouter.get("/dog", sendOKandHello);

module.exports = dogRouter;
