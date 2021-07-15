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

  res.send({ Status: "User deleted" });
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

//DELETE /users/:userId/posts/:postId    OK
app.delete("/users/:userId/posts/:postId", async (req, res) => {
  const {
    params: { userId },
  } = req;

  const post = await db("posts").where({ userId }).delete();

  res.send({ Status: "Post deleted" });
});

//___________________________COMMENTS___________________________//

// GET /users/:userId/posts/:postId/comment    OK
app.get("/users/:userId/posts/:postId/comments", async (req, res) => {
  res.send(await db("comments"));
});

// POST /users/:userId/posts/:postId/comment    OK
app.post("/users/:userId/posts/:postId/comments", async (req, res) => {
  const {
    params: { userId, postId },
    body: { commentContent },
  } = req;

  const comment = await db("comments")
    .insert({ postId, userId, commentContent })
    .returning("*");

  res.send(comment);
});

// PUT /users/:userId/posts/:postId/comments/:commentsId    OK
app.put(
  "/users/:userId/posts/:postId/comments/:commentsId",
  async (req, res) => {
    const {
      params: { userId, postId, commentsId },
      body: { commentContent },
    } = req;

    const comment = await db("comments")
      .where({ userId, postId, commentsId })
      .update({ commentContent })
      .returning("*");

    res.send(comment);
  }
);

// DELETE /users/:userId/posts/:postId/comments/    OK
app.delete("/users/:userId/posts/:postId/comments/:id", async (req, res) => {
  const {
    params: { userId, postId },
  } = req;

  await db("comments").where({ userId, postId }).delete();

  res.send({ Status: "Comment deleted" });
});

app.listen(3000);
