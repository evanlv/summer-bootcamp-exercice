const error = require("../../error");
const makePaginate = require("../../makePaginate");

const postsRoute = (app, { db }) => {
  // GET /users/:userId/posts
  app.get("/users/:userId/posts", async (req, res, next) => {
    const {
      params: { userId },
    } = req;

    const paginate = makePaginate(req);

    try {
      res.send(await paginate(db("posts").where({ userId })));
    } catch (error) {
      next(error);

      return;
    }
  });

  // GET /users/:userId/posts/:postId
  app.get("/users/:userId/posts/:postId", async (req, res, next) => {
    const {
      params: { userId, postId },
    } = req;

    try {
      const post = await db("posts").where({ userId, id: postId });

      res.send(post);
    } catch (error) {
      next(error);

      return;
    }
  });

  // POST /users/:userId/posts
  app.post("/users/:userId/posts", async (req, res, next) => {
    const {
      params: { userId },
      body: { title, content },
    } = req;

    try {
      const post = await db("posts")
        .insert({ userId, title, content })
        .returning("*");

      res.send(post);
    } catch (error) {
      next(error);

      return;
    }
  });

  // PUT /users/:userId/posts/:postId
  app.put("/users/:userId/posts/:postId", async (req, res, next) => {
    const {
      params: { userId, postId },
      body: { content, title },
    } = req;

    try {
      const post = await db("posts")
        .where({
          userId,
          id: postId,
        })
        .update({ content, title })
        .returning("*");

      res.send(post);
    } catch (error) {
      next(error);

      return;
    }
  });

  // DELETE /users/:userId/posts/:postId
  app.delete("/users/:userId/posts/:postId", async (req, res, next) => {
    const {
      params: { userId, postId },
    } = req;

    try {
      const post = await db("posts")
        .where({ userId, id: postId })
        .delete()
        .returnin("*");

      res.send({ post, status: "Post deleted" });
    } catch (error) {
      next(error);

      next(error);

      return;
    }
  });
};

module.exports = postsRoute;
