"use strict";

const Product = use("App/Models/Product");

class CartController {
    async addOn({ request, response, auth, session, params }) {
        const quantidade = 1;
        if (auth.user && auth.user.type == "client") {
            const itensCart = session.get("itensCart") || [];
            const product = await Product.findBy("id", params.id);
            itensCart.push({ product, quantidade });
            session.put("itensCart", itensCart);
            response.send(itensCart);
        }
    }

    async list({ request, response, view, data }) {
        return view.render("cart", { data });
    }
}

module.exports = CartController;