exports.up = async (knex) => {
  await knex.schema.createTable("users", (table) => {
    table.increments("id");
    table.string("username").notNullable();
    table.string("email").notNullable().unique();
    table.string("password").notNullable();
    table.datetime("createdAt").notNullable().defaultTo(knex.fn.now());
    table.datetime("updatedAt").notNullable().defaultTo(knex.fn.now());
    table.datetime("deletedAt");
  });
  await knex.schema.createTable("posts", (table) => {
    table.increments("id");
    table.integer("userId").unsigned().notNullable();
    table.text("postContent");
    table.datetime("createdAt").notNullable().defaultTo(knex.fn.now());
    table.datetime("updatedAt").notNullable().defaultTo(knex.fn.now());
    table.datetime("deletedAt");

    table.foreign("userId").references("id").inTable("users");
  });
  await knex.schema.createTable("comments", (table) => {
    table.increments("id");
    table.integer("postId").unsigned().notNullable();
    table.text("commentContent");
    table.datetime("createdAt").notNullable().defaultTo(knex.fn.now());
    table.datetime("updatedAt").notNullable().defaultTo(knex.fn.now());
    table.datetime("deletedAt");

    table.foreign("postId").references("id").inTable("posts");
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable("comments");
  await knex.schema.dropTable("posts");
  await knex.schema.dropTable("users");
};
