"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ProductSchema extends Schema {
    up() {
        this.create("products", table => {
            table.increments();
            table.string("product_name").notNullable();
            table.float("price").notNullable();
            table
                .integer("id_categories")
                .unsigned()
                .notNullable()
                .references("id")
                .inTable("categories")
                .onUpdate("CASCADE");
            table
                .integer("id_users")
                .unsigned()
                .notNullable()
                .references("id")
                .inTable("users");
            table.string("image");
            table.timestamps();
        });
    }

    down() {
        this.drop("products");
    }
}

module.exports = ProductSchema;