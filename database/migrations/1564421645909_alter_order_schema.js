'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlterOrderSchema extends Schema {
  up () {
    this.alter('orders', (table) => { 
      table.integer('quantity').notNullable();
    });
  }


  down () {
    this.drop('alter_orders')
  }
}

module.exports = AlterOrderSchema
