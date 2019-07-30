"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Product extends Model {
  user() {
    return this.belongsTo("App/Models/User", "id", "id_user");
  }

  category() {
    return this.belongsTo("App/Models/Category", "id", "id_categories");
  }

  orders() {
    return this.belongsToMany(
      "App/Models/Order",
      "order_id",
      "product_id",
      "id",
      "id"
    );
  }
}

module.exports = Product;
