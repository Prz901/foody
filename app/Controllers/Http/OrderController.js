"use strict";

const OrderProduct = use("App/Models/OrderProduct");
const Order = use("App/Models/Order");
const User = use("App/Models/User");

class OrderController {
    async create({ request, response, auth }) {
        const users = auth.user.id;
        await Order.create(users);
    }

    async index({ auth, view, params }) {
        if (auth.user && auth.user.type == "client") {
            const order = await Order.all();
            console.log(order.toJSON());
            return view.render("order", { order });
        }
    }

    async show({ params, view, response }) {
        const order = await OrderProduct.findByOrFail("id_orders", params.id);
        console.log(order);
        return view.render("order", { order });
    }

    async destroy({ response, params, auth }) {
        if (auth.user && auth.user.type == "client") {
            const data = await Order.findOrFail(params.id);
            await data.delete();
            return response.redirect("/order");
        }
    }
    async list({ view, request, response }) {
        const user = await User.all();
        const users = user.toJSON();
        return view.render("formClientOrder", { users });
    }
    async searchOrder({ request, view }) {
        const order = await request.only(["id_users", "data"]);
        console.log(order);
    }
}

module.exports = OrderController;