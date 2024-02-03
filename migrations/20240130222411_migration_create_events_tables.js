/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("events", (table) => {
        table.increments('id').primary();
        table.string("title").notNullable();
        table.string("location").notNullable();
        table.string("start_time").notNullable();
        table.string("end_time").notNullable();
        table.boolean("all_day").notNullable().defaultTo(false);
        table.string("notes");
        table.integer("user_id")
            .unsigned()
            .notNullable();
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
    return knex.schema.dropTable("events");
};
