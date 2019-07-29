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

    async store({request, response, auth, view, session}) {
        if (auth.user && auth.user.type == "client") {
            const data = await session.get("itensCart");
            //console.log(data);
            data.id_users = auth.user.id;
            data.quantity = await request.only(["quantity"]);
            //console.log(data);
            for(var i = 0; i < data.length; i++){
                console.log(data.product);
                /*const order = [];
                order['id_products'] = data.id_products;
                order['price'] = data.price;
                order['quantity'] = data.quantity;
                console.log(order);
//                await Order.create(order);*/
              
                console.log("Armazenado");
            }
            
            //console.log(order);
          }  
    }

    async update({}) {}

    //remover tudo do carrinho
    async destroy({ request, response, auth, session }) {
        if (auth.user && auth.user.type == "client") {
            session.put("itensCart", []);
            return response.redirect("/cart");
        }
    }
}

module.exports = CartController;