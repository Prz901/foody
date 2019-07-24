"use strict";

const Product = use("App/Models/Product");

class CartController {
  async addOn({ request, response, params, auth }) {}

  async list({ request, response, view, data }) {
    return view.render("cart", { data });
  }
}

module.exports = CartController;
