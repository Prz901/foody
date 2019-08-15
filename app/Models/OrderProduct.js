"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class OrderProduct extends Model {
    orders() {
        return this.hasOne("App/Models/Order", "id_orders", "id");
    }

    products() {
        return this.hasOne("App/Models/Product", "id_products", "id");
    }

    users() {
        return this.hasOne("App/Models/User", "id_users", "id");
    }
}

module.exports = OrderProduct;