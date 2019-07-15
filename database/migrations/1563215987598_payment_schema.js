'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class PaymentSchema extends Schema {
  up () {
    this.create('payments', (table) => {
      table.increments();
      table.float('total_price').notNullable();
      table
        .integer('id_users')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users');
      table
        .integer('id_orders')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('orders');
      table.timestamps();
    })
  }

  down () {
    this.drop('payments');
  }
}

module.exports = PaymentSchema;
