"use strict";

const Category = use("App/Models/Category");
const User = use("App/Models/User");

class CategoryController {
  async index({ response, view }) {
    const categories = await Category.all();
    //return response.status(200).send(categories);
    console.log('FOI');
    return view.render('category', { categories });
  }

  async store({ request, response, auth }) {
    if (auth.user && auth.user.type == "admin") {
      const data = await request.only(["category_name"]);
      data.id_users = auth.user.id;
      const category = await Category.create(data);
      return response.status(200).send("Categoria cadastrada", category);
    }
  }

  async update({ request, response, params, auth }) {
    if (auth.user && auth.user.type == "admin") {
      const { id } = params;
      const data = request.all();
      const category = await Category.findBy("id", id);
      category.merge(data);
      await category.save();
      return response.send(category);
    }
  }

  async destroy({ response, params, auth }) {
    if (auth.user && auth.user.type == "admin") {
      const data = await Category.findOrFail(params.id);
      await data.delete();
      return response.status(200).send("Categoria deletada com sucesso");
    }
  }
}

module.exports = CategoryController;
