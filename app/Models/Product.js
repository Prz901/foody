'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Product extends Model {
    user () {
        return this.belongsTo('App/Models/User', 'id', 'id_user');
    }

    category () {
        return this.belongsTo('App/Models/Category', 'id', 'id_category');
    }

    orders () {
        return this.belongsToMany('App/Models/Order', 'id_order', 'id_product', 'id', 'id');
    }
}

module.exports = Product
