"use strict";

const Category = use("App/Models/Category");
const Product =  use("App/Models/Product");

class CategoryProductController {
  async index({ params, response, auth, view }) {
    if (auth.user && auth.user.type == "client") {
     // const category = await Category.findBy("id", params.id);
      //const products = await category.product().fetch();
      const products = await Product.query().with('category').fetch();
      return view.render("productlist", { products });
    }
  }
}

module.exports = CategoryProductController;
