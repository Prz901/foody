'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Category extends Model {
    user () {
        return this.belongsTo('App/Models/User', 'id', 'id_user');
    }

    product () {
        return this.hasMany('App/Models/Product', 'id', 'id_categories');
    }

}

module.exports = Category
