'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class OrderSchema extends Schema {
  up () {
    this.alter('users', (table) => {
      table.increments();
      table.date('date').notNullable();
      table.float('price').notNullable();
      table
        .integer('id_users')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users');
      table
        .integer('id_products')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('products')
        .onDelete('CASCADE');
      table.timestamps();
    })
  }

  down () {
    this.drop('orders');
  }
}

module.exports = OrderSchema;
