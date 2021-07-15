const express = require("express");
const knex = require("knex");
const knexfile = require("./knexfile");

const app = express();
const db = knex(knexfile);

//mw
app.use(express.json());

//___________________________USERS___________________________//

// GET /users    OK
app.get("/users", async (req, res) => {
  res.send(await db("users"));
});

// GET /users/:userId    OK
app.get("/users/:userId", async (req, res) => {
  const {
    params: { userId },
  } = req;

  const [user] = await db("users").where({ userId });

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

//PUT /users/:userId    OK
app.put("/users/:userId", async (req, res) => {
  const {
    params: { userId },
    body: { username, email, password },
  } = req;

  const [user] = await db("users")
    .where({ userId })
    .update({ username, email, password })
    .returning("*");

  res.send(user);
});

// DELETE /users/:userId    OK
app.delete("/users/:userId", async (req, res) => {
  const {
    params: { userId },
  } = req;
  const user = await db("users").where({ userId }).delete();

  res.send({ Status: "OK" });
});

//___________________________POSTS___________________________//

// GET /users/:userId/posts    OK
app.get("/users/:userId/posts", async (req, res) => {
  res.send(await db("posts"));
});

// POSTS /users/:userId/posts    OK
app.post("/users/:userId/posts", async (req, res) => {
  const {
    params: { userId },
    body: { postContent },
  } = req;

  const post = await db("posts").insert({ userId, postContent }).returning("*");

  res.send(post);
});

// PUT /users/:userId/posts/:postId    OK
app.put("/users/:userId/posts/:postId", async (req, res) => {
  const {
    params: { userId },
    body: { postContent },
  } = req;

  const post = await db("posts")
    .where({ userId })
    .update({ postContent })
    .returning("*");

  res.send(post);
});

//DELETE /users/:userId/posts/:postId
app.delete("/users/:userId/posts/:postId", async (req, res) => {
  const {
    params: { userId },
  } = req;

  const post = await db("posts").where({ userId }).delete();

  res.send({ Status: "Post deleted" });
});

app.listen(3000);
