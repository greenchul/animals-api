const express = require("express");
const catRouter = require("./routes/cat-routes");
const dogRouter = require("./routes/dog-routes");
const app = express();
app.use(express.json());

app.use(catRouter);
app.use(dogRouter);

app.get("/", (request, response) => {
  response.status(200).send("Hello!");
});

module.exports = app;
