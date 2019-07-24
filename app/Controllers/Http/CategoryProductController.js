"use strict";

const Category = use("App/Models/Category");

class CategoryProductController {
  async index({ params, response, auth }) {
    if (auth.user && auth.user.type == "client") {
      const category = await Category.findByOrFail("id", params.id);
      const product = await category.product().fetch();

      return response.send({ product });
    }
  }
}

module.exports = CategoryProductController;
