const faker = require("faker")
const passwordHash = require("password-hash")


const createFakeUser = () => ({
  user_id: faker.random.uuid(),
  email: faker.internet.email(),
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  phone: faker.phone.phoneNumber(),
  scope: "create,edit,view",
  password: passwordHash.generate('password')
})

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  const fakeUsers = [];
  fakeUsers.push(createFakeUser());
  await knex("users").insert(fakeUsers)
};
