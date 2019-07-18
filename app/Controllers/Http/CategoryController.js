'use strict'

const Category = use('App/Models/Category');
const User = use('App/Models/User');

class CategoryController {
    async index({request, response}){
        const categories = await Category.all();
        return response.status(200).send(categories);
    }

    async store({request, response, auth}){
        const data = await request.only(['category_name']);
        data.id_users = auth.user.id;
        const category = await Category.create(data);
        return response.status(200).send("Categoria cadastrada");
    }

    async update({request, response, params}){
        const { id } = params;
        const data = request.all();
        const category = await Category.findBy('id', id);
        category.merge(data);
        await category.save();
        return response.send(category);
    }

    async destroy({response, params}){
        const data = await Category.findOrFail(params.id);
        await data.delete();
        return response.status(200).send("Categoria deletada com sucesso");
    }
}

module.exports = CategoryController
