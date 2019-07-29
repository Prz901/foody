'use strict'

const Order = use('App/Models/Order');

class OrderController {
    async index({ auth, view }){
        if (auth.user && auth.user.type == "client") {
            const orders = await Order
                                .table('order')
                                .where('id_users', auth.user.id)
                                .first();
            return view.render("order", { orders });
        }
    }

    async show({request, response, params, view}){
        const order = await Order.findByOrFail("id", params.id);
        return view.render("order", { order });
    }

    async destroy({ response, params, auth }) {
        if (auth.user && auth.user.type == "admin") {
          const data = await Order.findOrFail(params.id);
          await data.delete();
          return response.redirect("/order");
        }
      }
}

module.exports = OrderController
