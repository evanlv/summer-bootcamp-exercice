const commentsRoute = (app, { db }) => {
  // GET /users/:userId/posts/:postId/comments
  app.get("/users/:userId/posts/:postId/comments", async (req, res) => {
    const {
      params: { userId, postId },
    } = req;

    res.send(await db("comments").where({ userId, postId }));
  });

  app.get(
    "/users/:userId/posts/:postId/comments/:commentId",
    async (req, res) => {
      const {
        params: { userId, postId, commentId },
      } = req;
      const comment = await db("comments").where({ userId, postId, commentId });

      if (!comment.length) {
        res.status(404).send({ error: "not found" });

        return;
      }

      res.send(comment);
    }
  );

  // POST /users/:userId/posts/:postId/comments
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

  // PUT /users/:userId/posts/:postId/comments/:commentId
  app.put(
    "/users/:userId/posts/:postId/comments/:commentId",
    async (req, res) => {
      const {
        params: { userId, postId, commentId },
        body: { commentContent },
      } = req;
      const comment = await db("comments")
        .where({ userId, postId, id: commentId })
        .update({ commentContent })
        .returning("*");

      res.send(comment);
    }
  );

  // DELETE /users/:userId/posts/:postId/comments/
  app.delete("/users/:userId/posts/:postId/comments/:id", async (req, res) => {
    const {
      params: { userId, postId },
    } = req;

    await db("comments").where({ userId, postId, id }).delete();

    res.send({ status: "Comment deleted" });
  });
};

module.exports = commentsRoute;
