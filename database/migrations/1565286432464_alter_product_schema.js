'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlterProductSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table
        .string("category_name")
        .notNullable()
        .references("id")
        .inTable("categories")
        .onUpdate("CASCADE");
    })
  }

  down () {
    this.drop('alter_products')
  }
}

module.exports = AlterProductSchema
