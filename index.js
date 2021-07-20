const express = require("express");
const { glob } = require("glob");
const knex = require("knex");

const knexfile = require("./knexfile");

const app = express();
const db = knex(knexfile);

// middlewares
app.use(express.json());

glob
  .sync("./src/routes/**/*.js")
  .map((routePath) => require(routePath)(app, { db }));

app.listen(3000);
