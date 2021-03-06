exports.up = async (knex) => {
  await knex.schema.createTable("users", (table) => {
    table.increments("id");
    table.string("firstName").notNullable();
    table.string("lastName").notNullable();
    table.datetime("createdAt").notNullable().defaultTo(knex.fn.now());
    table.datetime("updatedAt").notNullable().defaultTo(knex.fn.now());
    table.datetime("deletedAt");
  });
  await knex.schema.createTable("posts", (table) => {
    table.increments("id");
    table.integer("userId").unsigned().notNullable();
    table.text("title").notNullable();
    table.text("content").notNullable();
    table.datetime("createdAt").notNullable().defaultTo(knex.fn.now());
    table.datetime("updatedAt").notNullable().defaultTo(knex.fn.now());
    table.datetime("deletedAt");

    table.foreign("userId").references("id").inTable("users");
  });
  await knex.schema.createTable("comments", (table) => {
    table.increments("id");
    table.integer("userId").unsigned().notNullable();
    table.integer("postId").unsigned().notNullable();
    table.text("content").notNullable();
    table.datetime("createdAt").notNullable().defaultTo(knex.fn.now());
    table.datetime("updatedAt").notNullable().defaultTo(knex.fn.now());
    table.datetime("deletedAt");

    table.foreign("postId").references("id").inTable("posts");
    table.foreign("userId").references("id").inTable("users");
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable("comments");
  await knex.schema.dropTable("posts");
  await knex.schema.dropTable("users");
};
