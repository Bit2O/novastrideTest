
exports.up = async function(knex) {
	await knex.schema.createTable("users", table => {
		table
			.uuid("user_id")
			.primary();
		table
			.string("email")
			.unique()
			.notNullable();
		table.string("first_name").notNullable();
		table.string("last_name").notNullable();
		table.string("phone");
		table.string("scope").notNullable();
		table.string("password").notNullable();
	})
};

exports.down = async function(knex) {
	await knex.schema.dropTable("users")
};
