"use strict";
const Category = use("App/Models/Category");
const Product = use("App/Models/Product");

class ClientController {
  async home({ view }) {
    const products = await Product.all();
    return view.render("feedclient", { products });
  }
  async category(request, response) {
    const category = await Category.all();
    return response.send({ category });
  }
}

module.exports = ClientController;
