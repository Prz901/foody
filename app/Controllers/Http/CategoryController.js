"use strict";

const Category = use("App/Models/Category");
const User = use("App/Models/User");

class CategoryController {
    async index({ response, view, auth }) {
        const categories = await Category.all();
        const cat = categories.toJSON();
        return view.render("category", { cat });
    }

    async store({ request, response, auth, view }) {
        if (auth.user && auth.user.type == "admin") {
            const data = await request.only(["category_name"]);
            data.id_users = auth.user.id;
            const category = await Category.create(data);
            return response.redirect("/category");
        }
    }

    async update({ request, response, params, auth }) {
        if (auth.user && auth.user.type == "admin") {
            const { id } = params;
            const data = request.only(["category_name"]);
            const category = await Category.findBy("id", id);
            category.merge(data);
            await category.save();
            return response.redirect("/category");
        }
    }

    async show({ response, params, auth, view }) {
        const category = await Category.findByOrFail("id", params.id);
        return view.render("editcategory", { category });
    }

    async destroy({ response, params, auth }) {
        if (auth.user && auth.user.type == "admin") {
            const data = await Category.findOrFail(params.id);
            await data.delete();
            return response.redirect("/category");
        }
    }
}

module.exports = CategoryController;