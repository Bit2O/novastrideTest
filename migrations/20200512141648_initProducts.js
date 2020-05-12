
exports.up = async function(knex) {
    await knex.schema.createTable("products", table => {
		table
			.uuid("p_id")
			.primary();
		table
			.string("name")
			.notNullable();
		table.string("img").notNullable();
		table.string("description").notNullable();
	})
};

exports.down = async function(knex) {
    await knex.schema.dropTable("products")
};
