'use strict'

const Order = use('App/Models/Order');

class OrderController {
    async index({ auth, view, params }){
        if (auth.user && auth.user.type == "client") {
            /*const orders = await Order
                                .table('orders')
                                .where('id_users', auth.user.id)
                                .first();*/
            const orders = await Order.all();
            return view.render("order", { orders });
        }
    }

    async show({request, response, params, view}){
        const order = await Order.findByOrFail("id", params.id);
        return view.render("order", { order });
    }

    async destroy({ response, params, auth }) {
        if (auth.user && auth.user.type == "client") {
          const data = await Order.findOrFail(params.id);
          await data.delete();
          return response.redirect("/order");
        }
      }
}

module.exports = OrderController
