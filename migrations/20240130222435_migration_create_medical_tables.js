/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("medical", (table) => {
        table.increments('id').primary();
        table.string("gender").notNullable();
        table.string("vaccinations").notNullable();
        table.string("family_history").notNullable();
        table.string("current_conditions").notNullable();
        table.string("medications").notNullable();
        table.string("concerns").notNullable();
        table.string("notes");
        table.integer("user_id")
            .unsigned();
        table
            .foreign("user_id")
            .references("id").inTable("users")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table
            .timestamp("updated_at")
            .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    });  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("medical");
};
