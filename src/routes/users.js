const usersRoute = (app, { db }) => {
  // GET /users
  app.get("/users", async (req, res) => {
    res.send(await db("users"));
  });

  // GET /users/:userId
  app.get("/users/:userId", async (req, res) => {
    const {
      params: { userId },
    } = req;
    const user = await db("users").where({ id: userId });

    if (!user.length) {
      res.status(404).send({ error: "not found" });

      return;
    }

    res.send(user);
  });

  // POST /users
  app.post("/users", async (req, res, next) => {
    const {
      body: { username, email, password },
    } = req;

    try {
      const user = await db("users")
        .insert({ username, email, password })
        .returning("*");

      res.send(user);
    } catch (err) {
      next(err);

      return;
    }
  });

  //PUT /users/:userId
  app.put("/users/:userId", async (req, res) => {
    const {
      params: { userId },
      body: { username, email, password },
    } = req;
    const user = await db("users")
      .where({ id: userId })
      .update({ username, email, password })
      .returning("*");

    res.send(user);
  });

  // DELETE /users/:userId
  app.delete("/users/:userId", async (req, res) => {
    const {
      params: { userId },
    } = req;
    const user = await db("users").where({ id: userId }).delete();

    res.send({ Status: "User deleted" });
  });
};

module.exports = usersRoute;
