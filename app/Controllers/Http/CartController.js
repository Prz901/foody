"use strict";

const Product = use("App/Models/Product");
const Order = use("App/Models/Order");

class CartController {
    async create({ request, response, auth, session, params }) {
        const quantidade = 1;
        if (auth.user && auth.user.type == "client") {
            const itensCart = session.get("itensCart") || [];
            const product = await Product.findBy("id", params.id);
            const productIndex = itensCart.findIndex(
                item => item.product.id === product.id
            );
            if (productIndex > -1) {
                itensCart[productIndex].quantidade += quantidade;
            } else {
                itensCart.push({ product: product, quantidade });
            }

            session.put("itensCart", itensCart);
        }
    }

    async index({ request, response, view, session }) {
        const datas = await session.all();
        return view.render("cart", { datas });
    }

    //adicionar no banco de pedidos
    async store({}) {}

    // remover um produto do carrinho
    async update({ request, response, auth, session, params }) {
        if (auth.user && auth.user.type == "client") {
            let array = session.get("itensCart");
            const product = await Product.findByOrFail("id", params.id);

            array = array.filter(item => {
                item.product.id !== params.id;
            });
            session.put("itensCart", array);
            return response.redirect("/cart");
        }
    }

    //remover tudo do carrinho
    async destroy({ request, response, auth, session }) {
        if (auth.user && auth.user.type == "client") {
            session.put("itensCart", []);
        }
        return response.redirect("/cart");
    }
}

module.exports = CartController;