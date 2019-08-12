"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class OrderProductSchema extends Schema {
    up() {
        this.create("order_products", table => {
            table.increments();
            table
                .integer("id_orders")
                .unsigned()
                .notNullable()
                .references("id")
                .inTable("orders")
                .onDelete("CASCADE");
            table
                .integer("id_products")
                .unsigned()
                .notNullable()
                .references("id")
                .inTable("products")
                .onDelete("CASCADE");
            table
                .integer("id_users")
                .unsigned()
                .notNullable()
                .references("id")
                .inTable("users");
            table.string("product_name");
            table.float("price");
            table.string("quantity");
            table.string("image");
            table.timestamps();
        });
    }

    down() {
        this.drop("order_products");
    }
}

module.exports = OrderProductSchema;