"use strict";

const Product = use("App/Models/Product");
const Order = use("App/Models/Order");

class CartController {
    async create({ request, response, auth, session, params }) {
        const quantidade = 1;
        if (auth.user && auth.user.type == "client") {
            const itensCart = session.get("itensCart") || [];
            const product = await Product.findBy("id", params.id);
            product.id_users = auth.user.id;
            const productIndex = itensCart.findIndex(
                item => item.product.id === product.id
            );
            if (productIndex > -1) {
                itensCart[productIndex].quantity += quantity;
            } else {
                itensCart.push({ product: product, quantity });
            }

            session.put("itensCart", itensCart);
        }
    }

    async index({ request, response, view, session }) {
        const datas = await session.all();
        return view.render("cart", { datas });
    }

    async store({ request, response, auth, view, session }) {
        if (auth.user && auth.user.type == "client") {
            const products = [];
            const data = await session.get("itensCart");
r

    // remover um produto do carrinho
    async update({ request, response, auth, session, params }) {
        if (auth.user && auth.user.type == "client") {
            let array = session.get("itensCart");
            const product = await Product.findByOrFail("id", params.id);
            array = array.filter(item => {
                return item.product.id != params.id;
            });
            session.put("itensCart", array);
            return response.redirect("/cart");
        }
    }

    //remover tudo do carrinho
    async destroy({ request, response, auth, session }) {
        if (auth.user && auth.user.type == "client") {
            session.put("itensCart", []);
            return response.redirect("/cart");
        }
    }
}

module.exports = CartController;