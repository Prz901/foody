"use strict";

const OrderProduct = use("App/Models/OrderProduct");
const Order = use("App/Models/Order");
const User = use("App/Models/User");

class OrderController {
    async index({ auth, view }) {
        const orders = await Order.all();
        const clientOrder = await Order.query()
            .with("user")
            .fetch();
        if (auth.user && auth.user.type == "client") {
            return view.render("order", { orders });
        }
        return view.render("adminListOrder", { clientOrder });
    }

    async show({ params, view, response, auth }) {
        if (auth.user && auth.user.type == "admin") {
            const order = await Order.findByOrFail("id", params.id);
            return view.render("formOrder", { order });
        }
    }
    async update({ params, view, auth, request, response }) {
        if (auth.user && auth.user.type == "admin") {
            const data = request.only(["status"]);
            const order = await Order.findByOrFail("id", params.id);
            order.merge(data);
            await order.save();
            return response.redirect("/orderIndex");
        }
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
        const order = await request.only(["id_users", "dataInicial", "dataFinal"]);
        const orders = await Order.query()
            .whereRaw(
                `date(created_at) BETWEEN '${order.dataInicial}' AND '${
          order.dataFinal
        }'`
            )
            .fetch();

        return view.render("usersOrders", { orders });
    }
}

module.exports = OrderController;