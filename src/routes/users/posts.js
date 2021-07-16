const postsRoute = (app, { db, redis }) => {
  // GET /users/:userId/posts
  app.get("/users/:userId/posts", async (req, res) => {
    const {
      params: { userId },
    } = req;

    res.send(await db("posts").where({ userId }));
  });

  // GET /users/:userId/posts/:postId
  app.get("/users/:userId/posts/:postId", async (req, res) => {
    const {
      params: { userId, postId },
    } = req;
    const post = await db("posts").where({ userId, id: postId });

    if (!post.length) {
      res.status(404).send({ error: "not found" });

      return;
    }

    res.send(post);
  });

  // POST /users/:userId/posts
  app.post("/users/:userId/posts", async (req, res) => {
    const {
      params: { userId },
      body: { postContent },
    } = req;
    const post = await db("posts")
      .insert({ userId, postContent })
      .returning("*");

    res.send(post);
  });

  // PUT /users/:userId/posts/:postId
  app.put("/users/:userId/posts/:postId", async (req, res) => {
    const {
      params: { userId, postId },
      body: { postContent },
    } = req;
    const post = await db("posts")
      .where({
        userId,
        id: postId,
      })
      .update({ postContent })
      .returning("*");

    res.send(post);
  });

  // DELETE /users/:userId/posts/:postId
  app.delete("/users/:userId/posts/:postId", async (req, res) => {
    const {
      params: { userId },
    } = req;
    const post = await db("posts").where({ userId, id: postId }).delete();

    res.send(post);
  });
};

module.exports = postsRoute;
