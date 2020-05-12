const faker = require("faker")

const createFakeUser = () => ({
  user_id: faker.random.uuid(),
  email: faker.email(),
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  phone: faker.phone.phoneNumber(),
  scope: "create,edit,view",
  password: "password"
})
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {id: 1, colName: 'rowValue1'},
        {id: 2, colName: 'rowValue2'},
        {id: 3, colName: 'rowValue3'}
      ]);
    });
};
