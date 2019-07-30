'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderProductAlterSchema extends Schema {
  up () {
    this.alter('order_product', (table) => {
      table
        .integer('product_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('products')
        .onDelete('CASCADE');
      table
        .integer('order_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('orders')
        .onDelete('CASCADE');
    })
  }

  down () {
    this.drop('order_product_alters')
  }
}

module.exports = OrderProductAlterSchema
