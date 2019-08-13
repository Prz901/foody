"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Order extends Model {
    user() {
        return this.hasOne("App/Models/User", "id_users", "id");
    }

    payment() {
        return this.hasOne("App/Models/Payment", "id", "id_order");
    }

    products() {
        return this.belongsToMany(
            "App/Models/Product",
            "order_id",
            "product_id",
            "id",
            "id"
        );
    }
}

module.exports = Order;