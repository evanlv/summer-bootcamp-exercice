const error = require("../../../error");
const makePaginate = require("../../../makePaginate");

const commentsRoute = (app, { db }) => {
  // GET /users/:userId/posts/:postId/comments
  app.get("/users/:userId/posts/:postId/comments", async (req, res, next) => {
    const {
      params: { userId, postId },
    } = req;

    const paginate = makePaginate(req);

    try {
      res.send(await paginate(db("comments").where({ userId, postId })));
    } catch (error) {
      next(error);

      return;
    }
  });

  // GET /users/:userId/posts/:postId/comments/:commentId
  app.get(
    "/users/:userId/posts/:postId/comments/:commentId",
    async (req, res, next) => {
      const {
        params: { userId, postId, commentId },
      } = req;

      try {
        const comment = await db("comments").where({
          userId,
          postId,
          id: commentId,
        });

        res.send(comment);
      } catch (error) {
        next(error);

        return;
      }
    }
  );

  // POST /users/:userId/posts/:postId/comments
  app.post("/users/:userId/posts/:postId/comments", async (req, res, next) => {
    const {
      params: { userId, postId },
      body: { content },
    } = req;

    try {
      const comment = await db("comments")
        .insert({ postId, userId, content })
        .returning("*");

      res.send(comment);
    } catch (error) {
      next(error);

      return;
    }
  });

  // PUT /users/:userId/posts/:postId/comments/:commentId
  app.put(
    "/users/:userId/posts/:postId/comments/:commentId",
    async (req, res, next) => {
      const {
        params: { userId, postId, commentId },
        body: { content },
      } = req;

      try {
        const comment = await db("comments")
          .where({ userId, postId, id: commentId })
          .update({ content })
          .returning("*");

        res.send(comment);
      } catch (error) {
        next(error);

        return;
      }
    }
  );

  // DELETE /users/:userId/posts/:postId/comments/
  app.delete(
    "/users/:userId/posts/:postId/comments/:id",
    async (req, res, next) => {
      const {
        params: { userId, postId, id },
      } = req;

      try {
        const comment = await db("comments")
          .where({ userId, postId, id })
          .delete();

        res.send({ comment, status: "Comment deleted" });
      } catch (error) {
        next(error);

        return;
      }
    }
  );
};

module.exports = commentsRoute;
