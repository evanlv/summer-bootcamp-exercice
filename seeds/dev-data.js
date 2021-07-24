const faker = require("faker");

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

exports.seed = async (knex) => {
  await knex("comments").delete();
  await knex("posts").delete();
  await knex("users").delete();

  await knex("users").insert(
    [...new Array(50)].map(() => ({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    }))
  );

  const [{ min: minUserId, max: maxUserId }] = await knex("users")
    .min("id")
    .max("id");

  await knex("posts").insert(
    [...new Array(100)].map(() => ({
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(rand(1, 2)),
      userId: rand(minUserId, maxUserId),
    }))
  );

  const [{ min: minPostId, max: maxPostId }] = await knex("posts")
    .min("id")
    .max("id");

  await knex("comments").insert(
    [...new Array(150)].map(() => ({
      content: faker.lorem.paragraphs(rand(1, 2)),
      userId: rand(minUserId, maxUserId),
      postId: rand(minPostId, maxPostId),
    }))
  );
};
