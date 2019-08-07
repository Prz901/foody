"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Product = use("App/Models/Product");
const Category = use("App/Models/Category");
const Helpers = use('Helpers')

/**
 * Resourceful controller for interacting with products
 */
class ProductController {
    /**
     * Show a list of all products.
     * GET products
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async index({ request, response, view }) {
            const products = await Product.all();
            //return response.status(200).send(products);
            return view.render("product", { products });
        }
        /**
         * Create/save a new product.
         * POST products
         *
         * @param {object} ctx
         * @param {Request} ctx.request
         * @param {Response} ctx.response
         */

    async create({ request, response, view }) {
        const categories = await Category.all();
        return view.render("createproduct", { categories });
    }

    async show({ response, params, auth, view }) {
        const product = await Product.findByOrFail("id", params.id);
        return view.render("editproduct", { product });
    }

    async edit({ request, response, params, view }) {
        const product = await Product.findByOrFail("id", params.id);

        const categories = await Category.all();


        return view.render("editproduct", { product, categories });
    }

      async store({ request, response, auth }) {
            if (auth.user && auth.user.type == "admin") {
                const data = await request.only([
                    "product_name",
                    "price",
                    "id_categories"
                ]);
                const images = await request.file('image', {
                                            types: ['image'],
                                            size: '2mb'
                });
               
                await images.move(Helpers.tmpPath('../App/uploads'))

                
                data.id_users = auth.user.id;
                data.image = '../App/uploads/' + images.fileName;
                const product = await Product.create(data);
                
                return response.redirect("/product");
            }
        }
        /**
         * Update product details.
         * PUT or PATCH products/:id
         *
         * @param {object} ctx
         * @param {Request} ctx.request
         * @param {Response} ctx.response
         */
    async update({ params, request, response, auth }) {
            if (auth.user && auth.user.type == "admin") {
                const { id } = params;
                const data = request.all();
                const product = await Product.findBy("id", id);
                product.merge(data);
                await product.save();
                return response.redirect("/product");
            }
        }
        /**
         * Delete a product with id.
         * DELETE products/:id
         *
         * @param {object} ctx
         * @param {Request} ctx.request
         * @param {Response} ctx.response
         */
    async destroy({ response, params, auth }) {
        if (auth.user && auth.user.type == "admin") {
            const data = await Product.findOrFail(params.id);
            await data.delete();
            return response.redirect("/product");
        }
    }
}

module.exports = ProductController;