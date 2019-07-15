'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Order extends Model {
    user () {
        return this.belongsTo('App/Models/User', 'id', 'id_user');
    }

    payment () {
        return this.hasOne('App/Models/Payment', 'id', 'id_order');
    }

    products () {
        return this.belongsToMany('App/Models/Product', 'id_order', 'id_product', 'id', 'id')
    }
}

module.exports = Order
