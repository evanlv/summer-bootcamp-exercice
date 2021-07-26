const error = require("../error");
const makePaginate = require("../makePaginate");

const usersRoute = (app, { db }) => {
  // GET /users
  app.get("/users", async (req, res, next) => {
    const paginate = makePaginate(req);

    try {
      res.send([await paginate(db("users"))]);
    } catch (error) {
      next(error);

      return;
    }
  });

  // GET /users/:userId
  app.get("/users/:userId", async (req, res, next) => {
    const {
      params: { userId },
    } = req;

    try {
      const user = await db("users").where({ id: userId });

      res.send(user);
    } catch (error) {
      next(error);

      return;
    }
  });

  // POST /users
  app.post("/users", async (req, res, next) => {
    const {
      body: { firstName, lastName },
    } = req;

    try {
      const user = await db("users")
        .insert({ firstName, lastName })
        .returning("*");

      res.send(user);
    } catch (error) {
      next(error);

      return;
    }
  });

  //PUT /users/:userId
  app.put("/users/:userId", async (req, res, next) => {
    const {
      params: { userId },
      body: { firstName, lastName },
    } = req;

    try {
      const user = await db("users")
        .where({ id: userId })
        .update({ firstName, lastName, updatedAt: new Date() })
        .returning("*");

      res.send(user);
    } catch (error) {
      next(error);

      return;
    }
  });

  // DELETE /users/:userId
  app.delete("/users/:userId", async (req, res, next) => {
    const {
      params: { userId },
    } = req;

    try {
      const user = await db("users")
        .where({ id: userId })
        .delete()
        .returning("*");

      res.send({ user, status: "User deleted" });
    } catch (error) {
      next(error);

      return;
    }
  });
};

module.exports = usersRoute;
