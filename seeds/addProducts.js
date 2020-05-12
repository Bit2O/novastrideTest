const faker = require("faker")

const _id = faker.random.uuid();
const createFakeProduct = () => ({
  p_id: _id,
  name: faker.commerce.productName(),
  img: faker.image.imageUrl(),
  description: faker.random.words()
})

const createFakeproductDescription = () => ({
  p_id: _id,
  price: faker.commerce.price(),
  size: faker.random.number()
})

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  const fakeProduct = createFakeProduct()
  const fakeProductDescription = createFakeproductDescription()
  await knex("products").insert(fakeProduct)
  await knex("productDetails").insert(fakeProductDescription)
};
