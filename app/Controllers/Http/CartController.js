"use strict";

const Product = use("App/Models/Product");
const Order = use("App/Models/Order");

class CartController {
    async create({ request, response, auth, session, params }) {
        const quantity = 1;
        if (auth.user && auth.user.type == "client") {
            const itensCart = session.get("itensCart") || [];
            const product = await Product.findBy("id", params.id);
            itensCart.push({ product: product, quantity });
            session.put("itensCart", itensCart);
            console.log(itensCart);
        }
    }

    async index({ request, response, view, session }) {
        const datas = await session.all();
        return view.render("cart", { datas });
    }

    async store({request, response, auth, view}) {
        if (auth.user && auth.user.type == "client") {
            const data = await request.only(["id_products","price","quantity"]);
            //console.log(data);
            data.id_users = auth.user.id;
           // console.log(data);
            const order = await Order.create(data);
            console.log(order);
          }
       
    }

    async destroy({}) {
        const itensCart = session.get("itensCart") || [];
        session.put("itensCart", itensCart);
        return response.redirect("/cart");
    }
}

module.exports = CartController;