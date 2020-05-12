
exports.up = async function(knex) {
    await knex.schema.createTable("productDetails", table => {
		table
			.uuid("p_id")
			.primary();
		table
			.float("price")
            .notNullable();
        table.integer("size").notNullable();
	})
};

exports.down = async function(knex) {
    await knex.schema.dropTable("productDetails")
};
