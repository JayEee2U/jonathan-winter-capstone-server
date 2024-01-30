const { table } = require("console");

// /**
//  * @param { import("knex").Knex } knex
//  * @returns { Promise<void> }
//  */

exports.up = function (knex) {
    return knex.schema
        .createTable("user",(table) => {
            table.increments("id").primary();
            table.string("first_name").notNullable();
            table.string("last_name").notNullable();
            table.string("date_of_birth").notNullable();
            table.string("email").notNullable();
            table.timestamp("created_at").defaultTo(knex.fn.now());
            table
                .timestamp("updated_at")
                .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
        })
        .createTable("event", (table) => {
            table.increments('id').primary();
            table.string("title").notNullable();
            table.string("start").notNullable();
            table.string("end").notNullable();
            table.string("all_day").notNullable();
            table
                .integer("user_id")
                .references("user.id")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");
            table.timestamp("created_at").defaultTo(knex.fn.now());
            table
                .timestamp("updated_at")
                .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
        });    
};

// /**
//  * @param { import("knex").Knex } knex
//  * @returns { Promise<void> }
//  */
exports.down = function (knex) {
    return knex.schema.dropTable("event").dropTable('user');
};