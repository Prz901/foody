'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Payment extends Model {
    user () {
        return this.belongsTo('App/Models/User', 'id', 'id_user');
    }

    order () {
        return this.belongsTo('App/Models/Order', 'id', 'id_order');
    }
}

module.exports = Payment
