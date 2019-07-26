"use strict";

const Product = use("App/Models/Product");
const Order = use('App/Models/Order');

class CartController {
    async create({ request, response, auth, session, params }) {
        const quantidade = 1;
        if (auth.user && auth.user.type == "client") {
            const itensCart = session.get("itensCart") || [];
            const product = await Product.findBy("id", params.id);
            itensCart.push({ product, quantidade });
            session.put("itensCart", itensCart);
            response.send(itensCart);
        }
    }

    async index({ request, response, view, data }) {
        const data = session.all();
        return view.render("cart", { data });
    }

    async store({request, response }){
        if (auth.user && auth.user.type == "client") {
            
        }
    }
}

module.exports = CartController;