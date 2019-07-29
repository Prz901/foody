"use strict";

const Product = use("App/Models/Product");
const Order = use("App/Models/Order");

class CartController {
    async create({ request, response, auth, session, params }) {
        const quantidade = 1;
        if (auth.user && auth.user.type == "client") {
            const itensCart = session.get("itensCart") || [];
            const product = await Product.findBy("id", params.id);
            itensCart.push({ product: product, quantidade });
            session.put("itensCart", itensCart);
            console.log(itensCart);
        }
    }

    async index({ request, response, view, session }) {
        const datas = await session.all();
        return view.render("cart", { datas });
    }

    //adicionar no banco de pedidos
    async store({}) {}

    // remover um produto do carrinho
    async edit({}) {}

    //remover tudo do carrinho
    async destroy({}) {}
}

module.exports = CartController;