const express = require("express");
const knex = require("knex");
const knexfile = require("./knexfile");

const app = express();
const db = knex(knexfile);

//mw
app.use(express.json());

// GET /users    OK
app.get("/users", async (req, res) => {
  res.send(await db("users"));
});

// GET /users/:id    OK
app.get("/users/:id", async (req, res) => {
  const {
    params: { id },
  } = req;

  const [user] = await db("users").where({ id });

  if (!user) {
    res.status(404).send({ error: "not found" });
  }
  res.send(user);
});

// POST /users    OK
app.post("/users", async (req, res) => {
  const {
    body: { username, email, password },
  } = req;

  const user = await db("users")
    .insert({ username, email, password })
    .returning("*");

  res.send(user);
});

//PUT /users/:id    OK
app.put("/users/:id", async (req, res) => {
  const {
    params: { id },
    body: { username, email, password },
  } = req;

  const [user] = await db("users")
    .where({ id })
    .update({ username, email, password })
    .returning("*");

  res.send(user);
});

// DELETE /users/:id    OK
app.delete("/users/:id", async (req, res) => {
  const {
    params: { id },
  } = req;
  const user = await db("users").where({ id }).delete();

  res.send({ Status: "OK" });
});

app.listen(3000);
