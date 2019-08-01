'use strict'

const OrderProduct = use('App/Models/OrderProduct');
const Order = use('App/Models/Order');

class OrderController {
    async create({request, response, auth}){
        const users = auth.user.id;
        await Order.create(users);
    }

    async index({ auth, view, params }){
        if (auth.user && auth.user.type == "client") {
            /*const orders = await Order
                                .table('orders')
                                .where('id_users', auth.user.id)
                                .first();*/
            const order = await Order.all();
            return view.render("order", { order });
        }
    }

    async show({ params, view, response}){
        const order = await OrderProduct.findByOrFail("id_orders", params.id);
        //return response.send(order)
        console.log("#################################################################")
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
}

module.exports = OrderController
