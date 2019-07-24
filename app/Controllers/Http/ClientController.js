"use strict";
const Category = use("App/Models/Category");
const Product = use("App/Models/Product");

class ClientController {
  async home({ view }) {
    const categories = await Category.all();
    return view.render("feedclient", { categories });
  }
  async category(request, response) {
    const category = await Category.all();
    return response.send({ category });
  }
}

module.exports = ClientController;
