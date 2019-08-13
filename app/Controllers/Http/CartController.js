"use strict";

const Product = use("App/Models/Product");
const Order = use("App/Models/Order");
const OrderProduct = use("App/Models/OrderProduct");

class CartController {
    async create({ request, response, auth, session, params }) {
        const quantity = 1;
        if (auth.user && auth.user.type == "client") {
            const itensCart = session.get("itensCart") || [];
            const product = await Product.findBy("id", params.id);
            product.id_users = auth.user.id;
            const productIndex = itensCart.findIndex(
                item => item.product.id === product.id
            );
            if (productIndex > -1) {
                if (itensCart[productIndex].quantity <= 19) {
                    itensCart[productIndex].quantity += quantity;
                }
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
            const data = session.get("itensCart");
            data.quantity = await request.only(["quantity", "id_pedido"]);

            const order = await Order.create({
                id_users: auth.user.id,
                status: "aberto"
            });

            data.forEach(async item => {
                await OrderProduct.create({
                    id_orders: order.id,
                    id_products: item.product.id,
                    product_name: item.product.product_name,
                    price: item.product.price,
                    image: item.product.image,
                    quantity: item.quantity,
                    id_users: auth.user.id
                });
            });
            return view.render("/orderconfirm");
        }
    }

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