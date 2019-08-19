"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CategorySchema extends Schema {
    up() {
        this.create("categories", table => {
            table.increments();
            table.string("category_name").notNullable();
            table
                .integer("id_users")
                .unsigned()
                .notNullable()
                .references("id")
                .inTable("users");
            table.timestamps();
        });
    }

    down() {
        this.drop("categories");
    }
}

module.exports = CategorySchema;