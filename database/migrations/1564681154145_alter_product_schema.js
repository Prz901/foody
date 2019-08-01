'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlterProductSchema extends Schema {
  up () {
    this.alter('products', (table) => {
      table.string("image");
    })
  }

  down () {
    this.drop('alter_products')
  }
}

module.exports = AlterProductSchema
