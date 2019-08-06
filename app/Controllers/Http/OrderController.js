'use strict'

const OrderProduct = use('App/Models/OrderProduct');
const Order = use('App/Models/Order');

class OrderController {
    async index({ auth, view }){
        if (auth.user && auth.user.type == "client") {
            /*const orders = await Order
                                .table('orders')
                                .where('id_users', auth.user.id)
                                .first();*/
            const orders = await Order.all();
            console.log(orders.toJSON())
            return view.render("order", { orders });
        }
    }

    async show({ params, view, response }){
        const orderProducts = await OrderProduct.findByOrFail("id_orders", params.id);
     
        return view.render("order", { orderProducts });  
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
